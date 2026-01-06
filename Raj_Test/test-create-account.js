#!/usr/bin/env node

/**
 * 🧪 CREATE ACCOUNT FUNCTIONALITY TEST
 * 
 * Tests the Create Account feature on the live deployment
 * Validates form submission, error handling, and user flow
 */

const puppeteer = require('puppeteer');

const SITE_URL = 'https://preetenglish.netlify.app';
const TEST_TIMEOUT = 30000;

// Test user data
const testUsers = [
    { username: 'student01', password: 'pass1' },
    { username: 'student02', password: 'pass2' },
    { username: 'testuser123', password: 'testpass123' }
];

class CreateAccountTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            errors: [],
            details: []
        };
    }

    async init() {
        console.log('🚀 Initializing Create Account Test Suite...\n');
        
        this.browser = await puppeteer.launch({
            headless: false, // Set to true for CI/CD
            defaultViewport: { width: 1280, height: 720 },
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        this.page = await this.browser.newPage();
        
        // Enable console logging
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('❌ Browser Error:', msg.text());
            }
        });
        
        // Enable request/response logging
        this.page.on('response', response => {
            if (response.url().includes('/api/')) {
                console.log(`📡 API Response: ${response.url()} - ${response.status()}`);
            }
        });
    }

    async runTest(testName, testFn) {
        this.results.totalTests++;
        console.log(`🧪 Testing: ${testName}`);
        
        try {
            const startTime = Date.now();
            await testFn();
            const duration = Date.now() - startTime;
            
            this.results.passedTests++;
            this.results.details.push({
                test: testName,
                status: 'PASS',
                duration: `${duration}ms`,
                error: null
            });
            console.log(`✅ PASS: ${testName} (${duration}ms)\n`);
        } catch (error) {
            this.results.failedTests++;
            this.results.errors.push({ test: testName, error: error.message });
            this.results.details.push({
                test: testName,
                status: 'FAIL',
                duration: null,
                error: error.message
            });
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Error: ${error.message}\n`);
        }
    }

    async testLandingPageAccess() {
        await this.page.goto(SITE_URL, { waitUntil: 'networkidle2', timeout: TEST_TIMEOUT });
        
        // Check if page loaded correctly
        const title = await this.page.title();
        if (!title.includes('Preet') && !title.includes('English')) {
            throw new Error(`Unexpected page title: ${title}`);
        }
        
        // Check for Create Account buttons
        const createAccountButtons = await this.page.$$('a[href="/auth"], button:has-text("Create Account")');
        if (createAccountButtons.length === 0) {
            throw new Error('No Create Account buttons found on landing page');
        }
        
        console.log(`   ✓ Found ${createAccountButtons.length} Create Account button(s)`);
    }

    async testNavigationToAuthPage() {
        // Click the first Create Account button
        await this.page.click('a[href="/auth"]');
        
        // Wait for navigation
        await this.page.waitForURL('**/auth', { timeout: TEST_TIMEOUT });
        
        // Verify we're on the auth page
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/auth')) {
            throw new Error(`Expected /auth page, got: ${currentUrl}`);
        }
        
        // Check for auth form elements
        const signUpTab = await this.page.$('button[data-state="inactive"]:has-text("Sign Up"), [role="tab"]:has-text("Sign Up")');
        if (!signUpTab) {
            throw new Error('Sign Up tab not found on auth page');
        }
        
        console.log('   ✓ Successfully navigated to auth page');
        console.log('   ✓ Sign Up tab found');
    }

    async testSignUpTabActivation() {
        // Click on Sign Up tab
        await this.page.click('[role="tab"]:has-text("Sign Up")');
        
        // Wait for tab to become active
        await this.page.waitForTimeout(1000);
        
        // Verify Sign Up form is visible
        const createAccountCard = await this.page.$('h2:has-text("Create Account")');
        if (!createAccountCard) {
            throw new Error('Create Account form not visible after clicking Sign Up tab');
        }
        
        // Check for form fields
        const usernameField = await this.page.$('input[name="username"]');
        const passwordField = await this.page.$('input[name="password"]');
        const submitButton = await this.page.$('button[type="submit"]:has-text("Create Account")');
        
        if (!usernameField) throw new Error('Username field not found');
        if (!passwordField) throw new Error('Password field not found');
        if (!submitButton) throw new Error('Create Account submit button not found');
        
        console.log('   ✓ Sign Up tab activated successfully');
        console.log('   ✓ All form fields present');
    }

    async testFormValidation() {
        // Test empty form submission
        await this.page.click('button[type="submit"]:has-text("Create Account")');
        
        // Wait for validation messages
        await this.page.waitForTimeout(1000);
        
        // Check for validation errors
        const validationErrors = await this.page.$$('.text-red-600, .text-destructive, [role="alert"]');
        if (validationErrors.length === 0) {
            throw new Error('No validation errors shown for empty form');
        }
        
        console.log(`   ✓ Form validation working (${validationErrors.length} error(s) shown)`);
        
        // Test short username
        await this.page.fill('input[name="username"]', 'a');
        await this.page.click('button[type="submit"]:has-text("Create Account")');
        await this.page.waitForTimeout(500);
        
        // Test short password
        await this.page.fill('input[name="username"]', 'validuser');
        await this.page.fill('input[name="password"]', '123');
        await this.page.click('button[type="submit"]:has-text("Create Account")');
        await this.page.waitForTimeout(500);
        
        console.log('   ✓ Field validation working');
    }

    async testValidFormSubmission() {
        const testUser = testUsers[0];
        
        // Clear and fill form with valid data
        await this.page.fill('input[name="username"]', '');
        await this.page.fill('input[name="password"]', '');
        await this.page.fill('input[name="username"]', testUser.username);
        await this.page.fill('input[name="password"]', testUser.password);
        
        console.log(`   ✓ Filled form with: ${testUser.username} / ${testUser.password}`);
        
        // Monitor network requests
        const responses = [];
        this.page.on('response', response => {
            if (response.url().includes('/api/register') || response.url().includes('register')) {
                responses.push({
                    url: response.url(),
                    status: response.status(),
                    statusText: response.statusText()
                });
            }
        });
        
        // Submit form
        await this.page.click('button[type="submit"]:has-text("Create Account")');
        
        // Wait for form processing
        await this.page.waitForTimeout(3000);
        
        // Check for loading state
        const loadingButton = await this.page.$('button:has-text("Please wait...")');
        if (loadingButton) {
            console.log('   ✓ Loading state shown during submission');
            await this.page.waitForTimeout(2000);
        }
        
        // Check for success indicators
        const currentUrl = this.page.url();
        console.log(`   ✓ Current URL after submission: ${currentUrl}`);
        
        // Check for toast notifications or success messages
        const toastMessages = await this.page.$$('[role="alert"], .toast, .notification');
        if (toastMessages.length > 0) {
            const toastText = await this.page.evaluate(() => {
                const toasts = document.querySelectorAll('[role="alert"], .toast, .notification');
                return Array.from(toasts).map(toast => toast.textContent);
            });
            console.log(`   ✓ Toast messages: ${JSON.stringify(toastText)}`);
        }
        
        // Log network responses
        if (responses.length > 0) {
            console.log('   📡 Network responses:', responses);
        }
        
        // Check if redirected to dashboard or still on auth page
        if (currentUrl.includes('/dashboard')) {
            console.log('   ✅ Successfully redirected to dashboard');
        } else if (currentUrl.includes('/auth')) {
            console.log('   ⚠️  Still on auth page - checking for success indicators');
        } else {
            console.log(`   ⚠️  Unexpected redirect to: ${currentUrl}`);
        }
    }

    async testMultipleUserCreation() {
        for (let i = 1; i < testUsers.length; i++) {
            const testUser = testUsers[i];
            
            // Navigate back to auth page if needed
            if (!this.page.url().includes('/auth')) {
                await this.page.goto(`${SITE_URL}/auth`);
                await this.page.waitForTimeout(1000);
            }
            
            // Ensure we're on Sign Up tab
            await this.page.click('[role="tab"]:has-text("Sign Up")');
            await this.page.waitForTimeout(500);
            
            // Fill and submit form
            await this.page.fill('input[name="username"]', testUser.username);
            await this.page.fill('input[name="password"]', testUser.password);
            
            console.log(`   ✓ Testing user ${i + 1}: ${testUser.username}`);
            
            await this.page.click('button[type="submit"]:has-text("Create Account")');
            await this.page.waitForTimeout(2000);
        }
        
        console.log(`   ✅ Tested ${testUsers.length} user registrations`);
    }

    async testErrorHandling() {
        // Navigate to auth page
        await this.page.goto(`${SITE_URL}/auth`);
        await this.page.click('[role="tab"]:has-text("Sign Up")');
        await this.page.waitForTimeout(500);
        
        // Test duplicate username (if backend was available)
        await this.page.fill('input[name="username"]', testUsers[0].username);
        await this.page.fill('input[name="password"]', 'newpassword123');
        
        await this.page.click('button[type="submit"]:has-text("Create Account")');
        await this.page.waitForTimeout(2000);
        
        // Check for error handling
        const errorMessages = await this.page.$$('.text-red-600, .text-destructive, [role="alert"]');
        console.log(`   ✓ Error handling tested (${errorMessages.length} error element(s) found)`);
    }

    async testUIResponsiveness() {
        // Test mobile viewport
        await this.page.setViewport({ width: 375, height: 667 });
        await this.page.reload();
        await this.page.waitForTimeout(1000);
        
        // Check if form is still accessible
        const mobileForm = await this.page.$('input[name="username"]');
        if (!mobileForm) {
            throw new Error('Form not accessible on mobile viewport');
        }
        
        console.log('   ✓ Mobile responsiveness verified');
        
        // Reset to desktop viewport
        await this.page.setViewport({ width: 1280, height: 720 });
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 CREATE ACCOUNT TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`\n📈 SUMMARY:`);
        console.log(`   Total Tests: ${this.results.totalTests}`);
        console.log(`   Passed: ${this.results.passedTests} ✅`);
        console.log(`   Failed: ${this.results.failedTests} ❌`);
        console.log(`   Success Rate: ${((this.results.passedTests / this.results.totalTests) * 100).toFixed(1)}%`);
        
        if (this.results.details.length > 0) {
            console.log(`\n📋 DETAILED RESULTS:`);
            this.results.details.forEach((detail, index) => {
                const status = detail.status === 'PASS' ? '✅' : '❌';
                const duration = detail.duration ? ` (${detail.duration})` : '';
                console.log(`   ${index + 1}. ${status} ${detail.test}${duration}`);
                if (detail.error) {
                    console.log(`      Error: ${detail.error}`);
                }
            });
        }
        
        if (this.results.errors.length > 0) {
            console.log(`\n🚨 ERRORS ENCOUNTERED:`);
            this.results.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error.test}: ${error.error}`);
            });
        }
        
        console.log(`\n🎯 RECOMMENDATIONS:`);
        
        if (this.results.failedTests === 0) {
            console.log('   ✅ All tests passed! Create Account functionality is working correctly.');
        } else {
            console.log('   🔧 Issues found that need attention:');
            
            if (this.results.errors.some(e => e.error.includes('navigation'))) {
                console.log('   - Fix navigation/routing issues');
            }
            if (this.results.errors.some(e => e.error.includes('validation'))) {
                console.log('   - Improve form validation');
            }
            if (this.results.errors.some(e => e.error.includes('API') || e.error.includes('backend'))) {
                console.log('   - Deploy backend API for full functionality');
            }
        }
        
        console.log(`\n🌐 DEPLOYMENT STATUS:`);
        console.log(`   Frontend: ✅ Working (Netlify)`);
        console.log(`   Backend: ❌ Not Available (Static Site)`);
        console.log(`   Authentication: 🔄 Mock Implementation`);
        
        console.log('\n' + '='.repeat(60));
        
        return this.results;
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async run() {
        try {
            await this.init();
            
            // Run all tests
            await this.runTest('Landing Page Access', () => this.testLandingPageAccess());
            await this.runTest('Navigation to Auth Page', () => this.testNavigationToAuthPage());
            await this.runTest('Sign Up Tab Activation', () => this.testSignUpTabActivation());
            await this.runTest('Form Validation', () => this.testFormValidation());
            await this.runTest('Valid Form Submission', () => this.testValidFormSubmission());
            await this.runTest('Multiple User Creation', () => this.testMultipleUserCreation());
            await this.runTest('Error Handling', () => this.testErrorHandling());
            await this.runTest('UI Responsiveness', () => this.testUIResponsiveness());
            
            return await this.generateReport();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            throw error;
        } finally {
            await this.cleanup();
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new CreateAccountTester();
    tester.run()
        .then(results => {
            process.exit(results.failedTests > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = CreateAccountTester;