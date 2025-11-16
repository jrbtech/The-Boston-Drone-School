// Direct Resend Email Test
const { Resend } = require('resend');

const resend = new Resend('re_4iF6aZfV_6jak2aXi3ehEiR1nfJTEegHF');

async function sendTest() {
  console.log('📧 Sending direct test email to info@thebostondroneschool.org\n');

  try {
    const result = await resend.emails.send({
      from: 'info@bostondroneschool.org',
      to: 'info@thebostondroneschool.org',
      subject: 'Direct Resend Test - Product Order',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 30px 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🧪 Direct Resend API Test</h1>
            </div>
            <div class="content">
              <h2>Test Email Successful!</h2>
              <p>This email was sent directly from Resend API using:</p>
              <ul>
                <li><strong>From:</strong> info@bostondroneschool.org</li>
                <li><strong>To:</strong> info@thebostondroneschool.org</li>
                <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p>If you're seeing this, your Resend integration is working!</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ SUCCESS!');
    console.log('Full response:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ ERROR:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));
  }
}

sendTest();
