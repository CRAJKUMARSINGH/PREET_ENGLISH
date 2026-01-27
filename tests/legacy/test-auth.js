// Test authentication locally
import fetch from 'node-fetch';

async function testAuth() {
    try {
        console.log('🔍 Testing local server...');
        
        // Test lessons endpoint
        const lessonsResponse = await fetch('http://localhost:5000/api/lessons');
        console.log('📚 Lessons API:', lessonsResponse.status, lessonsResponse.statusText);
        
        if (lessonsResponse.ok) {
            const lessons = await lessonsResponse.json();
            console.log('✅ Lessons count:', lessons.length);
        }
        
        // Test login endpoint
        const loginResponse = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'student',
                password: 'password123'
            })
        });
        
        console.log('🔐 Login API:', loginResponse.status, loginResponse.statusText);
        
        if (loginResponse.ok) {
            const user = await loginResponse.json();
            console.log('✅ Login successful:', user.username);
        } else {
            const error = await loginResponse.text();
            console.log('❌ Login failed:', error);
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testAuth();