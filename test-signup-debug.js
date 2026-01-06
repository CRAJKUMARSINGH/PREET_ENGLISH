// Debug script to test signup functionality
console.log('🧪 Testing signup functionality...');

// Simulate the signup flow
const testSignup = async () => {
    console.log('📝 Starting signup test...');
    
    const credentials = {
        username: 'testuser123',
        password: 'password123'
    };
    
    console.log('🔍 Test credentials:', credentials);
    
    // Simulate the mock authentication logic
    try {
        console.log('🌐 Simulating frontend-only mode');
        
        // Simulate network delay
        console.log('⏳ Simulating network delay...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockUser = {
            id: Date.now(),
            username: credentials.username,
            isAdmin: false
        };
        
        console.log('✅ Mock user created:', mockUser);
        
        // Simulate localStorage storage
        console.log('💾 Storing user in localStorage...');
        const userString = JSON.stringify(mockUser);
        console.log('📦 User data to store:', userString);
        
        console.log('🎉 Signup test completed successfully!');
        return mockUser;
        
    } catch (error) {
        console.error('❌ Signup test failed:', error);
        throw error;
    }
};

// Run the test
testSignup()
    .then(user => {
        console.log('✅ Test passed! User created:', user);
    })
    .catch(error => {
        console.error('❌ Test failed:', error);
    });