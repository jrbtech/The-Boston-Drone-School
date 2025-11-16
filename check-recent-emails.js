// Check recent emails sent via Resend API
const { Resend } = require('resend');

const resend = new Resend('re_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF');

async function checkRecentEmails() {
  console.log('📧 Checking Recent Emails Sent via Resend\n');
  console.log('='.repeat(60) + '\n');

  try {
    // Get list of recent emails
    const emails = await resend.emails.list({ limit: 10 });

    console.log('Recent Emails Sent:\n');

    if (emails.data && emails.data.data && emails.data.data.length > 0) {
      emails.data.data.forEach((email, idx) => {
        console.log(`${idx + 1}. Email ID: ${email.id}`);
        console.log(`   To: ${email.to}`);
        console.log(`   From: ${email.from}`);
        console.log(`   Subject: ${email.subject}`);
        console.log(`   Created: ${email.created_at}`);
        console.log(`   Status: ${email.last_event || 'sent'}`);
        console.log();
      });

      console.log('='.repeat(60) + '\n');
      console.log('✅ Check if you see emails to: info@thebostondroneschool.org\n');

    } else {
      console.log('No recent emails found.\n');
    }

  } catch (error) {
    console.error('❌ Error fetching emails:', error.message);
  }
}

checkRecentEmails();
