/**
 * PREET_ENGLISH Server Connectivity Test
 * Quick test to verify server is running and responsive
 */

const SERVER_URL = 'http://localhost:5000';

async function testServerConnectivity() {
  console.log('🔍 Testing PREET_ENGLISH Server Connectivity...\n');
  
  try {
    console.log(`Connecting to: ${SERVER_URL}`);
    const response = await fetch(SERVER_URL);
    
    console.log(`✅ Server Status: ${response.status} ${response.statusText}`);
    console.log(`✅ Content Type: ${response.headers.get('content-type')}`);
    console.log(`✅ Server: ${response.headers.get('server') || 'Express'}`);
    
    if (response.ok) {
      const html = await response.text();
      const hasReact = html.includes('React') || html.includes('root');
      const hasVite = html.includes('vite') || html.includes('@vite');
      
      console.log(`✅ React App: ${hasReact ? 'Detected' : 'Not detected'}`);
      console.log(`✅ Vite Build: ${hasVite ? 'Detected' : 'Not detected'}`);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Server connectivity failed:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  console.log('\n🔍 Testing API Endpoints...');
  
  const endpoints = [
    '/api/lessons',
    '/api/auth/status', 
    '/api/progress',
    '/api/vocabulary'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${SERVER_URL}${endpoint}`);
      console.log(`${response.ok ? '✅' : '❌'} ${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.message}`);
    }
  }
}

async function testStaticAssets() {
  console.log('\n🔍 Testing Static Assets...');
  
  const assets = [
    '/favicon.png',
    '/manifest.json',
    '/robots.txt'
  ];
  
  for (const asset of assets) {
    try {
      const response = await fetch(`${SERVER_URL}${asset}`);
      console.log(`${response.ok ? '✅' : '❌'} ${asset}: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${asset}: ${error.message}`);
    }
  }
}

// Run all tests
async function runTests() {
  const startTime = Date.now();
  
  const serverOk = await testServerConnectivity();
  
  if (serverOk) {
    await testAPIEndpoints();
    await testStaticAssets();
    
    const endTime = Date.now();
    console.log(`\n🏆 Tests completed in ${endTime - startTime}ms`);
    console.log('✅ Server is running and responsive!');
    console.log('\n📝 Next: Open browser and navigate to http://localhost:5000 for full UI testing');
  } else {
    console.log('\n❌ Server tests failed. Please check if the development server is running.');
    process.exit(1);
  }
}

runTests().catch(console.error);