const http = require('http');

// Simple test suite
let tests = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  tests.push({ name, fn });
}

async function runTests() {
  console.log('Running tests...\n');
  
  for (const t of tests) {
    try {
      await t.fn();
      console.log(`✓ ${t.name}`);
      passed++;
    } catch (error) {
      console.error(`✗ ${t.name}`);
      console.error(`  ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\nTests: ${passed} passed, ${failed} failed, ${tests.length} total`);
  process.exit(failed > 0 ? 1 : 0);
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected} but got ${actual}`);
  }
}

function assertExists(value, message) {
  if (!value) {
    throw new Error(message || 'Expected value to exist');
  }
}

// Start the server for testing
const { app, server } = require('./server');

// Give server time to start
setTimeout(async () => {
  const port = server.address().port;
  
  // Test 1: Server is running
  test('Server starts successfully', () => {
    assertExists(server, 'Server should be running');
  });
  
  // Test 2: Health check endpoint
  test('Health check endpoint returns 200', () => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/health`, (res) => {
        assertEquals(res.statusCode, 200, 'Health check should return 200');
        resolve();
      }).on('error', reject);
    });
  });
  
  // Test 3: API info endpoint
  test('API info endpoint returns environment data', () => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/api/info`, (res) => {
        assertEquals(res.statusCode, 200, 'API info should return 200');
        
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const info = JSON.parse(data);
          assertExists(info.nodeVersion, 'Should have nodeVersion');
          assertExists(info.platform, 'Should have platform');
          assertExists(info.arch, 'Should have arch');
          resolve();
        });
      }).on('error', reject);
    });
  });
  
  // Test 4: Root endpoint serves HTML
  test('Root endpoint serves HTML', () => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/`, (res) => {
        assertEquals(res.statusCode, 200, 'Root should return 200');
        
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (data.includes('<!DOCTYPE html>')) {
            resolve();
          } else {
            reject(new Error('Response should contain HTML'));
          }
        });
      }).on('error', reject);
    });
  });
  
  // Run all tests then close server
  await runTests();
  server.close();
}, 1000);
