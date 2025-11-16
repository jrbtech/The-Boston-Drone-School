// Test sending to account owner's email
const { Resend } = require('resend');

const RESEND_API_KEY = 're_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF';

async function testToPersonalEmail() {
  console.log('🧪 Testing Resend - Sending to account owner email\n');
  console.log('='.repeat(60) + '\n');

  try {
    const resend = new Resend(RESEND_API_KEY);

    console.log('Sending from onboarding@resend.dev to meganragab23@gmail.com...');

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'meganragab23@gmail.com',
      subject: 'Resend API Key Test - SUCCESS!',
      html: `
        <h1>✅ Your Resend API Key Works!</h1>
        <p>This email confirms your API key is valid and working.</p>
        <p><strong>Next step:</strong> Fix domain verification for thebostondroneschool.org</p>
        <hr>
        <p>API Key: ${RESEND_API_KEY.substring(0, 15)}...</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });

    console.log('\n✅ SUCCESS!');
    console.log('Response:', JSON.stringify(result, null, 2));

    if (result.data && result.data.id) {
      console.log('\n🎉 Email sent successfully!');
      console.log('📧 Email ID:', result.data.id);
      console.log('\n✅ CHECK: meganragab23@gmail.com inbox');
      console.log('✅ CHECK: resend.com/emails dashboard');
    }

  } catch (error) {
    console.error('\n❌ ERROR!');
    console.error(error);
  }
}

testToPersonalEmail();
