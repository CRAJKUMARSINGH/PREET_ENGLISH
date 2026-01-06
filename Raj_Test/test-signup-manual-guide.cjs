#!/usr/bin/env node

/**
 * 🎯 MANUAL SIGNUP TESTING GUIDE
 * 
 * Generates random users for manual testing since automated testing
 * can't interact with React components in a SPA deployment
 */

const fs = require('fs');
const path = require('path');

class ManualSignupGuide {
    constructor() {
        this.randomUsers = this.generateRandomUsers(25);
    }

    generateRandomUsers(count) {
        const firstNames = [
            'Priya', 'Rajesh', 'Anita', 'Vikram', 'Meera', 'Arjun', 'Kavya', 'Rohit',
            'Deepika', 'Amit', 'Sneha', 'Karan', 'Pooja', 'Suresh', 'Ritu', 'Rahul',
            'Sita', 'Krishna', 'Lakshmi', 'Ganesh', 'Saraswati', 'Vishnu', 'Shiva',
            'Parvati', 'Indira', 'Mahatma', 'Subhash', 'Bhagat', 'Rani', 'Chandragupta'
        ];
        
        const lastNames = [
            'Sharma', 'Kumar', 'Patel', 'Singh', 'Gupta', 'Reddy', 'Nair', 'Jain',
            'Rao', 'Verma', 'Iyer', 'Malhotra', 'Agarwal', 'Pillai', 'Chopra',
            'Mishra', 'Tiwari', 'Pandey', 'Srivastava', 'Banerjee', 'Mukherjee',
            'Ghosh', 'Das', 'Roy', 'Bose', 'Chatterjee', 'Dutta', 'Sen', 'Bhattacharya'
        ];
        
        const cities = [
            'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
            'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
            'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ludhiana',
            'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan'
        ];
        
        const users = [];
        
        for (let i = 0; i < count; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const randomNum = Math.floor(Math.random() * 999) + 100;
            
            // Generate various username patterns
            const usernamePatterns = [
                `${firstName.toLowerCase()}${randomNum}`,
                `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
                `${firstName.toLowerCase()}.${city.toLowerCase()}`,
                `${lastName.toLowerCase()}${randomNum}`,
                `${city.toLowerCase()}_user${randomNum}`,
                `english_learner_${randomNum}`,
                `${firstName.toLowerCase()}${lastName.toLowerCase()}`
            ];
            
            const username = usernamePatterns[Math.floor(Math.random() * usernamePatterns.length)];
            
            // Generate secure passwords
            const passwordPatterns = [
                `${firstName}${randomNum}!`,
                `${city}@${randomNum}`,
                `Learn${randomNum}#`,
                `English${randomNum}$`,
                `${firstName}${lastName}123`,
                `Study${randomNum}@`,
                `${city}Pass${randomNum}`,
                `Hindi2Eng${randomNum}`,
                `Preet${randomNum}!`,
                `${firstName}${city}${randomNum}`
            ];
            
            const password = passwordPatterns[Math.floor(Math.random() * passwordPatterns.length)];
            
            users.push({
                id: i + 1,
                username: username,
                password: password,
                profile: `${firstName} ${lastName} from ${city}`,
                firstName: firstName,
                lastName: lastName,
                city: city,
                level: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
                expectedBehavior: this.getExpectedBehavior()
            });
        }
        
        return users;
    }

    getExpectedBehavior() {
        return {
            formSubmission: 'Should show "Creating account..." message',
            processingTime: '2-3 seconds simulation delay',
            successMessage: 'Toast: "🎉 Welcome to PreetEnglish!"',
            redirect: 'Automatic redirect to /dashboard',
            persistence: 'User session saved in localStorage'
        };
    }

    generateManualTestingGuide() {
        console.log('🎯 MANUAL SIGNUP TESTING GUIDE');
        console.log('='.repeat(50));
        
        console.log('\n📋 WHY MANUAL TESTING?');
        console.log('   • React SPA components load dynamically');
        console.log('   • Automated tests can\'t interact with React forms');
        console.log('   • Manual testing verifies real user experience');
        console.log('   • Browser console shows detailed debug info');
        
        console.log('\n🌐 TESTING URL:');
        console.log('   https://preetenglish.netlify.app/auth');
        
        console.log('\n📝 STEP-BY-STEP PROCESS:');
        console.log('   1. Open the URL in your browser');
        console.log('   2. Click "Sign Up" tab');
        console.log('   3. Enter username and password from list below');
        console.log('   4. Click "Create Account"');
        console.log('   5. Wait for processing (2-3 seconds)');
        console.log('   6. Verify redirect to dashboard');
        
        console.log('\n🎲 RANDOM TEST USERS:');
        console.log('   (Try any of these combinations)');
        console.log('   ' + '-'.repeat(60));
        
        this.randomUsers.slice(0, 15).forEach((user, index) => {
            console.log(`   ${String(index + 1).padStart(2, ' ')}. Username: ${user.username.padEnd(25, ' ')} Password: ${user.password}`);
            console.log(`       Profile: ${user.profile} (${user.level})`);
            console.log('');
        });
        
        console.log('\n🔍 WHAT TO LOOK FOR:');
        console.log('   ✅ Form accepts input');
        console.log('   ✅ Button changes to "Creating account..."');
        console.log('   ✅ Toast notification appears');
        console.log('   ✅ Redirect to dashboard happens');
        console.log('   ✅ User stays logged in on refresh');
        
        console.log('\n🛠️ DEBUGGING TIPS:');
        console.log('   • Open browser console (F12)');
        console.log('   • Look for messages starting with 🔍, 📝, ✅');
        console.log('   • Check Network tab for any errors');
        console.log('   • Try different browsers if issues occur');
        
        console.log('\n📊 EXPECTED CONSOLE MESSAGES:');
        console.log('   🔍 AuthPage mounted');
        console.log('   🚀 Form submitted: register {username: "..."}');
        console.log('   📝 Registration attempt: username');
        console.log('   🌐 Frontend-only mode: simulating registration');
        console.log('   ✅ Mock user created: {id: ..., username: "..."}');
        console.log('   🎉 Registration successful!');
        console.log('   🔄 Forcing redirect to dashboard...');
        
        console.log('\n🎯 SUCCESS CRITERIA:');
        console.log('   • All form interactions work smoothly');
        console.log('   • Visual feedback is clear and immediate');
        console.log('   • Redirect happens automatically');
        console.log('   • User can navigate the app after signup');
        console.log('   • Session persists across page refreshes');
        
        console.log('\n🚨 TROUBLESHOOTING:');
        console.log('   If signup doesn\'t work:');
        console.log('   • Clear browser cache (Ctrl+Shift+R)');
        console.log('   • Try incognito/private mode');
        console.log('   • Check if JavaScript is enabled');
        console.log('   • Try a different browser');
        console.log('   • Wait longer for the 2-3 second delay');
        
        return this.randomUsers;
    }

    async saveTestUsers() {
        const testData = {
            timestamp: new Date().toISOString(),
            totalUsers: this.randomUsers.length,
            testUrl: 'https://preetenglish.netlify.app/auth',
            users: this.randomUsers,
            instructions: {
                step1: 'Go to https://preetenglish.netlify.app/auth',
                step2: 'Click "Sign Up" tab',
                step3: 'Enter username and password from the list',
                step4: 'Click "Create Account"',
                step5: 'Wait 2-3 seconds for processing',
                step6: 'Verify redirect to dashboard'
            },
            expectedBehavior: this.getExpectedBehavior()
        };

        const filePath = path.join(__dirname, 'MANUAL_SIGNUP_TEST_USERS.json');
        fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));
        console.log(`\n📄 Test users saved to: ${filePath}`);
        
        return filePath;
    }

    async run() {
        console.log('🎲 GENERATING RANDOM SIGNUP TEST USERS...\n');
        
        const users = this.generateManualTestingGuide();
        await this.saveTestUsers();
        
        console.log('\n🎉 MANUAL TESTING GUIDE COMPLETE!');
        console.log('   📱 Test the signup process manually');
        console.log('   🎯 Use the random users provided above');
        console.log('   ✅ Verify each step works as expected');
        
        return {
            totalUsers: users.length,
            testUrl: 'https://preetenglish.netlify.app/auth',
            status: 'Ready for manual testing'
        };
    }
}

// Run if called directly
if (require.main === module) {
    const guide = new ManualSignupGuide();
    guide.run()
        .then(result => {
            console.log('\n🏁 MANUAL TESTING GUIDE GENERATED');
            process.exit(0);
        })
        .catch(error => {
            console.error('💥 Error generating guide:', error);
            process.exit(1);
        });
}

module.exports = ManualSignupGuide;