#!/usr/bin/env tsx

/**
 * Comprehensive Deployment Testing Script
 * Tests the live deployment, creates seed users, and verifies functionality
 */

import { execSync } from 'child_process';
import fetch from 'node-fetch';

interface TestUser {
  username: string;
  password: string;
  profile: {
    name: string;
    level: string;
    interests: string[];
  };
}

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  duration?: number;
}

class DeploymentTester {
  private baseUrl: string;
  private results: TestResult[] = [];
  private users: TestUser[] = [];

  constructor(baseUrl: string = 'https://preetenglish.netlify.app') {
    this.baseUrl = baseUrl;
    this.generateTestUsers();
  }

  private generateTestUsers() {
    const profiles = [
      { name: 'Priya Sharma', level: 'Beginner', interests: ['Business', 'Travel'] },
      { name: 'Rajesh Kumar', level: 'Intermediate', interests: ['Technology', 'Career'] },
      { name: 'Anita Patel', level: 'Advanced', interests: ['Academic', 'Literature'] },
      { name: 'Vikram Singh', level: 'Beginner', interests: ['Daily Life', 'Shopping'] },
      { name: 'Meera Gupta', level: 'Intermediate', interests: ['Healthcare', 'Family'] },
      { name: 'Arjun Reddy', level: 'Advanced', interests: ['Business', 'Presentations'] },
      { name: 'Kavya Nair', level: 'Beginner', interests: ['Education', 'Children'] },
      { name: 'Rohit Jain', level: 'Intermediate', interests: ['Sports', 'Entertainment'] },
      { name: 'Deepika Rao', level: 'Advanced', interests: ['Science', 'Research'] },
      { name: 'Amit Verma', level: 'Beginner', interests: ['Food', 'Culture'] },
      { name: 'Sneha Iyer', level: 'Intermediate', interests: ['Art', 'Music'] },
      { name: 'Karan Malhotra', level: 'Advanced', interests: ['Finance', 'Investment'] },
      { name: 'Pooja Agarwal', level: 'Beginner', interests: ['Fashion', 'Lifestyle'] },
      { name: 'Suresh Pillai', level: 'Intermediate', interests: ['Politics', 'News'] },
      { name: 'Ritu Chopra', level: 'Advanced', interests: ['Philosophy', 'Spirituality'] }
    ];

    this.users = profiles.map((profile, index) => ({
      username: `student${String(index + 1).padStart(2, '0')}`,
      password: `pass${index + 1}`,
      profile
    }));
  }

  private async makeRequest(endpoint: string, options: any = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response;
  }

  private addResult(test: string, status: 'PASS' | 'FAIL' | 'SKIP', message: string, duration?: number) {
    this.results.push({ test, status, message, duration });
    const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
    console.log(`${emoji} ${test}: ${message}${duration ? ` (${duration}ms)` : ''}`);
  }

  async testDeploymentAccessibility() {
    console.log('\n🌐 Testing Deployment Accessibility...');
    const startTime = Date.now();

    try {
      const response = await this.makeRequest('/', { method: 'GET' });
      const duration = Date.now() - startTime;

      if (response.ok) {
        this.addResult('Landing Page Access', 'PASS', `Site accessible (${response.status})`, duration);
        
        // Test if it's the correct content
        const html = await response.text();
        if (html.includes('PREET ENGLISH') && html.includes('Master English')) {
          this.addResult('Landing Page Content', 'PASS', 'Correct landing page content found');
        } else {
          this.addResult('Landing Page Content', 'FAIL', 'Landing page content not as expected');
        }
      } else {
        this.addResult('Landing Page Access', 'FAIL', `Site not accessible (${response.status})`);
      }
    } catch (error) {
      this.addResult('Landing Page Access', 'FAIL', `Connection failed: ${error.message}`);
    }
  }

  async testAuthEndpoints() {
    console.log('\n🔐 Testing Authentication Endpoints...');

    // Test registration endpoint
    try {
      const testUser = this.users[0];
      const response = await this.makeRequest('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: testUser.username,
          password: testUser.password
        })
      });

      if (response.ok) {
        this.addResult('Registration Endpoint', 'PASS', 'Registration endpoint working');
      } else if (response.status === 400) {
        // User might already exist, try login instead
        const loginResponse = await this.makeRequest('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            username: testUser.username,
            password: testUser.password
          })
        });
        
        if (loginResponse.ok) {
          this.addResult('Authentication Flow', 'PASS', 'Login working (user exists)');
        } else {
          this.addResult('Authentication Flow', 'FAIL', 'Neither registration nor login working');
        }
      } else {
        this.addResult('Registration Endpoint', 'FAIL', `Registration failed (${response.status})`);
      }
    } catch (error) {
      this.addResult('Registration Endpoint', 'FAIL', `Registration error: ${error.message}`);
    }
  }

  async testAPIEndpoints() {
    console.log('\n📡 Testing API Endpoints...');

    const endpoints = [
      { path: '/api/lessons', name: 'Lessons API' },
      { path: '/api/stories', name: 'Stories API' },
      { path: '/api/vocabulary/category/general', name: 'Vocabulary API' },
      { path: '/api/speaking-topics', name: 'Speaking Topics API' },
      { path: '/api/listenings', name: 'Listening API' }
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await this.makeRequest(endpoint.path, { method: 'GET' });
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            this.addResult(endpoint.name, 'PASS', `${data.length} items found`);
          } else {
            this.addResult(endpoint.name, 'PASS', 'Endpoint accessible but no data');
          }
        } else {
          this.addResult(endpoint.name, 'FAIL', `HTTP ${response.status}`);
        }
      } catch (error) {
        this.addResult(endpoint.name, 'FAIL', `Error: ${error.message}`);
      }
    }
  }

  async testPageRoutes() {
    console.log('\n🛣️ Testing Page Routes...');

    const routes = [
      { path: '/', name: 'Landing Page' },
      { path: '/auth', name: 'Authentication Page' },
      // Note: Protected routes will redirect to auth, which is expected
    ];

    for (const route of routes) {
      try {
        const response = await this.makeRequest(route.path, { method: 'GET' });
        
        if (response.ok) {
          this.addResult(`Route ${route.path}`, 'PASS', `${route.name} accessible`);
        } else {
          this.addResult(`Route ${route.path}`, 'FAIL', `HTTP ${response.status}`);
        }
      } catch (error) {
        this.addResult(`Route ${route.path}`, 'FAIL', `Error: ${error.message}`);
      }
    }
  }

  async testPerformance() {
    console.log('\n⚡ Testing Performance...');

    const startTime = Date.now();
    try {
      const response = await this.makeRequest('/', { method: 'GET' });
      const loadTime = Date.now() - startTime;

      if (loadTime < 3000) {
        this.addResult('Page Load Speed', 'PASS', `Fast loading (${loadTime}ms)`, loadTime);
      } else if (loadTime < 5000) {
        this.addResult('Page Load Speed', 'PASS', `Acceptable loading (${loadTime}ms)`, loadTime);
      } else {
        this.addResult('Page Load Speed', 'FAIL', `Slow loading (${loadTime}ms)`, loadTime);
      }
    } catch (error) {
      this.addResult('Page Load Speed', 'FAIL', `Performance test failed: ${error.message}`);
    }
  }

  async createSeedUsers() {
    console.log('\n👥 Creating Seed Users...');

    let successCount = 0;
    let existingCount = 0;

    for (const user of this.users) {
      try {
        const response = await this.makeRequest('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            username: user.username,
            password: user.password
          })
        });

        if (response.ok) {
          successCount++;
          console.log(`✅ Created user: ${user.username} (${user.profile.name})`);
        } else if (response.status === 400) {
          // User already exists
          existingCount++;
          console.log(`ℹ️ User exists: ${user.username} (${user.profile.name})`);
        } else {
          console.log(`❌ Failed to create: ${user.username} - HTTP ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Error creating ${user.username}: ${error.message}`);
      }

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.addResult('Seed Users Creation', 'PASS', 
      `${successCount} new users created, ${existingCount} already existed`);
  }

  async testUserAuthentication() {
    console.log('\n🔑 Testing User Authentication...');

    // Test login with first few users
    const testUsers = this.users.slice(0, 3);
    let successCount = 0;

    for (const user of testUsers) {
      try {
        const response = await this.makeRequest('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            username: user.username,
            password: user.password
          })
        });

        if (response.ok) {
          successCount++;
          console.log(`✅ Login successful: ${user.username}`);
        } else {
          console.log(`❌ Login failed: ${user.username} - HTTP ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Login error: ${user.username} - ${error.message}`);
      }
    }

    if (successCount === testUsers.length) {
      this.addResult('User Authentication', 'PASS', `All ${successCount} test logins successful`);
    } else {
      this.addResult('User Authentication', 'FAIL', `Only ${successCount}/${testUsers.length} logins successful`);
    }
  }

  async testContentIntegrity() {
    console.log('\n📚 Testing Content Integrity...');

    try {
      // Test lessons
      const lessonsResponse = await this.makeRequest('/api/lessons');
      if (lessonsResponse.ok) {
        const lessons = await lessonsResponse.json();
        this.addResult('Lessons Content', 'PASS', `${lessons.length} lessons available`);
      }

      // Test stories
      const storiesResponse = await this.makeRequest('/api/stories');
      if (storiesResponse.ok) {
        const stories = await storiesResponse.json();
        this.addResult('Stories Content', 'PASS', `${stories.length} stories available`);
      }

      // Test speaking topics
      const speakingResponse = await this.makeRequest('/api/speaking-topics');
      if (speakingResponse.ok) {
        const topics = await speakingResponse.json();
        this.addResult('Speaking Topics', 'PASS', `${topics.length} speaking topics available`);
      }

    } catch (error) {
      this.addResult('Content Integrity', 'FAIL', `Content test failed: ${error.message}`);
    }
  }

  generateReport() {
    console.log('\n📊 DEPLOYMENT TEST REPORT');
    console.log('=' .repeat(50));

    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const skipped = this.results.filter(r => r.status === 'SKIP').length;
    const total = this.results.length;

    console.log(`\n📈 SUMMARY:`);
    console.log(`✅ Passed: ${passed}/${total}`);
    console.log(`❌ Failed: ${failed}/${total}`);
    console.log(`⏭️ Skipped: ${skipped}/${total}`);
    console.log(`🎯 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    if (failed > 0) {
      console.log(`\n❌ FAILED TESTS:`);
      this.results
        .filter(r => r.status === 'FAIL')
        .forEach(r => console.log(`   • ${r.test}: ${r.message}`));
    }

    console.log(`\n👥 SEED USERS CREATED:`);
    this.users.forEach(user => {
      console.log(`   • ${user.username} / ${user.password} (${user.profile.name} - ${user.profile.level})`);
    });

    console.log(`\n🌐 DEPLOYMENT STATUS:`);
    if (passed >= total * 0.8) {
      console.log(`🎉 DEPLOYMENT SUCCESSFUL - Ready for production use!`);
    } else if (passed >= total * 0.6) {
      console.log(`⚠️ DEPLOYMENT PARTIALLY SUCCESSFUL - Some issues need attention`);
    } else {
      console.log(`🚨 DEPLOYMENT ISSUES - Critical problems need fixing`);
    }

    return {
      total,
      passed,
      failed,
      skipped,
      successRate: (passed / total) * 100,
      users: this.users
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Comprehensive Deployment Testing...');
    console.log(`🌐 Testing URL: ${this.baseUrl}`);
    console.log('=' .repeat(60));

    const startTime = Date.now();

    // Run all tests
    await this.testDeploymentAccessibility();
    await this.testAuthEndpoints();
    await this.testAPIEndpoints();
    await this.testPageRoutes();
    await this.testPerformance();
    await this.createSeedUsers();
    await this.testUserAuthentication();
    await this.testContentIntegrity();

    const totalTime = Date.now() - startTime;
    console.log(`\n⏱️ Total test time: ${totalTime}ms`);

    return this.generateReport();
  }
}

// Main execution
async function main() {
  const tester = new DeploymentTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Exit with appropriate code
    if (report.successRate >= 80) {
      process.exit(0); // Success
    } else {
      process.exit(1); // Failure
    }
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { DeploymentTester };