// Check Resend Domain Status
const { Resend } = require('resend');

const resend = new Resend('re_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF');

async function checkStatus() {
  console.log('🔍 Checking Resend Domain Status...\n');

  try {
    // List domains
    const domains = await resend.domains.list();
    console.log('📋 Domains:', JSON.stringify(domains, null, 2));

    // Try to send a simple test email
    console.log('\n📧 Sending test email...');
    const email = await resend.emails.send({
      from: 'info@thebostondroneschool.org',
      to: 'info@thebostondroneschool.org',
      subject: 'Direct Resend API Test',
      html: '<h1>Test Email</h1><p>If you receive this, Resend is working!</p>',
    });

    console.log('✅ Email sent!');
    console.log('Email ID:', email.id);
    console.log('\nCheck your inbox at info@thebostondroneschool.org');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('domain')) {
      console.log('\n⚠️  DOMAIN NOT VERIFIED');
      console.log('You need to verify your domain in Resend dashboard first.');
      console.log('Using fallback: onboarding@resend.dev');

      // Try with fallback
      console.log('\n📧 Trying with onboarding@resend.dev...');
      const fallbackEmail = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'info@thebostondroneschool.org',
        subject: 'Fallback Test Email',
        html: '<h1>Fallback Test</h1><p>This is from onboarding@resend.dev</p>',
      });
      console.log('✅ Fallback email sent!');
      console.log('Email ID:', fallbackEmail.id);
    }
  }
}

checkStatus();
