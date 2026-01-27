import React from "react";

export default function AuthPageBasic() {
    const handleSignup = () => {
        console.log('🚀 SIGNUP BUTTON CLICKED!');
        
        // Get form values
        const username = (document.getElementById('username') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        
        console.log('📝 Username:', username);
        console.log('📝 Password:', password);
        
        // Basic validation
        if (!username || username.length < 2) {
            alert('Username must be at least 2 characters');
            return;
        }
        
        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        // Show loading
        const button = document.getElementById('signup-btn') as HTMLButtonElement;
        if (button) {
            button.textContent = '⏳ Creating account...';
            button.disabled = true;
        }
        
        // Simulate account creation
        setTimeout(() => {
            // Store user data
            const user = {
                id: Date.now(),
                username: username,
                isAdmin: false
            };
            
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            localStorage.setItem('preet-english-auth', 'true');
            
            console.log('✅ User created:', user);
            
            // Show success
            alert('🎉 Account created successfully! Redirecting to dashboard...');
            
            // Redirect
            window.location.href = '/dashboard';
        }, 2000);
    };

    const handleLogin = () => {
        console.log('🔐 LOGIN BUTTON CLICKED!');
        
        const username = (document.getElementById('username') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        const button = document.getElementById('login-btn') as HTMLButtonElement;
        if (button) {
            button.textContent = '⏳ Signing in...';
            button.disabled = true;
        }
        
        setTimeout(() => {
            const user = {
                id: Date.now(),
                username: username,
                isAdmin: false
            };
            
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            localStorage.setItem('preet-english-auth', 'true');
            
            alert('✅ Login successful! Redirecting...');
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '10px'
                }}>
                    PREET ENGLISH
                </h1>
                
                <p style={{
                    color: '#666',
                    marginBottom: '30px'
                }}>
                    Learn English with Hindi Support
                </p>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        textAlign: 'left',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter username (min 2 chars)"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '30px' }}>
                    <label style={{
                        display: 'block',
                        textAlign: 'left',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password (min 6 chars)"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        id="login-btn"
                        onClick={handleLogin}
                        style={{
                            flex: 1,
                            padding: '15px',
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                            (e.target as HTMLButtonElement).style.background = '#45a049';
                        }}
                        onMouseOut={(e) => {
                            (e.target as HTMLButtonElement).style.background = '#4CAF50';
                        }}
                    >
                        🔐 Login
                    </button>
                    
                    <button
                        id="signup-btn"
                        onClick={handleSignup}
                        style={{
                            flex: 1,
                            padding: '15px',
                            background: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                            (e.target as HTMLButtonElement).style.background = '#1976D2';
                        }}
                        onMouseOut={(e) => {
                            (e.target as HTMLButtonElement).style.background = '#2196F3';
                        }}
                    >
                        🚀 Create Account
                    </button>
                </div>
                
                <div style={{
                    background: '#f0f8ff',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #cce7ff'
                }}>
                    <p style={{
                        margin: '0 0 10px 0',
                        fontWeight: 'bold',
                        color: '#0066cc'
                    }}>
                        🧪 Quick Test:
                    </p>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#0066cc'
                    }}>
                        Username: <code>testuser</code><br />
                        Password: <code>password123</code>
                    </p>
                </div>
                
                <p style={{
                    marginTop: '20px',
                    fontSize: '12px',
                    color: '#999'
                }}>
                    © 2024 PreetEnglish. Mrs. Premlata Jain Initiative.
                </p>
            </div>
        </div>
    );
}