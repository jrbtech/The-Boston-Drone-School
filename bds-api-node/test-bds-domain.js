// Test sending from info@thebostondroneschool.org
const { Resend } = require('resend');

const RESEND_API_KEY = 're_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF';

async function testBDSDomain() {
  console.log('🧪 Testing Boston Drone School Domain\n');
  console.log('From: info@thebostondroneschool.org');
  console.log('To: info@thebostondroneschool.org');
  console.log('='.repeat(60) + '\n');

  try {
    const resend = new Resend(RESEND_API_KEY);

    console.log('Sending email...');

    const result = await resend.emails.send({
      from: 'info@thebostondroneschool.org',
      to: 'info@thebostondroneschool.org',
      subject: 'Boston Drone School - Email System Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; color: #fff; padding: 30px 20px; text-align: center;">
            <h1>✅ Email System Working!</h1>
          </div>
          <div style="padding: 30px 20px; background: #f9f9f9;">
            <p>Great news! Your Boston Drone School email system is now operational.</p>

            <h3>What This Means:</h3>
            <ul>
              <li>✅ Domain verified: thebostondroneschool.org</li>
              <li>✅ Sending from: info@thebostondroneschool.org</li>
              <li>✅ Order confirmations will work</li>
              <li>✅ Enrollment confirmations will work</li>
            </ul>

            <p><strong>Test Details:</strong></p>
            <p>Timestamp: ${new Date().toISOString()}</p>
            <p>API Key: ${RESEND_API_KEY.substring(0, 15)}...</p>
          </div>
          <div style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>The Boston Drone School<br>
            Professional FAA Part 107 Training</p>
          </div>
        </div>
      `
    });

    console.log('\n📧 Response:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.log('\n❌ ERROR:', result.error.message);
      if (result.error.message.includes('not verified')) {
        console.log('\n💡 Domain still showing as not verified');
        console.log('Try: Delete domain and re-add it in Resend dashboard');
      }
    } else if (result.data && result.data.id) {
      console.log('\n🎉 SUCCESS!');
      console.log('✅ Email ID:', result.data.id);
      console.log('\n📬 CHECK YOUR INBOX:');
      console.log('   - info@thebostondroneschool.org');
      console.log('   - resend.com/emails dashboard');
    }

  } catch (error) {
    console.error('\n❌ EXCEPTION:', error.message);
    console.error(error);
  }
}

testBDSDomain();
