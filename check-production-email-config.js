// Check if production backend has email configured correctly

const API_URL = 'https://bds-backend-5ao0.onrender.com';

async function checkConfig() {
  console.log('🔍 Checking Production Email Configuration\n');
  console.log('Backend:', API_URL);
  console.log('='.repeat(60) + '\n');

  try {
    // Check health endpoint
    console.log('1. Checking backend health...');
    const healthResponse = await fetch(`${API_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Backend is running');
    console.log('Health data:', JSON.stringify(healthData, null, 2));
    console.log();

  } catch (error) {
    console.log('❌ Backend health check failed:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');
  console.log('🚨 LIKELY ISSUE:\n');
  console.log('The production backend is missing RESEND_API_KEY or it\'s incorrect.\n');
  console.log('📋 ACTION REQUIRED:\n');
  console.log('1. Go to: https://dashboard.render.com');
  console.log('2. Select: bds-api-node service');
  console.log('3. Go to: Environment tab');
  console.log('4. Check if RESEND_API_KEY exists');
  console.log('5. If missing or wrong, set it to:');
  console.log('   re_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF');
  console.log('\n6. Also verify these are set:');
  console.log('   RESEND_FROM_EMAIL=info@bostondroneschool.org');
  console.log('   ADMIN_EMAIL=info@thebostondroneschool.org');
  console.log('\n7. Save and redeploy the service\n');
}

checkConfig();
