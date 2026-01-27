#!/usr/bin/env node

/**
 * Security Testing Script for Preet English
 * Tests all security headers and configurations
 */

import https from 'https';
import http from 'http';

const APP_URL = 'https://preetenglish.netlify.app';
const EXPECTED_HEADERS = {
  'x-frame-options': 'SAMEORIGIN',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'content-security-policy': true, // Just check if present
  'permissions-policy': true,
  'strict-transport-security': true
};

const EXPECTED_META_TAGS = [
  'https://preetenglish.netlify.app/',
  'https://preetenglish.netlify.app/og-image.jpg'
];

console.log('🔒 SECURITY TESTING SCRIPT');
console.log('==========================');
console.log(`Testing: ${APP_URL}\n`);

async function testSecurityHeaders() {
  return new Promise((resolve, reject) => {
    const url = new URL(APP_URL);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Preet-English-Security-Test/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log('📊 SECURITY HEADERS TEST');
      console.log('========================');
      
      let score = 0;
      let maxScore = Object.keys(EXPECTED_HEADERS).length;
      
      for (const [header, expected] of Object.entries(EXPECTED_HEADERS)) {
        const value = res.headers[header];
        
        if (value) {
          if (typeof expected === 'boolean' || value.includes(expected) || value === expected) {
            console.log(`✅ ${header}: ${value}`);
            score++;
          } else {
            console.log(`⚠️  ${header}: ${value} (expected: ${expected})`);
          }
        } else {
          console.log(`❌ ${header}: MISSING`);
        }
      }
      
      console.log(`\n📊 Security Headers Score: ${score}/${maxScore} (${Math.round(score/maxScore*100)}%)`);
      
      // Test HTTPS redirect
      console.log('\n🔐 HTTPS REDIRECT TEST');
      console.log('======================');
      testHttpsRedirect().then(() => {
        resolve({ score, maxScore, percentage: Math.round(score/maxScore*100) });
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.end();
  });
}

async function testHttpsRedirect() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'preetenglish.netlify.app',
      port: 80,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        const location = res.headers.location;
        if (location && location.startsWith('https://')) {
          console.log('✅ HTTP to HTTPS redirect working');
        } else {
          console.log('⚠️  HTTP redirect not to HTTPS');
        }
      } else {
        console.log('❌ No HTTP to HTTPS redirect found');
      }
      resolve();
    });

    req.on('error', () => {
      console.log('✅ HTTP blocked (good - HTTPS only)');
      resolve();
    });

    req.setTimeout(5000, () => {
      console.log('⚠️  HTTP request timeout');
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function testMetaTags() {
  return new Promise((resolve, reject) => {
    const url = new URL(APP_URL);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('\n🏷️  META TAGS TEST');
        console.log('==================');
        
        let metaScore = 0;
        let metaMax = EXPECTED_META_TAGS.length;
        
        for (const expectedUrl of EXPECTED_META_TAGS) {
          if (data.includes(expectedUrl)) {
            console.log(`✅ Found: ${expectedUrl}`);
            metaScore++;
          } else {
            console.log(`❌ Missing: ${expectedUrl}`);
          }
        }
        
        // Check for placeholder URLs
        const placeholders = [
          'preet-english.yourdeploylink.com',
          'yourdeploylink.com',
          'placeholder'
        ];
        
        let placeholderFound = false;
        for (const placeholder of placeholders) {
          if (data.includes(placeholder)) {
            console.log(`❌ Placeholder found: ${placeholder}`);
            placeholderFound = true;
          }
        }
        
        if (!placeholderFound) {
          console.log('✅ No placeholder URLs found');
        }
        
        console.log(`\n📊 Meta Tags Score: ${metaScore}/${metaMax} (${Math.round(metaScore/metaMax*100)}%)`);
        
        resolve({ metaScore, metaMax, placeholderFound });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testServiceWorker() {
  return new Promise((resolve, reject) => {
    const url = new URL(APP_URL + '/sw.js');
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: '/sw.js',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      console.log('\n⚙️  SERVICE WORKER TEST');
      console.log('======================');
      
      if (res.statusCode === 200) {
        console.log('✅ Service Worker accessible');
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          // Check for security improvements
          const securityFeatures = [
            'CACHE_VERSION',
            'fetchWithTimeout',
            'sw-cache-time',
            'MAX_CACHE_AGE'
          ];
          
          let swScore = 0;
          for (const feature of securityFeatures) {
            if (data.includes(feature)) {
              console.log(`✅ Security feature: ${feature}`);
              swScore++;
            } else {
              console.log(`❌ Missing: ${feature}`);
            }
          }
          
          console.log(`\n📊 Service Worker Security: ${swScore}/${securityFeatures.length} (${Math.round(swScore/securityFeatures.length*100)}%)`);
          resolve({ swScore, swMax: securityFeatures.length });
        });
      } else {
        console.log(`❌ Service Worker not accessible (${res.statusCode})`);
        resolve({ swScore: 0, swMax: 4 });
      }
    });

    req.on('error', (error) => {
      console.log('❌ Service Worker test failed:', error.message);
      resolve({ swScore: 0, swMax: 4 });
    });

    req.end();
  });
}

async function runAllTests() {
  try {
    console.log('🚀 Starting comprehensive security test...\n');
    
    const headerResults = await testSecurityHeaders();
    const metaResults = await testMetaTags();
    const swResults = await testServiceWorker();
    
    console.log('\n🏆 FINAL SECURITY SCORE');
    console.log('========================');
    
    const totalScore = headerResults.score + metaResults.metaScore + swResults.swScore;
    const totalMax = headerResults.maxScore + metaResults.metaMax + swResults.swMax;
    const finalPercentage = Math.round(totalScore / totalMax * 100);
    
    console.log(`Security Headers: ${headerResults.percentage}%`);
    console.log(`Meta Tags: ${Math.round(metaResults.metaScore/metaResults.metaMax*100)}%`);
    console.log(`Service Worker: ${Math.round(swResults.swScore/swResults.swMax*100)}%`);
    console.log(`\n🎯 OVERALL SECURITY SCORE: ${finalPercentage}%`);
    
    if (finalPercentage >= 90) {
      console.log('🏆 EXCELLENT - Enterprise-grade security!');
    } else if (finalPercentage >= 80) {
      console.log('✅ GOOD - Strong security posture');
    } else if (finalPercentage >= 70) {
      console.log('⚠️  FAIR - Some improvements needed');
    } else {
      console.log('❌ POOR - Critical security issues');
    }
    
    console.log('\n📋 RECOMMENDED ACTIONS:');
    if (headerResults.percentage < 100) {
      console.log('- Fix missing security headers in netlify.toml');
    }
    if (metaResults.placeholderFound) {
      console.log('- Remove placeholder URLs from HTML');
    }
    if (swResults.swScore < swResults.swMax) {
      console.log('- Enhance service worker security features');
    }
    
    console.log('\n🔗 VERIFICATION TOOLS:');
    console.log('- SecurityHeaders.com: https://securityheaders.com/?q=' + APP_URL);
    console.log('- Mozilla Observatory: https://observatory.mozilla.org/analyze/' + APP_URL.replace('https://', ''));
    console.log('- Google Lighthouse: Run audit in Chrome DevTools');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runAllTests();