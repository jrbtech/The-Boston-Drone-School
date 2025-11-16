// Check if email service is properly configured
const API_URL = 'https://bds-backend-5ao0.onrender.com';

async function checkEmailConfig() {
  console.log('🔍 Checking Email Configuration...\n');

  // Test endpoint that will trigger email service initialization
  try {
    const response = await fetch(`${API_URL}/api/orders/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Config Test',
        email: 'test@test.com',
        address: '123 Test',
        city: 'Boston',
        state: 'MA',
        zip: '02101',
        cart_items: [{ id: '1', name: 'Test', price: 1, quantity: 1 }],
        total_price: 1,
        total_items: 1
      })
    });

    const data = await response.json();

    console.log('API Response:', JSON.stringify(data, null, 2));
    console.log('\nEmail Sent Status:', data.emailSent);

    if (data.emailSent === false) {
      console.log('\n❌ Email service returned false - check Render logs for errors');
      console.log('\nPossible issues:');
      console.log('  1. RESEND_API_KEY not set in Render environment');
      console.log('  2. RESEND_API_KEY is incorrect');
      console.log('  3. Domain not verified in Resend');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkEmailConfig();
