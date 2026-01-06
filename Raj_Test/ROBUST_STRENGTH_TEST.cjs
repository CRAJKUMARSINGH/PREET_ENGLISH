#!/usr/bin/env node

/**
 * 🚀 ROBUST STRENGTH TEST - LAUNCH READINESS VALIDATION
 * 
 * CRITICAL PRE-LAUNCH TESTING SYSTEM
 * - 75 Users (25 beginner + 25 intermediate + 25 advanced)
 * - Each user navigates through 90% of ALL lessons randomly
 * - Comprehensive bottleneck detection and resolution
 * - Launch readiness validation
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Database = require('better-sqlite3');
require('dotenv').config();

const SITE_URL = process.env.TEST_BASE_URL || 'https://preetenglish.netlify.app';
const TEST_TIMEOUT = Number.parseInt(process.env.TEST_TIMEOUT_MS || '30000', 10);
const CONCURRENT_USERS = Number.parseInt(process.env.CONCURRENT_USERS || '5', 10); // Test users simultaneously
const LESSON_COVERAGE = Number.parseFloat(process.env.LESSON_COVERAGE || '0.9'); // 90% lesson coverage required

const MIN_SUCCESS_RATE = Number.parseFloat(process.env.MIN_SUCCESS_RATE || '95');
const MAX_CRITICAL_ISSUES = Number.parseInt(process.env.MAX_CRITICAL_ISSUES || '5', 10);
const MAX_AVG_LOAD_TIME_MS = Number.parseInt(process.env.MAX_AVG_LOAD_TIME_MS || '3000', 10);
const MIN_LESSON_COVERAGE_PERCENT = Number.parseFloat(process.env.MIN_LESSON_COVERAGE_PERCENT || '90');

class RobustStrengthTester {
    constructor() {
        this.db = null;

        this.results = {
            timestamp: new Date().toISOString(),
            totalUsers: 0,
            usersCreated: 0,
            usersCreatedFailed: 0,
            totalLessons: 0,
            totalLessonNavigations: 0,
            successfulNavigations: 0,
            failedNavigations: 0,
            criticalBottlenecks: [],
            performanceIssues: [],
            userJourneys: [],
            lessonCoverage: {},
            launchReadiness: false,
            errors: []
        };
        
        this.allLessons = [];
        this.testUsers = [];
        this.startTime = Date.now();
    }

    looksLikeHtml(body) {
        if (!body) return false;
        const head = String(body).slice(0, 200).toLowerCase();
        return head.includes('<!doctype') || head.includes('<html') || head.includes('<head');
    }

    async preflightBackend() {
        const lessonsRes = await this.makeRequest(`${SITE_URL}/api/lessons`, { method: 'GET' });

        if (lessonsRes.status !== 200) {
            throw new Error(`Preflight failed: /api/lessons returned HTTP ${lessonsRes.status}. Ensure TEST_BASE_URL points to the Express backend.`);
        }

        const contentType = String(lessonsRes.headers?.['content-type'] || '');
        if (this.looksLikeHtml(lessonsRes.data) || !contentType.includes('application/json')) {
            throw new Error(
                `Preflight failed: /api/lessons did not return JSON (content-type: ${contentType || 'unknown'}). ` +
                `This often happens when pointing at a static deployment without backend APIs. ` +
                `Start the backend locally and use TEST_BASE_URL=http://localhost:5000.`
            );
        }

        try {
            const parsed = JSON.parse(lessonsRes.data);
            if (!Array.isArray(parsed)) {
                throw new Error('not-array');
            }
        } catch (_err) {
            throw new Error('Preflight failed: /api/lessons returned invalid JSON.');
        }

        console.log('✅ Preflight OK: backend API reachable (/api/lessons)');
    }

    getCookieHeader(setCookie) {
        if (!setCookie) return '';
        const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
        return cookies
            .map((c) => String(c).split(';')[0])
            .filter(Boolean)
            .join('; ');
    }

    async initializeDatabase() {
        try {
            const dbPath = process.env.DATABASE_URL?.replace('file:', '') || './preet_english.db';
            this.db = new Database(dbPath);
            console.log('✅ Database connected');
            
            // Get all lessons from database
            const lessons = this.db.prepare('SELECT * FROM lessons ORDER BY "order"').all();
            this.allLessons = lessons.map(lesson => ({
                id: lesson.id,
                title: lesson.title,
                slug: lesson.slug,
                difficulty: lesson.difficulty,
                category: lesson.category || 'General',
                route: `/lesson/${lesson.id}`,
                apiEndpoint: `/api/lessons/${lesson.id}`
            }));
            
            this.results.totalLessons = this.allLessons.length;
            console.log(`📚 Found ${this.allLessons.length} lessons in database`);
            
            if (this.allLessons.length === 0) {
                console.log('⚠️  No lessons found in database, using generated lesson list');
                this.allLessons = this.generateComprehensiveLessonList();
            }
            
            return true;
        } catch (error) {
            console.error('⚠️  Database initialization failed, using generated lessons:', error.message);
            this.allLessons = this.generateComprehensiveLessonList();
            return false;
        }
    }

    async createUserAccountDirectly(user) {
        // Create user directly in database (more reliable than API)
        try {
            if (!this.db) {
                console.log(`   ⚠️  Database not available for ${user.username}, trying API...`);
                return await this.createUserAccountViaAPI(user);
            }

            // Check if user already exists
            const existing = this.db.prepare('SELECT * FROM users WHERE username = ?').get(user.username);
            if (existing) {
                this.results.usersCreated++;
                return { success: true, user: existing, method: 'existing' };
            }

            // Hash password (matches server/auth.ts logic exactly)
            const crypto = require('crypto');
            const util = require('util');
            const scryptAsync = util.promisify(crypto.scrypt);
            
            const salt = crypto.randomBytes(16).toString('hex');
            const hashedBuf = await scryptAsync(user.password, salt, 64);
            const hashedPassword = hashedBuf.toString('hex') + '.' + salt;

            // Insert user directly into database
            const result = this.db.prepare(`
                INSERT INTO users (username, password, is_admin) 
                VALUES (?, ?, 0)
            `).run(user.username, hashedPassword);

            if (!result.lastInsertRowid) {
                throw new Error('Failed to insert user - no ID returned');
            }

            const createdUser = this.db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
            
            if (!createdUser) {
                throw new Error('User created but could not retrieve from database');
            }
            
            this.results.usersCreated++;
            return { success: true, user: createdUser, method: 'database' };
        } catch (error) {
            // Fallback to API if database method fails
            console.log(`   ⚠️  Database creation failed for ${user.username}: ${error.message}`);
            return await this.createUserAccountViaAPI(user);
        }
    }

    async createUserAccountViaAPI(user) {
        try {
            const response = await this.makeRequest(`${SITE_URL}/api/register`, {
                method: 'POST',
                body: {
                    username: user.username,
                    password: user.password
                }
            });

            if (response.status === 201 || response.status === 200) {
                this.results.usersCreated++;
                return {
                    success: true,
                    user: JSON.parse(response.data),
                    method: 'api',
                    cookie: this.getCookieHeader(response.setCookie)
                };
            } else {
                // User might already exist, try to login
                const loginResponse = await this.makeRequest(`${SITE_URL}/api/login`, {
                    method: 'POST',
                    body: {
                        username: user.username,
                        password: user.password
                    }
                });

                if (loginResponse.status === 200) {
                    this.results.usersCreated++;
                    return {
                        success: true,
                        user: JSON.parse(loginResponse.data),
                        method: 'api-login',
                        cookie: this.getCookieHeader(loginResponse.setCookie)
                    };
                } else {
                    this.results.usersCreatedFailed++;
                    return { success: false, error: `Failed to create/login: ${response.status}` };
                }
            }
        } catch (error) {
            this.results.usersCreatedFailed++;
            return { success: false, error: error.message };
        }
    }

    async ensureUserSession(user) {
        if (user.cookie) return true;

        try {
            const loginResponse = await this.makeRequest(`${SITE_URL}/api/login`, {
                method: 'POST',
                body: {
                    username: user.username,
                    password: user.password
                }
            });

            if (loginResponse.status === 200) {
                const cookie = this.getCookieHeader(loginResponse.setCookie);
                if (cookie) {
                    user.cookie = cookie;
                }
                return true;
            }

            return false;
        } catch (_err) {
            return false;
        }
    }

    async createUserAccount(user) {
        // Try database method first (more reliable), fallback to API
        return await this.createUserAccountDirectly(user);
    }

    async createAllUsers() {
        console.log('\n👥 CREATING 75 TEST USERS...\n');
        
        const results = [];
        for (let i = 0; i < this.testUsers.length; i += CONCURRENT_USERS) {
            const batch = this.testUsers.slice(i, i + CONCURRENT_USERS);
            const batchNumber = Math.floor(i / CONCURRENT_USERS) + 1;
            const totalBatches = Math.ceil(this.testUsers.length / CONCURRENT_USERS);
            
            console.log(`📦 Creating batch ${batchNumber}/${totalBatches} (${batch.length} users)...`);
            
            const batchPromises = batch.map(async (user) => {
                const result = await this.createUserAccount(user);
                if (result.success) {
                    if (result.cookie) {
                        user.cookie = result.cookie;
                    }
                    const method = result.method || 'unknown';
                    console.log(`   ✅ Created: ${user.username} (${method})`);
                } else {
                    console.log(`   ❌ Failed: ${user.username} - ${result.error}`);
                }
                return { user, result };
            });
            
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            
            // Small delay between batches
            if (i + CONCURRENT_USERS < this.testUsers.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        const successCount = results.filter(r => r.result.success).length;
        console.log(`\n✅ Created ${successCount}/${this.testUsers.length} users successfully\n`);
        
        return results;
    }

    generateRobustTestUsers() {
        const users = [];
        const levels = ['Beginner', 'Intermediate', 'Advanced'];
        
        levels.forEach((level, levelIndex) => {
            for (let i = 1; i <= 25; i++) {
                const userNumber = (levelIndex * 25) + i;
                const username = `${level.toLowerCase()}_user_${String(i).padStart(2, '0')}`;
                const password = `TestPass${userNumber}!`;
                
                users.push({
                    username,
                    password,
                    level: level,
                    profile: this.generateDetailedUserProfile(level.toLowerCase(), i),
                    id: userNumber,
                    targetLessons: Math.floor(this.allLessons.length * LESSON_COVERAGE),
                    completedLessons: 0,
                    navigationErrors: 0,
                    performanceIssues: []
                });
            }
        });
        
        this.testUsers = users;
        this.results.totalUsers = users.length;
        console.log(`👥 Generated ${users.length} test users (25 each: Beginner, Intermediate, Advanced)`);
        return users;
    }

    generateDetailedUserProfile(level, index) {
        const profiles = {
            beginner: [
                'Priya Sharma - New English learner from Delhi',
                'Rajesh Kumar - Starting English journey in Mumbai', 
                'Anita Patel - Basic learner from Ahmedabad',
                'Vikram Singh - Beginner student from Jaipur',
                'Meera Gupta - Learning basics in Pune'
            ],
            intermediate: [
                'Arjun Reddy - Improving skills in Hyderabad',
                'Kavya Nair - Intermediate learner from Kochi',
                'Rohit Jain - Building confidence in Indore',
                'Deepika Rao - Advancing knowledge in Bangalore',
                'Amit Verma - Progressing well in Lucknow'
            ],
            advanced: [
                'Sneha Iyer - Advanced speaker from Chennai',
                'Karan Malhotra - Fluent learner from Chandigarh',
                'Pooja Agarwal - Expert level from Kolkata',
                'Suresh Pillai - Professional user from Thiruvananthapuram',
                'Ritu Chopra - Master student from Gurgaon'
            ]
        };
        
        const levelProfiles = profiles[level];
        return levelProfiles[index % levelProfiles.length];
    }

    generateComprehensiveLessonList() {
        // Comprehensive lesson structure based on actual data
        const lessons = [];
        
        // Daily Conversations (1-20)
        for (let i = 1; i <= 20; i++) {
            lessons.push({
                id: i,
                title: `Daily Conversation ${i}`,
                category: 'Daily Life',
                difficulty: i <= 7 ? 'beginner' : i <= 14 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'listening'
            });
        }

        // Business English (21-40)
        for (let i = 21; i <= 40; i++) {
            lessons.push({
                id: i,
                title: `Business English ${i - 20}`,
                category: 'Business',
                difficulty: i <= 27 ? 'beginner' : i <= 34 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'conversation'
            });
        }

        // Grammar Lessons (41-80)
        for (let i = 41; i <= 80; i++) {
            lessons.push({
                id: i,
                title: `Grammar Lesson ${i - 40}`,
                category: 'Grammar',
                difficulty: i <= 53 ? 'beginner' : i <= 66 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'grammar'
            });
        }

        // Vocabulary Building (81-120)
        for (let i = 81; i <= 120; i++) {
            lessons.push({
                id: i,
                title: `Vocabulary ${i - 80}`,
                category: 'Vocabulary',
                difficulty: i <= 93 ? 'beginner' : i <= 106 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'vocabulary'
            });
        }

        // Pronunciation Practice (121-160)
        for (let i = 121; i <= 160; i++) {
            lessons.push({
                id: i,
                title: `Pronunciation ${i - 120}`,
                category: 'Pronunciation',
                difficulty: i <= 133 ? 'beginner' : i <= 146 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'speaking'
            });
        }

        // Cultural Context (161-200)
        for (let i = 161; i <= 200; i++) {
            lessons.push({
                id: i,
                title: `Cultural Context ${i - 160}`,
                category: 'Culture',
                difficulty: i <= 173 ? 'beginner' : i <= 186 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'cultural'
            });
        }

        // Advanced Topics (201-250)
        for (let i = 201; i <= 250; i++) {
            lessons.push({
                id: i,
                title: `Advanced Topic ${i - 200}`,
                category: 'Advanced',
                difficulty: 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'advanced'
            });
        }

        // Interview Preparation (251-300)
        for (let i = 251; i <= 300; i++) {
            lessons.push({
                id: i,
                title: `Interview Prep ${i - 250}`,
                category: 'Interview',
                difficulty: i <= 263 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'interview'
            });
        }

        // Professional Writing (301-350)
        for (let i = 301; i <= 350; i++) {
            lessons.push({
                id: i,
                title: `Professional Writing ${i - 300}`,
                category: 'Writing',
                difficulty: i <= 313 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'writing'
            });
        }

        // Listening Comprehension (351-400)
        for (let i = 351; i <= 400; i++) {
            lessons.push({
                id: i,
                title: `Listening Comprehension ${i - 350}`,
                category: 'Listening',
                difficulty: i <= 363 ? 'beginner' : i <= 376 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'listening'
            });
        }

        // Speaking Confidence (401-450)
        for (let i = 401; i <= 450; i++) {
            lessons.push({
                id: i,
                title: `Speaking Confidence ${i - 400}`,
                category: 'Speaking',
                difficulty: i <= 413 ? 'beginner' : i <= 426 ? 'intermediate' : 'advanced',
                route: `/lesson/${i}`,
                apiEndpoint: `/api/lessons/${i}`,
                type: 'speaking'
            });
        }

        console.log(`📚 Generated ${lessons.length} comprehensive lessons for testing`);
        return lessons;
    }

    async makeRequest(url, options = {}) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const isHttps = urlObj.protocol === 'https:';
            const client = isHttps ? https : http;
            
            const requestOptions = {
                hostname: urlObj.hostname,
                port: urlObj.port || (isHttps ? 443 : 80),
                path: urlObj.pathname + urlObj.search,
                method: options.method || 'GET',
                headers: {
                    'User-Agent': 'PreetEnglish-RobustStrengthTest/1.0',
                    'Accept': 'application/json, text/html, */*',
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                timeout: TEST_TIMEOUT
            };

            if (options.body) {
                const body = JSON.stringify(options.body);
                requestOptions.headers['Content-Length'] = Buffer.byteLength(body);
            }

            const startTime = Date.now();
            const req = client.request(requestOptions, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const duration = Date.now() - startTime;
                    resolve({
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        headers: res.headers,
                        setCookie: res.headers['set-cookie'],
                        data: data,
                        url: url,
                        duration: duration
                    });
                });
            });

            req.on('error', reject);
            req.on('timeout', () => {
                req.destroy();
                reject(new Error(`Request timeout for ${url}`));
            });

            if (options.body) {
                req.write(JSON.stringify(options.body));
            }

            req.end();
        });
    }

    selectRandomLessons(user) {
        // Select lessons appropriate for user level + some challenging ones
        const userLevelLessons = this.allLessons.filter(lesson => 
            lesson.difficulty === user.level || lesson.difficulty === user.level.toLowerCase()
        );
        const otherLessons = this.allLessons.filter(lesson => 
            lesson.difficulty !== user.level && lesson.difficulty !== user.level.toLowerCase()
        );
        
        // 70% from user level, 30% from other levels for challenge
        const targetCount = Math.floor(this.allLessons.length * LESSON_COVERAGE);
        const userLevelCount = Math.floor(targetCount * 0.7);
        const otherLevelCount = targetCount - userLevelCount;
        
        const selectedLessons = [
            ...this.shuffleArray([...userLevelLessons]).slice(0, userLevelCount),
            ...this.shuffleArray([...otherLessons]).slice(0, otherLevelCount)
        ];
        
        return this.shuffleArray(selectedLessons);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    async testUserLessonNavigation(user) {
        console.log(`🎓 INTENSIVE LESSON TESTING: ${user.username} (${user.level})`);
        
        await this.ensureUserSession(user);

        const userJourney = {
            user: user.username,
            level: user.level,
            startTime: Date.now(),
            lessonsAttempted: 0,
            lessonsCompleted: 0,
            navigationErrors: 0,
            performanceIssues: [],
            bottlenecks: [],
            lessonDetails: [],
            totalTime: 0
        };

        // Select random lessons for this user (90% coverage)
        const selectedLessons = this.selectRandomLessons(user);
        console.log(`   📋 Selected ${selectedLessons.length} lessons for ${user.username}`);

        for (const lesson of selectedLessons) {
            try {
                userJourney.lessonsAttempted++;
                const lessonStartTime = Date.now();

                // Test lesson API endpoint (primary test)
                const apiStartTime = Date.now();
                let apiResponse;
                try {
                    apiResponse = await this.makeRequest(`${SITE_URL}${lesson.apiEndpoint}`);
                } catch (error) {
                    apiResponse = { status: 0, duration: Date.now() - apiStartTime, error: error.message };
                }
                const apiDuration = Date.now() - apiStartTime;
                
                // Test lesson page navigation (secondary test)
                let lessonPageResponse = { status: 0, duration: 0 };
                try {
                    lessonPageResponse = await this.makeRequest(`${SITE_URL}${lesson.route}`, {
                        headers: user.cookie ? { Cookie: user.cookie } : {}
                    });
                } catch (error) {
                    // Page navigation is optional, API is primary
                }
                const lessonPageDuration = Date.now() - lessonStartTime;

                // If the server enforces auth for quiz route, this will expose session/cookie issues.
                let quizResponse = { status: 0, duration: 0 };
                try {
                    quizResponse = await this.makeRequest(`${SITE_URL}/api/lessons/${lesson.id}/quiz`, {
                        headers: user.cookie ? { Cookie: user.cookie } : {}
                    });
                } catch (_error) {
                    // Quiz route can be missing for some lessons; ignore errors here.
                }

                const lessonResult = {
                    lessonId: lesson.id,
                    title: lesson.title,
                    category: lesson.category,
                    difficulty: lesson.difficulty,
                    type: lesson.type || 'general',
                    pageStatus: lessonPageResponse.status,
                    pageLoadTime: lessonPageDuration,
                    apiStatus: apiResponse.status,
                    apiResponseTime: apiDuration,
                    quizStatus: quizResponse.status,
                    success: apiResponse.status === 200, // API is primary indicator
                    hasContent: apiResponse.status === 200 && apiResponse.data && apiResponse.data.length > 0
                };

                userJourney.lessonDetails.push(lessonResult);

                if (lessonResult.success) {
                    userJourney.lessonsCompleted++;
                    this.results.successfulNavigations++;
                } else {
                    userJourney.navigationErrors++;
                    this.results.failedNavigations++;
                }

                // Check for performance issues
                if (apiDuration > 5000) {
                    const bottleneck = {
                        user: user.username,
                        lesson: lesson.title,
                        lessonId: lesson.id,
                        issue: 'Slow API response',
                        duration: apiDuration,
                        severity: 'high',
                        threshold: 5000
                    };
                    userJourney.bottlenecks.push(bottleneck);
                    this.results.criticalBottlenecks.push(bottleneck);
                } else if (apiDuration > 3000) {
                    const performanceIssue = {
                        user: user.username,
                        lesson: lesson.title,
                        lessonId: lesson.id,
                        issue: 'Moderate API response time',
                        duration: apiDuration,
                        severity: 'medium',
                        threshold: 3000
                    };
                    userJourney.performanceIssues.push(performanceIssue);
                    this.results.performanceIssues.push(performanceIssue);
                }

                this.results.totalLessonNavigations++;

                // Update lesson coverage tracking
                if (!this.results.lessonCoverage[lesson.id]) {
                    this.results.lessonCoverage[lesson.id] = {
                        lesson: lesson.title,
                        category: lesson.category,
                        difficulty: lesson.difficulty,
                        attempts: 0,
                        successes: 0,
                        failures: 0,
                        avgResponseTime: 0,
                        maxResponseTime: 0,
                        responseTimes: []
                    };
                }

                const coverage = this.results.lessonCoverage[lesson.id];
                coverage.attempts++;
                coverage.responseTimes.push(apiDuration);
                coverage.avgResponseTime = coverage.responseTimes.reduce((a, b) => a + b, 0) / coverage.responseTimes.length;
                coverage.maxResponseTime = Math.max(...coverage.responseTimes);
                
                if (lessonResult.success) {
                    coverage.successes++;
                } else {
                    coverage.failures++;
                }

                // Small delay to simulate real user behavior
                await new Promise(resolve => setTimeout(resolve, 200));

            } catch (error) {
                userJourney.navigationErrors++;
                this.results.failedNavigations++;
                this.results.errors.push({
                    user: user.username,
                    lesson: lesson.title,
                    lessonId: lesson.id,
                    error: error.message
                });
            }
        }

        userJourney.totalTime = Date.now() - userJourney.startTime;
        this.results.userJourneys.push(userJourney);

        const completionRate = userJourney.lessonsAttempted > 0 
            ? (userJourney.lessonsCompleted / userJourney.lessonsAttempted) * 100 
            : 0;
        console.log(`   ✅ ${user.username}: ${userJourney.lessonsCompleted}/${userJourney.lessonsAttempted} lessons (${completionRate.toFixed(1)}%)`);

        return userJourney;
    }

    validateLessonContent(lesson, content) {
        const lowerContent = content.toLowerCase();
        
        // Check for lesson-specific content
        const contentChecks = {
            listening: ['audio', 'listen', 'sound', 'play'],
            conversation: ['conversation', 'dialogue', 'speak', 'talk'],
            grammar: ['grammar', 'rule', 'structure', 'sentence'],
            vocabulary: ['vocabulary', 'word', 'meaning', 'definition'],
            speaking: ['speaking', 'pronunciation', 'voice', 'record'],
            cultural: ['culture', 'context', 'indian', 'tradition'],
            advanced: ['advanced', 'complex', 'professional'],
            interview: ['interview', 'job', 'career', 'professional'],
            writing: ['writing', 'write', 'essay', 'composition']
        };

        const expectedKeywords = contentChecks[lesson.type] || ['lesson', 'learn', 'study'];
        return expectedKeywords.some(keyword => lowerContent.includes(keyword));
    }

    async testConcurrentUsers(users) {
        console.log(`🚀 TESTING ${users.length} USERS CONCURRENTLY...`);
        
        const promises = users.map(async (user) => {
            return await this.testUserLessonNavigation(user);
        });

        return await Promise.all(promises);
    }

    calculateLaunchReadiness() {
        const totalTests = this.results.totalLessonNavigations;
        const successRate = (this.results.successfulNavigations / totalTests) * 100;
        const criticalIssues = this.results.criticalBottlenecks.length;
        const averagePerformance = this.calculateAveragePerformance();

        // Launch readiness criteria
        const criteria = {
            minimumSuccessRate: MIN_SUCCESS_RATE,
            maximumCriticalIssues: MAX_CRITICAL_ISSUES,
            maximumAverageLoadTime: MAX_AVG_LOAD_TIME_MS,
            minimumLessonCoverage: MIN_LESSON_COVERAGE_PERCENT
        };

        const lessonCoveragePercent = (Object.keys(this.results.lessonCoverage).length / this.allLessons.length) * 100;

        this.results.launchReadiness = 
            successRate >= criteria.minimumSuccessRate &&
            criticalIssues <= criteria.maximumCriticalIssues &&
            averagePerformance <= criteria.maximumAverageLoadTime &&
            lessonCoveragePercent >= criteria.minimumLessonCoverage;

        return {
            isReady: this.results.launchReadiness,
            successRate: successRate,
            criticalIssues: criticalIssues,
            averagePerformance: averagePerformance,
            lessonCoverage: lessonCoveragePercent,
            criteria: criteria
        };
    }

    calculateAveragePerformance() {
        const allResponseTimes = [];
        this.results.userJourneys.forEach(journey => {
            journey.lessonDetails.forEach(lesson => {
                if (lesson.apiResponseTime) {
                    allResponseTimes.push(lesson.apiResponseTime);
                }
            });
        });

        return allResponseTimes.length > 0 ? 
               allResponseTimes.reduce((sum, time) => sum + time, 0) / allResponseTimes.length : 0;
    }

    async generateLaunchReadinessReport() {
        const totalTestTime = Date.now() - this.startTime;
        const readiness = this.calculateLaunchReadiness();

        console.log('\n' + '='.repeat(80));
        console.log('🚀 ROBUST STRENGTH TEST - LAUNCH READINESS REPORT');
        console.log('='.repeat(80));

        console.log('\n📊 COMPREHENSIVE TEST STATISTICS:');
        console.log(`   Total Users: ${this.results.totalUsers}`);
        console.log(`   Users Created: ${this.results.usersCreated}`);
        console.log(`   Users Creation Failed: ${this.results.usersCreatedFailed}`);
        console.log(`   Total Lessons Available: ${this.allLessons.length}`);
        console.log(`   Total Lesson Navigations: ${this.results.totalLessonNavigations}`);
        console.log(`   Successful Navigations: ${this.results.successfulNavigations} ✅`);
        console.log(`   Failed Navigations: ${this.results.failedNavigations} ❌`);
        console.log(`   Success Rate: ${readiness.successRate.toFixed(2)}%`);

        console.log('\n📚 LESSON COVERAGE ANALYSIS:');
        console.log(`   Lessons Covered: ${Object.keys(this.results.lessonCoverage).length}/${this.allLessons.length}`);
        console.log(`   Coverage Percentage: ${readiness.lessonCoverage.toFixed(1)}%`);

        // Category breakdown
        const categoryStats = {};
        Object.values(this.results.lessonCoverage).forEach(lesson => {
            if (!categoryStats[lesson.category]) {
                categoryStats[lesson.category] = { total: 0, successes: 0 };
            }
            categoryStats[lesson.category].total += lesson.attempts;
            categoryStats[lesson.category].successes += lesson.successes;
        });

        console.log('\n📋 CATEGORY PERFORMANCE:');
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            const successRate = (stats.successes / stats.total) * 100;
            console.log(`   ${category}: ${stats.successes}/${stats.total} (${successRate.toFixed(1)}%)`);
        });

        console.log('\n⚡ PERFORMANCE ANALYSIS:');
        console.log(`   Average Load Time: ${Math.round(readiness.averagePerformance)}ms`);
        console.log(`   Critical Bottlenecks: ${readiness.criticalIssues}`);
        console.log(`   Performance Issues: ${this.results.performanceIssues.length}`);

        if (this.results.criticalBottlenecks.length > 0) {
            console.log('\n🚨 TOP CRITICAL BOTTLENECKS:');
            const topBottlenecks = this.results.criticalBottlenecks
                .sort((a, b) => (b.duration || 0) - (a.duration || 0))
                .slice(0, 10);
            topBottlenecks.forEach((bottleneck, index) => {
                console.log(`   ${index + 1}. ${bottleneck.lesson} (ID: ${bottleneck.lessonId || 'N/A'}): ${bottleneck.duration}ms`);
            });
        }

        console.log('\n👥 USER LEVEL PERFORMANCE:');
        const levelStats = { 'Beginner': [], 'Intermediate': [], 'Advanced': [] };
        this.results.userJourneys.forEach(journey => {
            const level = journey.level.charAt(0).toUpperCase() + journey.level.slice(1);
            if (levelStats[level]) {
                levelStats[level].push(journey);
            } else {
                // Fallback for lowercase
                const lowerLevel = journey.level.toLowerCase();
                if (levelStats[lowerLevel]) {
                    levelStats[lowerLevel].push(journey);
                }
            }
        });

        Object.keys(levelStats).forEach(level => {
            const journeys = levelStats[level];
            const totalCompleted = journeys.reduce((sum, j) => sum + j.lessonsCompleted, 0);
            const totalAttempted = journeys.reduce((sum, j) => sum + j.lessonsAttempted, 0);
            const successRate = totalAttempted > 0 ? (totalCompleted / totalAttempted) * 100 : 0;
            console.log(`   ${level.toUpperCase()}: ${totalCompleted}/${totalAttempted} (${successRate.toFixed(1)}%)`);
        });

        console.log('\n🎯 LAUNCH READINESS ASSESSMENT:');
        console.log(`   Success Rate: ${readiness.successRate.toFixed(1)}% (Required: ${readiness.criteria.minimumSuccessRate}%) ${readiness.successRate >= readiness.criteria.minimumSuccessRate ? '✅' : '❌'}`);
        console.log(`   Critical Issues: ${readiness.criticalIssues} (Max: ${readiness.criteria.maximumCriticalIssues}) ${readiness.criticalIssues <= readiness.criteria.maximumCriticalIssues ? '✅' : '❌'}`);
        console.log(`   Average Performance: ${Math.round(readiness.averagePerformance)}ms (Max: ${readiness.criteria.maximumAverageLoadTime}ms) ${readiness.averagePerformance <= readiness.criteria.maximumAverageLoadTime ? '✅' : '❌'}`);
        console.log(`   Lesson Coverage: ${readiness.lessonCoverage.toFixed(1)}% (Min: ${readiness.criteria.minimumLessonCoverage}%) ${readiness.lessonCoverage >= readiness.criteria.minimumLessonCoverage ? '✅' : '❌'}`);

        console.log('\n🚀 FINAL LAUNCH DECISION:');
        if (readiness.isReady) {
            console.log('   ✅ 🎉 LAUNCH APPROVED - SYSTEM IS PRODUCTION READY! 🎉');
            console.log('   🌟 All criteria met for successful launch');
            console.log('   🚀 PreetEnglish is ready to serve users worldwide');
        } else {
            console.log('   ❌ 🚨 LAUNCH NOT RECOMMENDED - CRITICAL ISSUES DETECTED 🚨');
            console.log('   🔧 Please resolve identified issues before launch');
            console.log('   ⚠️  System needs optimization for production readiness');
        }

        console.log(`\n⏱️  TOTAL TEST DURATION: ${Math.round(totalTestTime / 1000)} seconds`);
        console.log('='.repeat(80));

        // Save detailed results
        await this.saveRobustTestResults(readiness);
        
        return readiness;
    }

    async saveRobustTestResults(readiness) {
        const detailedReport = {
            timestamp: new Date().toISOString(),
            testDuration: Date.now() - this.startTime,
            launchReadiness: readiness,
            summary: this.results,
            userProfiles: this.testUsers,
            lessonStructure: this.allLessons,
            testConfiguration: {
                siteUrl: SITE_URL,
                totalUsers: this.testUsers.length,
                concurrentUsers: CONCURRENT_USERS,
                lessonCoverage: LESSON_COVERAGE,
                totalLessons: this.allLessons.length,
                usersCreated: this.results.usersCreated,
                usersCreatedFailed: this.results.usersCreatedFailed
            }
        };

        const reportPath = path.join(__dirname, 'ROBUST_STRENGTH_TEST_RESULTS.json');
        fs.writeFileSync(reportPath, JSON.stringify(detailedReport, null, 2));
        console.log(`📄 Detailed results saved to: ${reportPath}`);
    }

    async run() {
        console.log('🚀 STARTING ROBUST STRENGTH TEST - LAUNCH READINESS VALIDATION\n');
        console.log(`🎯 Target Site: ${SITE_URL}`);
        console.log(`📚 Testing ${LESSON_COVERAGE * 100}% lesson coverage per user`);
        console.log(`⚡ Concurrent Users: ${CONCURRENT_USERS}`);
        console.log(`🚨 CRITICAL: This is a PRE-LAUNCH validation test\n`);

        try {
            // Preflight to avoid running against a static site without backend APIs
            await this.preflightBackend();

            // Initialize database and get lessons
            await this.initializeDatabase();

            // Generate test users
            this.generateRobustTestUsers();

            // Create all users
            await this.createAllUsers();

            this.results.totalUsers = this.testUsers.length;
            this.results.totalLessons = this.allLessons.length;

            // Test users in batches for intensive lesson navigation
            console.log('🎓 STARTING INTENSIVE LESSON NAVIGATION TESTING...\n');
            
            for (let i = 0; i < this.testUsers.length; i += CONCURRENT_USERS) {
                const batch = this.testUsers.slice(i, i + CONCURRENT_USERS);
                const batchNumber = Math.floor(i / CONCURRENT_USERS) + 1;
                const totalBatches = Math.ceil(this.testUsers.length / CONCURRENT_USERS);
                
                console.log(`\n📦 BATCH ${batchNumber}/${totalBatches} - Testing ${batch.length} users`);
                
                await this.testConcurrentUsers(batch);
                
                // Progress update
                const progress = ((i + CONCURRENT_USERS) / this.testUsers.length) * 100;
                console.log(`   📊 Progress: ${Math.min(progress, 100).toFixed(1)}% complete`);
                
                // Small delay between batches to avoid overwhelming the server
                if (i + CONCURRENT_USERS < this.testUsers.length) {
                    console.log('   ⏳ Cooling down before next batch...');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }

            // Generate comprehensive launch readiness report
            return await this.generateLaunchReadinessReport();

        } catch (error) {
            console.error('❌ ROBUST STRENGTH TEST FAILED:', error);
            throw error;
        } finally {
            if (this.db) {
                this.db.close();
            }
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const maxAttempts = Number.parseInt(process.env.MAX_ATTEMPTS || '3', 10);
    const autoFix = String(process.env.AUTO_FIX || '0') === '1';
    const cooldownMs = Number.parseInt(process.env.COOLDOWN_MS || '2000', 10);

    const runAttempt = async (attempt) => {
        console.log(`\n🔁 ROBUST STRENGTH TEST ATTEMPT ${attempt}/${maxAttempts}`);
        const tester = new RobustStrengthTester();
        const readiness = await tester.run();
        return readiness;
    };

    const maybeAutoFix = () => {
        if (!autoFix) return true;
        const resolverPath = path.join(__dirname, 'bottleneck-resolver.cjs');
        console.log(`\n🔧 AUTO_FIX enabled. Running: ${resolverPath}`);
        const result = spawnSync('node', [resolverPath], {
            stdio: 'inherit',
            env: process.env,
        });
        return result.status === 0;
    };

    (async () => {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const readiness = await runAttempt(attempt);

                console.log('\n🏁 ROBUST STRENGTH TEST COMPLETED');
                if (readiness.isReady) {
                    process.exit(0);
                }

                if (attempt === maxAttempts) {
                    process.exit(1);
                }

                const fixed = maybeAutoFix();
                if (!fixed) {
                    process.exit(1);
                }

                await new Promise((r) => setTimeout(r, cooldownMs));
            } catch (error) {
                console.error('💥 CRITICAL FAILURE:', error);
                if (attempt === maxAttempts) {
                    process.exit(1);
                }
                const fixed = maybeAutoFix();
                if (!fixed) {
                    process.exit(1);
                }
                await new Promise((r) => setTimeout(r, cooldownMs));
            }
        }

        process.exit(1);
    })();
}

module.exports = RobustStrengthTester;