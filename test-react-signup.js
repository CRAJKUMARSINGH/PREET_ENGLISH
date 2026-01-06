// Test React frontend signup flow to identify the real issue
console.log('🧪 Testing React Frontend Signup Flow...');

// Simulate the React Query mutation flow
const testReactSignupFlow = async () => {
    console.log('🚀 Starting React signup simulation...');
    
    const credentials = {
        username: 'reacttest' + Date.now(),
        password: 'password123'
    };
    
    console.log('📝 Test credentials:', credentials);
    
    try {
        // Step 1: Check hostname detection (this is where the issue might be)
        const hostname = 'localhost'; // Simulating localhost
        console.log('🌐 Current hostname:', hostname);
        
        // Step 2: Check the condition that determines mock vs real API
        const shouldUseMockAuth = hostname.includes('netlify.app');
        console.log('🔍 Should use mock auth:', shouldUseMockAuth);
        console.log('🔍 Should use real API:', !shouldUseMockAuth);
        
        if (shouldUseMockAuth) {
            console.log('🌐 Using mock authentication (WRONG for localhost!)');
            
            // Mock authentication flow
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const mockUser = {
                id: Date.now(),
                username: credentials.username,
                isAdmin: false
            };
            
            console.log('✅ Mock user created:', mockUser);
            return mockUser;
            
        } else {
            console.log('🌐 Using real backend API (CORRECT for localhost)');
            
            // Real API call
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            console.log('📡 API Response status:', response.status);
            
            if (response.ok) {
                const user = await response.json();
                console.log('✅ Real API signup successful:', user);
                return user;
            } else {
                const error = await response.text();
                console.error('❌ Real API signup failed:', error);
                throw new Error(`HTTP ${response.status}: ${error}`);
            }
        }
        
    } catch (error) {
        console.error('❌ React signup flow failed:', error);
        throw error;
    }
};

// Test the current authentication logic
const testCurrentAuthLogic = () => {
    console.log('\n🔍 Testing current authentication logic...');
    
    // Simulate different hostnames
    const testCases = [
        'localhost',
        '127.0.0.1',
        'preetenglish.netlify.app',
        'localhost:5000',
        'localhost:3000'
    ];
    
    testCases.forEach(hostname => {
        const shouldUseMock = hostname.includes('netlify.app');
        console.log(`🌐 Hostname: ${hostname} → Mock: ${shouldUseMock}, Real API: ${!shouldUseMock}`);
    });
};

// Test React component form submission simulation
const testFormSubmission = () => {
    console.log('\n📝 Testing form submission logic...');
    
    const formData = {
        username: 'testuser123',
        password: 'password123'
    };
    
    // Simulate form validation
    const isValid = formData.username.length >= 2 && formData.password.length >= 6;
    console.log('✅ Form validation passed:', isValid);
    
    if (!isValid) {
        console.error('❌ Form validation failed');
        return false;
    }
    
    // Simulate mutation call
    console.log('📞 Calling registerMutation.mutate...');
    console.log('📦 Mutation payload:', formData);
    
    return true;
};

// Run all tests
const runAllTests = async () => {
    try {
        console.log('🎯 COMPREHENSIVE REACT SIGNUP TEST\n');
        
        // Test 1: Current auth logic
        testCurrentAuthLogic();
        
        // Test 2: Form submission
        const formOk = testFormSubmission();
        if (!formOk) {
            console.error('❌ Form submission test failed');
            return;
        }
        
        // Test 3: React signup flow
        await testReactSignupFlow();
        
        console.log('\n🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('\n❌ Test suite failed:', error);
        
        // Analyze the failure
        console.log('\n🔍 FAILURE ANALYSIS:');
        if (error.message.includes('fetch')) {
            console.log('- Issue: Network/API call problem');
            console.log('- Check: Is development server running?');
            console.log('- Check: Are there CORS issues?');
        } else if (error.message.includes('timeout')) {
            console.log('- Issue: Request timeout');
            console.log('- Check: Server response time');
        } else {
            console.log('- Issue: Unknown error');
            console.log('- Error:', error.message);
        }
    }
};

// Check if we're in Node.js environment and run tests
if (typeof window === 'undefined') {
    // Node.js environment - use node-fetch
    const fetch = (await import('node-fetch')).default;
    global.fetch = fetch;
    runAllTests();
} else {
    // Browser environment
    runAllTests();
}