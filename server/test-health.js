import app from './app.js';

const PORT = 5005;

async function runTests() {
  console.log('--- Starting VetGuard AI Backend Verification ---');

  const server = app.listen(PORT);
  await new Promise((resolve) => server.once('listening', resolve));
  console.log(`Test server running on port ${PORT}`);

  try {
    // 1. Test Root Endpoint
    console.log('\n[TEST 1] Testing Root Endpoint GET /');
    const rootRes = await fetch(`http://127.0.0.1:${PORT}/`);
    const rootJson = await rootRes.json();
    console.log('Status:', rootRes.status);
    console.log('Body:', JSON.stringify(rootJson, null, 2));

    // 2. Test Health Endpoint
    console.log('\n[TEST 2] Testing Health Endpoint GET /api/v1/health');
    const healthRes = await fetch(`http://127.0.0.1:${PORT}/api/v1/health`);
    const healthJson = await healthRes.json();
    console.log('Status:', healthRes.status);
    console.log('Body:', JSON.stringify(healthJson, null, 2));

    // 3. Test 404 Handler
    console.log('\n[TEST 3] Testing 404 Handler GET /api/v1/invalid-route');
    const notFoundRes = await fetch(`http://127.0.0.1:${PORT}/api/v1/invalid-route`);
    const notFoundJson = await notFoundRes.json();
    console.log('Status:', notFoundRes.status);
    console.log('Body:', JSON.stringify(notFoundJson, null, 2));

    console.log('\n--- All verification tests completed successfully ---');
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    server.close();
  }
}

runTests();
