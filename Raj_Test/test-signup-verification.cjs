#!/usr/bin/env node

/**
 * 🔍 SIGNUP VERIFICATION TEST
 * 
 * Quick verification that signup system is accessible and ready for manual testing
 */

const https = require('https');

const SITE_URL = 'https://preetenglish.netlify.app';

async function verifySignupSystem() {
    console.log('🔍 VERIFYING SIGNUP SYSTEM...\n');
    
    const results = {
        authPageAccessible: false,
        signupFormPresent: false,
        dashboardAccessible: false,
        jsFilesLoaded: false,
        overallStatus: 'UNKNOWN'
    };

    try {
        // Test 1: Check auth page accessibility
        console.log('1️⃣ Testing auth page accessibility...');
        const authResponse = await makeRequest(`${SITE_URL}/auth`);
        
        if (authResponse.status === 200) {
            results.authPageAccessible = true;
            console.log('   ✅ Auth page loads successfully');
            
            // Check for signup form elements
            const pageContent = authResponse.data.toLowerCase();
            const hasSignUpTab = pageContent.includes('sign up') || pageContent.includes('create account');
            const hasUsernameField = pageContent.includes('username');
            const hasPasswordField = pageContent.includes('password');
            const hasFormElements = pageContent.includes('form') || pageContent.includes('input');
            
            if (hasSignUpTab && hasUsernameField && hasPasswordField && hasFormElements) {
                results.signupFormPresent = true;
                console.log('   ✅ Signup form elements detected');
            } else {
                console.log('   ⚠️  Some form elements may be missing');
                console.log(`      Sign Up tab: ${hasSignUpTab ? '✅' : '❌'}`);
                console.log(`      Username field: ${hasUsernameField ? '✅' : '❌'}`);
                console.log(`      Password field: ${hasPasswordField ? '✅' : '❌'}`);
            }
            
            // Check for JavaScript files
            const hasReactJS = pageContent.includes('react') || pageContent.includes('.js');
            if (hasReactJS) {
                results.jsFilesLoaded = true;
                console.log('   ✅ JavaScript files detected');
            }
            
        } else {
            console.log(`   ❌ Auth page failed to load: ${authResponse.status}`);
        }

        // Test 2: Check dashboard accessibility
        console.log('\n2️⃣ Testing dashboard page (signup destination)...');
        const dashboardResponse = await makeRequest(`${SITE_URL}/dashboard`);
        
        if (dashboardResponse.status === 200) {
            results.dashboardAccessible = true;
            console.log('   ✅ Dashboard page accessible');
        } else {
            console.log(`   ❌ Dashboard page issue: ${dashboardResponse.status}`);
        }

        // Test 3: Check main app functionality
        console.log('\n3️⃣ Testing core app pages...');
        const corePages = ['/lessons', '/vocabulary', '/speaking'];
        let accessiblePages = 0;
        
        for (const page of corePages) {
            try {
                const pageResponse = await makeRequest(`${SITE_URL}${page}`);
                if (pageResponse.status === 200) {
                    accessiblePages++;
                    console.log(`   ✅ ${page}: accessible`);
                } else {
                    console.log(`   ⚠️  ${page}: ${pageResponse.status}`);
                }
            } catch (error) {
                console.log(`   ❌ ${page}: error`);
            }
        }

        // Determine overall status
        if (results.authPageAccessible && results.signupFormPresent && results.dashboardAccessible) {
            results.overallStatus = 'READY_FOR_MANUAL_TESTING';
        } else if (results.authPageAccessible) {
            results.overallStatus = 'PARTIALLY_READY';
        } else {
            results.overallStatus = 'NOT_READY';
        }

        // Generate report
        console.log('\n' + '='.repeat(60));
        console.log('📊 SIGNUP SYSTEM VERIFICATION RESULTS');
        console.log('='.repeat(60));

        console.log('\n🔍 SYSTEM STATUS:');
        console.log(`   Auth Page Accessible: ${results.authPageAccessible ? '✅' : '❌'}`);
        console.log(`   Signup Form Present: ${results.signupFormPresent ? '✅' : '❌'}`);
        console.log(`   Dashboard Accessible: ${results.dashboardAccessible ? '✅' : '❌'}`);
        console.log(`   JavaScript Loaded: ${results.jsFilesLoaded ? '✅' : '❌'}`);
        console.log(`   Core Pages Working: ${accessiblePages}/${corePages.length}`);

        console.log(`\n🎯 OVERALL STATUS: ${results.overallStatus}`);

        if (results.overallStatus === 'READY_FOR_MANUAL_TESTING') {
            console.log('\n🎉 EXCELLENT! Your signup system is ready for manual testing!');
            console.log('\n📋 NEXT STEPS:');
            console.log('   1. Open browser and go to: https://preetenglish.netlify.app/auth');
            console.log('   2. Click "Sign Up" tab');
            console.log('   3. Enter username: testuser123');
            console.log('   4. Enter password: testpass123');
            console.log('   5. Click "Create Account"');
            console.log('   6. Wait for success message and redirect');
            console.log('\n📖 Full guide: Raj_Test/MANUAL_SIGNUP_TEST_GUIDE.md');
            
        } else if (results.overallStatus === 'PARTIALLY_READY') {
            console.log('\n⚠️  System partially ready - some issues detected');
            console.log('\n🔧 RECOMMENDATIONS:');
            if (!results.dashboardAccessible) {
                console.log('   • Check dashboard page routing');
            }
            if (!results.signupFormPresent) {
                console.log('   • Verify signup form elements are loading');
            }
            console.log('   • Try manual testing anyway - might still work');
            
        } else {
            console.log('\n🚨 System not ready - critical issues found');
            console.log('\n🔧 URGENT FIXES NEEDED:');
            console.log('   • Check deployment status');
            console.log('   • Verify build completed successfully');
            console.log('   • Check for JavaScript errors');
        }

        console.log('\n🌐 TEST URLS:');
        console.log(`   Main Site: ${SITE_URL}`);
        console.log(`   Auth Page: ${SITE_URL}/auth`);
        console.log(`   Dashboard: ${SITE_URL}/dashboard`);

        console.log('\n' + '='.repeat(60));

        return results;

    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        results.overallStatus = 'ERROR';
        return results;
    }
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname,
            method: 'GET',
            headers: {
                'User-Agent': 'PreetEnglish-SignupVerification/1.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });

        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

// Run verification if called directly
if (require.main === module) {
    verifySignupSystem()
        .then(results => {
            const exitCode = results.overallStatus === 'READY_FOR_MANUAL_TESTING' ? 0 : 1;
            process.exit(exitCode);
        })
        .catch(error => {
            console.error('💥 Critical error:', error);
            process.exit(1);
        });
}

module.exports = { verifySignupSystem };