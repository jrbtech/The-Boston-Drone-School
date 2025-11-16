// Quick Email Test Script for Boston Drone School
// Run with: node test-email.js

const API_URL = 'https://bds-backend-5ao0.onrender.com';
// Or test locally: const API_URL = 'http://localhost:8000';

console.log('🧪 Testing Resend Email Integration...\n');

// Test 1: Order Email
async function testOrderEmail() {
  console.log('📦 Test 1: Product Order Email');
  console.log('Sending to: /api/orders/submit\n');

  try {
    const response = await fetch(`${API_URL}/api/orders/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Customer',
        email: 'info@thebostondroneschool.org', // Will send to your own email
        phone: '(555) 123-4567',
        address: '123 Test Street',
        city: 'Boston',
        state: 'MA',
        zip: '02101',
        cart_items: [
          {
            id: 'test-product',
            name: 'FAA Part 107 Study Kit',
            price: 89.99,
            quantity: 1,
            category: 'Study Materials'
          },
          {
            id: 'landing-pad',
            name: 'Landing Pad Pro',
            price: 39.99,
            quantity: 2,
            category: 'Accessories'
          }
        ],
        total_price: 169.97,
        total_items: 3,
        notes: 'This is a test order from the email test script'
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('Response:', data);
      console.log('Email sent:', data.emailSent);
    } else {
      console.log('❌ FAILED');
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Test 2: Enrollment Email
async function testEnrollmentEmail() {
  console.log('🎓 Test 2: Course Enrollment Email');
  console.log('Sending to: /api/enrollment/request\n');

  try {
    const response = await fetch(`${API_URL}/api/enrollment/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Student',
        email: 'info@thebostondroneschool.org', // Will send to your own email
        phone: '(555) 987-6543',
        course_id: 'part-107-complete',
        course_title: 'FAA Part 107 Complete Course',
        course_price: 299,
        experience: 'beginner',
        message: 'This is a test enrollment from the email test script. Looking forward to getting my Part 107 license!'
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('Response:', data);
      console.log('Email sent:', data.emailSent);
    } else {
      console.log('❌ FAILED');
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

// Run tests
async function runTests() {
  console.log('Testing against:', API_URL);
  console.log('='.repeat(60) + '\n');

  await testOrderEmail();
  await testEnrollmentEmail();

  console.log('🏁 Tests Complete!\n');
  console.log('Check your inbox at: info@thebostondroneschool.org');
  console.log('You should receive:');
  console.log('  1. Order confirmation email');
  console.log('  2. Order notification email (admin)');
  console.log('  3. Enrollment confirmation email');
  console.log('  4. Enrollment notification email (admin)');
  console.log('\nTotal: 4 emails\n');
}

runTests();
