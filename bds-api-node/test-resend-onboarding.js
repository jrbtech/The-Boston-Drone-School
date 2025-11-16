// Test with Resend's onboarding domain (always works, no verification needed)
const { Resend } = require('resend');

const RESEND_API_KEY = 're_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF';

async function testWithOnboardingDomain() {
  console.log('🧪 Testing Resend with onboarding@resend.dev\n');
  console.log('This should work even without domain verification\n');
  console.log('='.repeat(60) + '\n');

  try {
    const resend = new Resend(RESEND_API_KEY);

    console.log('Sending email from onboarding@resend.dev...');

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@thebostondroneschool.org',
      subject: 'API Key Test - Resend Onboarding Domain',
      html: `
        <h1>Resend API Key Test</h1>
        <p>This email was sent using <strong>onboarding@resend.dev</strong></p>
        <p>If you receive this, your Resend API key is working correctly!</p>
        <p>API Key: ${RESEND_API_KEY.substring(0, 15)}...</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });

    console.log('\n✅ SUCCESS!');
    console.log('Response:', JSON.stringify(result, null, 2));
    console.log('\n📬 Check your inbox at: info@thebostondroneschool.org');
    console.log('📊 Check Resend dashboard: https://resend.com/emails');

    if (result.data && result.data.id) {
      console.log('\n✅ Email ID:', result.data.id);
      console.log('This confirms the API key is working!');
    }

  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error('Message:', error.message);
    console.error('Response:', error.response?.data || error);
  }
}

testWithOnboardingDomain();
