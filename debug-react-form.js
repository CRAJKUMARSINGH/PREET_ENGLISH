// Debug React form submission to identify the real issue
console.log('🧪 Debugging React Form Submission...');

// Simulate the exact React form submission flow
const debugFormSubmission = () => {
    console.log('📝 Testing form submission flow...');
    
    // Step 1: Form validation (Zod schema)
    const formData = {
        username: 'testuser123',
        password: 'password123'
    };
    
    console.log('📦 Form data:', formData);
    
    // Step 2: Validate form data (same as in AuthPage)
    if (!formData.username || !formData.password) {
        console.error('❌ Missing username or password');
        return false;
    }
    
    if (formData.username.length < 2) {
        console.error('❌ Username too short');
        return false;
    }
    
    if (formData.password.length < 6) {
        console.error('❌ Password too short');
        return false;
    }
    
    console.log('✅ Form validation passed');
    
    // Step 3: Simulate mutation object
    const mockMutation = {
        isPending: false,
        mutate: (values) => {
            console.log('🔄 Mutation.mutate called with:', values);
            
            // Simulate the actual mutation function
            return simulateRegisterMutation(values);
        },
        error: null
    };
    
    console.log('🔍 Mutation object exists:', !!mockMutation);
    console.log('🔍 Mutation mutate function:', typeof mockMutation?.mutate);
    console.log('🔍 Mutation isPending:', mockMutation?.isPending);
    
    // Step 4: Check if mutation is pending (prevent multiple submissions)
    if (mockMutation.isPending) {
        console.log('⚠️ Already processing, ignoring duplicate submission');
        return false;
    }
    
    // Step 5: Call mutation
    try {
        console.log('📝 Calling mutation.mutate with values:', formData);
        mockMutation.mutate(formData);
        console.log('✅ Mutation.mutate called successfully');
        return true;
    } catch (error) {
        console.error('❌ Error calling mutation:', error);
        return false;
    }
};

// Simulate the register mutation function
const simulateRegisterMutation = async (credentials) => {
    console.log('🔄 Register mutation started:', credentials.username);
    console.log('🌐 Current hostname:', 'localhost'); // Simulating localhost
    
    try {
        // Check hostname (same logic as in use-auth.tsx)
        const hostname = 'localhost';
        const shouldUseMock = hostname.includes('netlify.app');
        
        console.log('🔍 Should use mock auth:', shouldUseMock);
        
        if (shouldUseMock) {
            console.log('🌐 Frontend-only mode: simulating registration');
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const mockUser = {
                id: Date.now(),
                username: credentials.username,
                isAdmin: false
            };
            
            console.log('✅ Mock registration successful:', mockUser);
            return mockUser;
            
        } else {
            console.log('🌐 Using real backend API');
            
            // Simulate API request (this is where the real issue might be)
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            console.log('📡 API response status:', response.status);
            
            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Real API registration successful:', userData);
                return userData;
            } else {
                const errorText = await response.text();
                console.error('❌ API registration failed:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Registration mutation failed:', error);
        throw error;
    }
};

// Test the complete flow
const testCompleteFlow = async () => {
    console.log('🎯 TESTING COMPLETE REACT FORM FLOW\n');
    
    try {
        // Step 1: Test form submission
        const formSubmissionOk = debugFormSubmission();
        
        if (!formSubmissionOk) {
            console.error('❌ Form submission failed');
            return;
        }
        
        console.log('✅ Form submission test passed');
        
        // Step 2: Test the actual mutation
        console.log('\n🔄 Testing actual mutation...');
        const result = await simulateRegisterMutation({
            username: 'debugtest' + Date.now(),
            password: 'password123'
        });
        
        console.log('✅ Mutation test passed:', result);
        
        console.log('\n🎉 ALL TESTS PASSED - React form should work!');
        
    } catch (error) {
        console.error('\n❌ COMPLETE FLOW TEST FAILED:', error);
        
        // Analyze the failure
        console.log('\n🔍 FAILURE ANALYSIS:');
        if (error.message.includes('fetch')) {
            console.log('- Issue: Network/API problem');
            console.log('- Solution: Check if dev server is running');
        } else if (error.message.includes('timeout')) {
            console.log('- Issue: Request timeout');
            console.log('- Solution: Check server response time');
        } else {
            console.log('- Issue: Unknown error in React form flow');
            console.log('- Error details:', error.message);
        }
    }
};

// Check environment and run test
if (typeof window === 'undefined') {
    // Node.js environment
    const fetch = (await import('node-fetch')).default;
    global.fetch = fetch;
    testCompleteFlow();
} else {
    // Browser environment
    testCompleteFlow();
}