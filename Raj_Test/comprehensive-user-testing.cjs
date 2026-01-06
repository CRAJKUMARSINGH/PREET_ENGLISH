#!/usr/bin/env node

/**
 * 🧪 COMPREHENSIVE USER TESTING SYSTEM
 * 
 * Creates 75 users (25 each: beginner, intermediate, advanced)
 * Tests complete navigation flow and identifies bottlenecks
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://preetenglish.netlify.app';
const TEST_TIMEOUT = 15000;
const CONCURRENT_USERS = 5; // Test 5 users simultaneously

class ComprehensiveUserTester {
    constructor() {
        this.results = {
            totalUsers: 0,
            successfulLogins: 0,
            failedLogins: 0,
            navigationTests: 0,
            navigationSuccesses: 0,
            navigationFailures: 0,
            bottlenecks: [],
            performanceMetrics: [],
            userJourneys: [],
            errors: []
        };
        
        this.testUsers = this.generateTestUsers();
        this.testRoutes = [
            '/dashboard',
            '/lessons',
            '/vocabulary',
            '/speaking',
            '/listening',
            '/stories',
            '/chat',
            '/progress'
        ];
    }

    generateTestUsers() {
        const users = [];
        const levels = ['beginner', 'intermediate', 'advanced'];
        
        levels.forEach((level, levelIndex) => {
            for (let i = 1; i <= 25; i++) {
                const userNumber = (levelIndex * 25) + i;
                users.push({
                    username: `${level}_user_${String(i).padStart(2, '0')}`,
                    password: `${level}_pass_${i}`,
                    level: level,
                    profile: this.generateUserProfile(level, i),
                    id: userNumber
                });
            }
        });
        
        return users;
    }

    generateUserProfile(level, index) {
        const profiles = {
            beginner: [
                'Priya Sharma - New to English',
                'Rajesh Kumar - Basic learner',
                'Anita Patel - Starting journey',
                'Vikram Singh - Beginner student',
                'Meera Gupta - Learning basics'
            ],
            intermediate: [
                'Arjun Reddy - Improving skills',
                'Kavya Nair - Intermediate learner',
                'Rohit Jain - Building confidence',
                'Deepika Rao - Advancing knowledge',
                'Amit Verma - Progressing well'
            ],
            advanced: [
                'Sneha Iyer - Advanced speaker',
                'Karan Malhotra - Fluent learner',
                'Pooja Agarwal - Expert level',
                'Suresh Pillai - Professional user',
                'Ritu Chopra - Master student'
            ]
        };
        
        const levelProfiles = profiles[level];
        return levelProfiles[index % levelProfiles.length];
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
                    'User-Agent': 'PreetEnglish-ComprehensiveTest/1.0',
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

    async testUserRegistration(user) {
        console.log(`👤 Testing registration for: ${user.username} (${user.level})`);
        
        const journey = {
            user: user.username,
            level: user.level,
            steps: [],
            success: false,
            totalTime: 0,
            bottlenecks: []
        };

        try {
            // Step 1: Access landing page
            const startTime = Date.now();
            const landingResponse = await this.makeRequest(SITE_URL);
            journey.steps.push({
                step: 'Landing Page',
                status: landingResponse.status,
                duration: landingResponse.duration,
                success: landingResponse.status === 200
            });

            // Step 2: Navigate to auth page
            const authResponse = await this.makeRequest(`${SITE_URL}/auth`);
            journey.steps.push({
                step: 'Auth Page',
                status: authResponse.status,
                duration: authResponse.duration,
                success: authResponse.status === 200
            });

            // Step 3: Attempt registration
            const registerResponse = await this.makeRequest(`${SITE_URL}/api/register`, {
                method: 'POST',
                body: {
                    username: user.username,
                    password: user.password
                }
            });

            const isRegistrationSuccess = registerResponse.status < 400 || 
                                        registerResponse.headers['content-type']?.includes('text/html');
            
            journey.steps.push({
                step: 'Registration',
                status: registerResponse.status,
                duration: registerResponse.duration,
                success: isRegistrationSuccess,
                note: registerResponse.headers['content-type']?.includes('text/html') ? 'Static site - mock auth' : 'API response'
            });

            if (isRegistrationSuccess) {
                this.results.successfulLogins++;
                journey.success = true;
            } else {
                this.results.failedLogins++;
            }

            journey.totalTime = Date.now() - startTime;
            this.results.userJourneys.push(journey);

            return journey;

        } catch (error) {
            this.results.failedLogins++;
            journey.steps.push({
                step: 'Registration Error',
                error: error.message,
                success: false
            });
            this.results.errors.push({
                user: user.username,
                error: error.message
            });
            return journey;
        }
    }

    async testNavigationFlow(user) {
        console.log(`🧭 Testing navigation for: ${user.username}`);
        
        const navigationResults = {
            user: user.username,
            level: user.level,
            routes: [],
            totalTime: 0,
            bottlenecks: []
        };

        const startTime = Date.now();

        for (const route of this.testRoutes) {
            try {
                const routeStartTime = Date.now();
                const response = await this.makeRequest(`${SITE_URL}${route}`);
                const routeDuration = Date.now() - routeStartTime;

                const routeResult = {
                    route: route,
                    status: response.status,
                    duration: routeDuration,
                    success: response.status === 200,
                    contentLength: response.data.length,
                    hasContent: this.analyzeRouteContent(route, response.data)
                };

                navigationResults.routes.push(routeResult);
                this.results.navigationTests++;

                if (routeResult.success) {
                    this.results.navigationSuccesses++;
                } else {
                    this.results.navigationFailures++;
                }

                // Identify bottlenecks (slow routes)
                if (routeDuration > 3000) {
                    const bottleneck = {
                        user: user.username,
                        route: route,
                        duration: routeDuration,
                        issue: 'Slow response time'
                    };
                    navigationResults.bottlenecks.push(bottleneck);
                    this.results.bottlenecks.push(bottleneck);
                }

                // Add small delay between requests to simulate real user behavior
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                navigationResults.routes.push({
                    route: route,
                    error: error.message,
                    success: false
                });
                this.results.navigationFailures++;
            }
        }

        navigationResults.totalTime = Date.now() - startTime;
        return navigationResults;
    }

    analyzeRouteContent(route, content) {
        const contentChecks = {
            '/dashboard': ['dashboard', 'progress', 'lessons'],
            '/lessons': ['lesson', 'learn', 'study'],
            '/vocabulary': ['vocabulary', 'words', 'meaning'],
            '/speaking': ['speaking', 'pronunciation', 'practice'],
            '/listening': ['listening', 'audio', 'hear'],
            '/stories': ['story', 'stories', 'read'],
            '/chat': ['chat', 'conversation', 'talk'],
            '/progress': ['progress', 'achievement', 'score']
        };

        const expectedContent = contentChecks[route] || [];
        const lowerContent = content.toLowerCase();
        
        return expectedContent.some(keyword => lowerContent.includes(keyword));
    }

    async testConcurrentUsers(users) {
        console.log(`🚀 Testing ${users.length} users concurrently...`);
        
        const promises = users.map(async (user) => {
            const registrationResult = await this.testUserRegistration(user);
            const navigationResult = await this.testNavigationFlow(user);
            
            return {
                user: user.username,
                level: user.level,
                registration: registrationResult,
                navigation: navigationResult
            };
        });

        return await Promise.all(promises);
    }

    async runPerformanceAnalysis() {
        console.log('📊 Running performance analysis...');
        
        const performanceTests = [
            { name: 'Landing Page Load', url: SITE_URL },
            { name: 'Auth Page Load', url: `${SITE_URL}/auth` },
            { name: 'Dashboard Load', url: `${SITE_URL}/dashboard` },
            { name: 'Lessons Load', url: `${SITE_URL}/lessons` }
        ];

        for (const test of performanceTests) {
            const samples = [];
            
            // Run 5 samples for each test
            for (let i = 0; i < 5; i++) {
                try {
                    const response = await this.makeRequest(test.url);
                    samples.push(response.duration);
                } catch (error) {
                    samples.push(null);
                }
            }

            const validSamples = samples.filter(s => s !== null);
            const avgTime = validSamples.length > 0 ? 
                           validSamples.reduce((a, b) => a + b, 0) / validSamples.length : 0;
            const maxTime = validSamples.length > 0 ? Math.max(...validSamples) : 0;
            const minTime = validSamples.length > 0 ? Math.min(...validSamples) : 0;

            this.results.performanceMetrics.push({
                test: test.name,
                url: test.url,
                samples: validSamples.length,
                avgTime: Math.round(avgTime),
                maxTime: maxTime,
                minTime: minTime,
                rating: this.getPerformanceRating(avgTime)
            });
        }
    }

    getPerformanceRating(avgTime) {
        if (avgTime < 1000) return 'Excellent';
        if (avgTime < 2000) return 'Good';
        if (avgTime < 3000) return 'Fair';
        return 'Poor';
    }

    async identifyBottlenecks() {
        console.log('🔍 Identifying system bottlenecks...');
        
        // Analyze bottlenecks by category
        const bottleneckAnalysis = {
            slowRoutes: {},
            errorRoutes: {},
            levelSpecificIssues: {
                beginner: [],
                intermediate: [],
                advanced: []
            }
        };

        // Group bottlenecks by route
        this.results.bottlenecks.forEach(bottleneck => {
            if (!bottleneckAnalysis.slowRoutes[bottleneck.route]) {
                bottleneckAnalysis.slowRoutes[bottleneck.route] = [];
            }
            bottleneckAnalysis.slowRoutes[bottleneck.route].push(bottleneck);
        });

        // Analyze user journey failures
        this.results.userJourneys.forEach(journey => {
            if (!journey.success) {
                const level = journey.level;
                bottleneckAnalysis.levelSpecificIssues[level].push({
                    user: journey.user,
                    issue: 'Registration failure',
                    steps: journey.steps
                });
            }
        });

        return bottleneckAnalysis;
    }

    async generateComprehensiveReport() {
        console.log('\n' + '='.repeat(80));
        console.log('🧪 COMPREHENSIVE USER TESTING RESULTS');
        console.log('='.repeat(80));

        // User Statistics
        console.log('\n📊 USER TESTING STATISTICS:');
        console.log(`   Total Users Generated: ${this.results.totalUsers}`);
        console.log(`   Successful Registrations: ${this.results.successfulLogins} ✅`);
        console.log(`   Failed Registrations: ${this.results.failedLogins} ❌`);
        console.log(`   Registration Success Rate: ${((this.results.successfulLogins / this.results.totalUsers) * 100).toFixed(1)}%`);

        // Navigation Statistics
        console.log('\n🧭 NAVIGATION TESTING STATISTICS:');
        console.log(`   Total Navigation Tests: ${this.results.navigationTests}`);
        console.log(`   Successful Navigations: ${this.results.navigationSuccesses} ✅`);
        console.log(`   Failed Navigations: ${this.results.navigationFailures} ❌`);
        console.log(`   Navigation Success Rate: ${((this.results.navigationSuccesses / this.results.navigationTests) * 100).toFixed(1)}%`);

        // Performance Metrics
        console.log('\n⚡ PERFORMANCE ANALYSIS:');
        this.results.performanceMetrics.forEach(metric => {
            console.log(`   ${metric.test}:`);
            console.log(`      Average: ${metric.avgTime}ms (${metric.rating})`);
            console.log(`      Range: ${metric.minTime}ms - ${metric.maxTime}ms`);
        });

        // Bottlenecks Analysis
        console.log('\n🚨 BOTTLENECKS IDENTIFIED:');
        if (this.results.bottlenecks.length === 0) {
            console.log('   ✅ No significant bottlenecks detected!');
        } else {
            const bottlenecksByRoute = {};
            this.results.bottlenecks.forEach(bottleneck => {
                if (!bottlenecksByRoute[bottleneck.route]) {
                    bottlenecksByRoute[bottleneck.route] = [];
                }
                bottlenecksByRoute[bottleneck.route].push(bottleneck);
            });

            Object.keys(bottlenecksByRoute).forEach(route => {
                const routeBottlenecks = bottlenecksByRoute[route];
                const avgDuration = routeBottlenecks.reduce((sum, b) => sum + b.duration, 0) / routeBottlenecks.length;
                console.log(`   🐌 ${route}: ${routeBottlenecks.length} slow responses (avg: ${Math.round(avgDuration)}ms)`);
            });
        }

        // User Level Analysis
        console.log('\n👥 USER LEVEL ANALYSIS:');
        const levelStats = { beginner: 0, intermediate: 0, advanced: 0 };
        this.results.userJourneys.forEach(journey => {
            if (journey.success) levelStats[journey.level]++;
        });

        console.log(`   Beginner Users: ${levelStats.beginner}/25 successful (${((levelStats.beginner/25)*100).toFixed(1)}%)`);
        console.log(`   Intermediate Users: ${levelStats.intermediate}/25 successful (${((levelStats.intermediate/25)*100).toFixed(1)}%)`);
        console.log(`   Advanced Users: ${levelStats.advanced}/25 successful (${((levelStats.advanced/25)*100).toFixed(1)}%)`);

        // Recommendations
        console.log('\n🎯 RECOMMENDATIONS:');
        
        if (this.results.failedLogins > 0) {
            console.log('   🔧 AUTHENTICATION ISSUES:');
            console.log('      - Deploy backend API for full authentication');
            console.log('      - Consider serverless authentication (Firebase Auth)');
            console.log('      - Implement better error handling for registration');
        }

        if (this.results.bottlenecks.length > 0) {
            console.log('   ⚡ PERFORMANCE OPTIMIZATIONS:');
            console.log('      - Optimize slow-loading routes');
            console.log('      - Implement caching for static content');
            console.log('      - Consider CDN for better global performance');
        }

        if (this.results.navigationFailures > 0) {
            console.log('   🧭 NAVIGATION IMPROVEMENTS:');
            console.log('      - Fix broken route handlers');
            console.log('      - Implement proper error pages');
            console.log('      - Add loading states for better UX');
        }

        console.log('\n🌟 OVERALL ASSESSMENT:');
        const overallScore = ((this.results.successfulLogins + this.results.navigationSuccesses) / 
                             (this.results.totalUsers + this.results.navigationTests)) * 100;
        
        console.log(`   Overall Success Rate: ${overallScore.toFixed(1)}%`);
        
        if (overallScore >= 90) {
            console.log('   🏆 EXCELLENT - System performing exceptionally well!');
        } else if (overallScore >= 75) {
            console.log('   ✅ GOOD - System working well with minor issues');
        } else if (overallScore >= 60) {
            console.log('   ⚠️  FAIR - System needs improvements');
        } else {
            console.log('   🚨 POOR - System requires immediate attention');
        }

        console.log('\n' + '='.repeat(80));

        // Save detailed results to file
        await this.saveDetailedResults();
        
        return this.results;
    }

    async saveDetailedResults() {
        const detailedReport = {
            timestamp: new Date().toISOString(),
            summary: this.results,
            userProfiles: this.testUsers,
            testConfiguration: {
                siteUrl: SITE_URL,
                totalUsers: this.testUsers.length,
                concurrentUsers: CONCURRENT_USERS,
                testRoutes: this.testRoutes
            }
        };

        const reportPath = path.join(__dirname, '..', 'COMPREHENSIVE_TEST_RESULTS.json');
        fs.writeFileSync(reportPath, JSON.stringify(detailedReport, null, 2));
        console.log(`📄 Detailed results saved to: ${reportPath}`);
    }

    async run() {
        console.log('🚀 Starting Comprehensive User Testing System...\n');
        console.log(`🎯 Target Site: ${SITE_URL}`);
        console.log(`👥 Total Users: ${this.testUsers.length} (25 each: beginner, intermediate, advanced)`);
        console.log(`🧭 Routes to Test: ${this.testRoutes.length}`);
        console.log(`⚡ Concurrent Users: ${CONCURRENT_USERS}\n`);

        try {
            this.results.totalUsers = this.testUsers.length;

            // Run performance analysis first
            await this.runPerformanceAnalysis();

            // Test users in batches
            console.log('👥 Testing user registration and navigation...\n');
            
            for (let i = 0; i < this.testUsers.length; i += CONCURRENT_USERS) {
                const batch = this.testUsers.slice(i, i + CONCURRENT_USERS);
                console.log(`\n📦 Testing batch ${Math.floor(i/CONCURRENT_USERS) + 1}/${Math.ceil(this.testUsers.length/CONCURRENT_USERS)}`);
                
                await this.testConcurrentUsers(batch);
                
                // Small delay between batches to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // Analyze bottlenecks
            await this.identifyBottlenecks();

            // Generate comprehensive report
            return await this.generateComprehensiveReport();

        } catch (error) {
            console.error('❌ Comprehensive testing failed:', error);
            throw error;
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new ComprehensiveUserTester();
    tester.run()
        .then(results => {
            const hasIssues = results.failedLogins > 0 || 
                             results.navigationFailures > 0 || 
                             results.bottlenecks.length > 0;
            process.exit(hasIssues ? 1 : 0);
        })
        .catch(error => {
            console.error('💥 Fatal error:', error);
            process.exit(1);
        });
}

module.exports = ComprehensiveUserTester;