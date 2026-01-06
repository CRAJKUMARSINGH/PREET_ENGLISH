// Test signup functionality in browser environment
console.log('🧪 Testing signup in browser environment...');

// Test the signup API endpoint
const testSignupAPI = async () => {
    try {
        console.log('📝 Testing signup API...');
        
        const credentials = {
            username: 'testuser' + Date.now(),
            password: 'password123'
        };
        
        console.log('🔍 Test credentials:', credentials);
        
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const user = await response.json();
            console.log('✅ Signup API successful:', user);
            return user;
        } else {
            const error = await response.text();
            console.error('❌ Signup API failed:', error);
            throw new Error(`HTTP ${response.status}: ${error}`);
        }
        
    } catch (error) {
        console.error('❌ Signup API test failed:', error);
        throw error;
    }
};

// Test the login API endpoint
const testLoginAPI = async (credentials) => {
    try {
        console.log('🔐 Testing login API...');
        
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        console.log('📡 Login response status:', response.status);
        
        if (response.ok) {
            const user = await response.json();
            console.log('✅ Login API successful:', user);
            return user;
        } else {
            const error = await response.text();
            console.error('❌ Login API failed:', error);
            throw new Error(`HTTP ${response.status}: ${error}`);
        }
        
    } catch (error) {
        console.error('❌ Login API test failed:', error);
        throw error;
    }
};

// Run the tests
const runTests = async () => {
    try {
        console.log('🚀 Starting API tests...');
        
        // Test signup
        const user = await testSignupAPI();
        
        // Test login with the same credentials
        await testLoginAPI({
            username: user.username,
            password: 'password123'
        });
        
        console.log('🎉 All API tests passed!');
        
    } catch (error) {
        console.error('❌ API tests failed:', error);
    }
};

// Check if we're in Node.js environment
if (typeof window === 'undefined') {
    // Node.js environment - use node-fetch
    const fetch = (await import('node-fetch')).default;
    global.fetch = fetch;
    runTests();
} else {
    // Browser environment
    runTests();
}