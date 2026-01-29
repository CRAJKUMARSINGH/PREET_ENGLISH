// Chaos Control Script - Enable/Disable Manual Delay Injection
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

class ChaosController {
  async enableChaos() {
    try {
      const response = await fetch(`${BASE_URL}/api/test/chaos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: true })
      });
      
      if (response.ok) {
        console.log('✅ Chaos mode ENABLED - 5-second delays active');
        return true;
      } else {
        console.log('❌ Failed to enable chaos mode');
        return false;
      }
    } catch (error) {
      console.log('⚠️ Error enabling chaos mode:', error.message);
      return false;
    }
  }

  async disableChaos() {
    try {
      const response = await fetch(`${BASE_URL}/api/test/chaos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: false })
      });
      
      if (response.ok) {
        console.log('✅ Chaos mode DISABLED - normal operation restored');
        return true;
      } else {
        console.log('❌ Failed to disable chaos mode');
        return false;
      }
    } catch (error) {
      console.log('⚠️ Error disabling chaos mode:', error.message);
      return false;
    }
  }

  async testChaosInjection() {
    console.log('🧪 Testing chaos injection with controlled failure...');
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'k6_user_0',
          password: 'TestPass123!'
        }),
        timeout: 10000
      });
      
      const duration = Date.now() - startTime;
      
      console.log(`📊 Test Result:`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Duration: ${duration}ms`);
      console.log(`   Expected: 5000ms+ delay or timeout`);
      
      if (duration > 4000) {
        console.log('✅ Chaos injection working - delay detected');
        return true;
      } else {
        console.log('❌ Chaos injection not working - no delay detected');
        return false;
      }
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`📊 Test Result (Error):`);
      console.log(`   Error: ${error.message}`);
      console.log(`   Duration: ${duration}ms`);
      
      if (duration > 4000 || error.message.includes('timeout')) {
        console.log('✅ Chaos injection working - timeout/delay detected');
        return true;
      } else {
        console.log('❌ Chaos injection not working');
        return false;
      }
    }
  }
}

// CLI Interface
async function main() {
  const controller = new ChaosController();
  const command = process.argv[2];

  switch (command) {
    case 'enable':
      await controller.enableChaos();
      break;
      
    case 'disable':
      await controller.disableChaos();
      break;
      
    case 'test':
      await controller.testChaosInjection();
      break;
      
    default:
      console.log(`
🎯 Chaos Control Script

Usage: node chaos-control.js <command>

Commands:
  enable   - Enable 5-second delay injection
  disable  - Disable chaos mode
  test     - Test chaos injection with single request

Examples:
  node chaos-control.js enable
  node chaos-control.js test
  node chaos-control.js disable
      `);
  }
}

main().catch(console.error);