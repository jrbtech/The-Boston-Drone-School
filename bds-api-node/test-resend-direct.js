// Direct Resend API test - bypass our backend entirely
const { Resend } = require('resend');

const RESEND_API_KEY = 're_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF';
const FROM_EMAIL = 'info@thebostondroneschool.org';
const TO_EMAIL = 'info@thebostondroneschool.org';

async function testResendDirectly() {
  console.log('🧪 Testing Resend API Directly\n');
  console.log('API Key:', RESEND_API_KEY.substring(0, 10) + '...');
  console.log('From:', FROM_EMAIL);
  console.log('To:', TO_EMAIL);
  console.log('\n' + '='.repeat(60) + '\n');

  try {
    const resend = new Resend(RESEND_API_KEY);

    console.log('Sending email...');

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Direct Resend API Test',
      html: '<h1>Test Email</h1><p>If you receive this, Resend is working!</p>'
    });

    console.log('\n✅ SUCCESS!');
    console.log('Response:', JSON.stringify(result, null, 2));
    console.log('\nNow check:');
    console.log('1. resend.com/emails - should see this email');
    console.log('2. Your inbox at info@thebostondroneschool.org');

  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error('Message:', error.message);
    console.error('Full error:', error);

    if (error.message.includes('API key')) {
      console.log('\n💡 The API key appears to be invalid');
    } else if (error.message.includes('domain')) {
      console.log('\n💡 There may be a domain verification issue');
    }
  }
}

testResendDirectly();
