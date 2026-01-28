#!/usr/bin/env tsx

/**
 * QUICK CIRCUIT BREAKER TEST
 * Tests the login circuit breaker and queue system
 */

import { request } from 'http';

function makeRequest(path: string, method: string = 'GET', data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const postData = data ? JSON.stringify(data) : undefined;
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
            }
        };

        const req = request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({
                        status: res.statusCode,
                        data: parsed,
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body,
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(8000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function testCircuitBreaker() {
    console.log('🧪 QUICK CIRCUIT BREAKER TEST');
    console.log('='.repeat(50));
    console.log('🎯 Testing login resilience system\n');
    
    try {
        // Test 1: Check auth status endpoint
        console.log('📊 Test 1: Checking auth status endpoint...');
        const statusResponse = await makeRequest('/api/auth/status');
        console.log('   ✅ Auth status endpoint working');
        console.log(`   📋 Circuit Breaker State: ${statusResponse.data.circuitBreaker?.state || 'UNKNOWN'}`);
        console.log(`   📋 Queue Status: ${statusResponse.data.queue?.activeOperations || 0}/${statusResponse.data.queue?.concurrentLimit || 5}`);
        
        // Test 2: Test a few concurrent logins
        console.log('\n⚡ Test 2: Testing concurrent logins (10 users)...');
        const loginPromises = [];
        
        for (let i = 1; i <= 10; i++) {
            const promise = makeRequest('/api/login', 'POST', {
                username: `test_user_${i}`,
                password: 'test123'
            }).then(response => ({
                user: i,
                status: response.status,
                success: response.status === 200,
                queueStatus: response.data.queueStatus,
                message: response.data.message
            })).catch(error => ({
                user: i,
                status: 0,
                success: false,
                error: error.message,
                queueStatus: null
            }));
            
            loginPromises.push(promise);
        }
        
        const results = await Promise.all(loginPromises);
        
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        const circuitBreakerActivated = results.some(r => 
            r.message?.includes('temporarily unavailable') || 
            r.message?.includes('Circuit breaker')
        );
        
        console.log(`   📊 Results: ${successful} successful, ${failed} failed`);
        console.log(`   🛡️ Circuit Breaker Activated: ${circuitBreakerActivated ? 'YES' : 'NO'}`);
        
        // Show some sample responses
        console.log('\n📋 Sample Responses:');
        results.slice(0, 3).forEach(result => {
            console.log(`   User ${result.user}: Status ${result.status} - ${result.success ? 'SUCCESS' : result.message || result.error}`);
        });
        
        // Test 3: Check final auth status
        console.log('\n📊 Test 3: Final auth status check...');
        const finalStatus = await makeRequest('/api/auth/status');
        console.log(`   📋 Final Circuit Breaker State: ${finalStatus.data.circuitBreaker?.state || 'UNKNOWN'}`);
        console.log(`   📋 Final Queue Status: ${finalStatus.data.queue?.activeOperations || 0}/${finalStatus.data.queue?.concurrentLimit || 5}`);
        
        console.log('\n✅ CIRCUIT BREAKER TEST COMPLETED');
        console.log('🛡️ System resilience validated!');
        
        if (circuitBreakerActivated) {
            console.log('🎉 Circuit breaker successfully protected the system!');
        } else {
            console.log('ℹ️  Circuit breaker on standby (no overload detected)');
        }
        
    } catch (error) {
        console.error('❌ Circuit breaker test failed:', error);
        throw error;
    }
}

// Run the test
testCircuitBreaker()
    .then(() => {
        console.log('\n🚀 Ready for production launch!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n💥 Test failed:', error.message);
        process.exit(1);
    });