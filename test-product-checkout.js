// Test Complete Product Checkout Flow
// Simulates a customer buying products and checking out

const API_URL = 'https://bds-backend-5ao0.onrender.com';

console.log('🛒 TESTING COMPLETE PRODUCT CHECKOUT FLOW\n');
console.log('Simulating a customer purchasing from the website...\n');
console.log('='.repeat(60) + '\n');

async function testProductCheckout() {
  // Simulate customer adding items to cart and checking out
  const orderData = {
    // Customer Information
    name: 'John Smith',
    email: 'info@thebostondroneschool.org', // Will receive confirmation email
    phone: '(617) 555-0123',

    // Shipping Address
    address: '123 Beacon Street',
    city: 'Boston',
    state: 'MA',
    zip: '02108',

    // Cart Items (from shop page)
    cart_items: [
      {
        id: 'part-107-complete-study-kit',
        name: 'FAA Part 107 Complete Study Kit',
        price: 89,
        quantity: 1,
        category: 'Study Materials'
      },
      {
        id: 'landing-pad-pro',
        name: 'Collapsible Landing Pad - Pro 30"',
        price: 39,
        quantity: 2,
        category: 'Accessories'
      }
    ],

    // Order Summary
    total_price: 167.00, // $89 + ($39 × 2)
    total_items: 3,

    // Optional Notes
    notes: 'Please include extra study materials if available. Thanks!'
  };

  console.log('📦 ORDER DETAILS:');
  console.log('Customer:', orderData.name);
  console.log('Email:', orderData.email);
  console.log('Phone:', orderData.phone);
  console.log('Shipping:', `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zip}`);
  console.log('\nItems:');
  orderData.cart_items.forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item.name} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`);
  });
  console.log(`\nTotal: $${orderData.total_price.toFixed(2)} (${orderData.total_items} items)`);
  console.log('\n' + '='.repeat(60) + '\n');

  console.log('📤 SUBMITTING ORDER TO API...');
  console.log(`Endpoint: ${API_URL}/api/orders/submit\n`);

  try {
    const response = await fetch(`${API_URL}/api/orders/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ ORDER SUBMITTED SUCCESSFULLY!\n');
      console.log('Server Response:');
      console.log('  Message:', result.message);
      console.log('  Email Sent:', result.emailSent ? 'YES ✓' : 'NO ✗');
      console.log('  Success:', result.success ? 'YES ✓' : 'NO ✗');

      console.log('\n' + '='.repeat(60) + '\n');
      console.log('📧 EXPECTED EMAILS:\n');
      console.log('1. CUSTOMER CONFIRMATION → info@thebostondroneschool.org');
      console.log('   Subject: "Order Received - The Boston Drone School"');
      console.log('   Contains: Order summary, next steps, shipping address\n');

      console.log('2. ADMIN NOTIFICATION → info@thebostondroneschool.org');
      console.log('   Subject: "New Order: John Smith - $167.00"');
      console.log('   Contains: Customer details, order items, action required\n');

      console.log('='.repeat(60) + '\n');
      console.log('✅ TEST COMPLETE!\n');
      console.log('Check your inbox at: info@thebostondroneschool.org');
      console.log('You should receive 2 emails (customer + admin)');
      console.log('\nBoth emails sent FROM: info@bostondroneschool.org');
      console.log('(Check spam folder if not in inbox)\n');

    } else {
      console.log('❌ ORDER FAILED!\n');
      console.log('Status:', response.status);
      console.log('Error:', result);
    }

  } catch (error) {
    console.log('❌ ERROR SUBMITTING ORDER\n');
    console.log('Error:', error.message);
  }
}

// Run the test
testProductCheckout();
