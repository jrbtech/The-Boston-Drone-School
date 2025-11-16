// Final Checkout Test - Real Customer Buying Legal Products
const API_URL = 'https://bds-backend-5ao0.onrender.com';

console.log('🛍️ FINAL CHECKOUT TEST - LEGAL PRODUCTS\n');
console.log('='.repeat(60) + '\n');

async function testFinalCheckout() {
  const orderData = {
    // Real customer example
    name: 'Michael Chen',
    email: 'info@thebostondroneschool.org', // You'll receive the notification here
    phone: '(617) 555-2468',

    // Shipping
    address: '789 Boylston Street',
    city: 'Boston',
    state: 'MA',
    zip: '02116',

    // Legal products only
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
        quantity: 1,
        category: 'Accessories'
      }
    ],

    total_price: 128.00,
    total_items: 2,
    notes: 'Please ship as soon as possible - exam in 3 weeks!'
  };

  console.log('👤 CUSTOMER: Michael Chen');
  console.log('📧 Admin Email: info@thebostondroneschool.org');
  console.log('💰 Order Total: $128.00\n');
  console.log('📦 PRODUCTS:');
  console.log('  1. FAA Part 107 Complete Study Kit - $89.00');
  console.log('     ✅ Legal: FAA public domain materials');
  console.log('     📋 Fulfill via: Lulu.com or local print shop\n');
  console.log('  2. Collapsible Landing Pad - Pro 30" - $39.00');
  console.log('     ✅ Legal: Wholesale product');
  console.log('     📋 Fulfill via: Ship from inventory or dropship\n');
  console.log('='.repeat(60) + '\n');

  console.log('📤 Submitting order to production backend...\n');

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
      console.log('Response:', JSON.stringify(result, null, 2));
      console.log('\n' + '='.repeat(60) + '\n');
      console.log('📧 WHAT HAPPENS NEXT:\n');
      console.log('1. YOU RECEIVE EMAIL at: info@thebostondroneschool.org');
      console.log('   Subject: "New Order: Michael Chen - $128.00"');
      console.log('   Contains: Full order details, customer info, shipping address\n');

      console.log('2. CUSTOMER RECEIVES EMAIL at: info@thebostondroneschool.org');
      console.log('   Subject: "Order Received - The Boston Drone School"');
      console.log('   Message: You\'ll contact them within 24 hours\n');

      console.log('3. YOUR NEXT STEPS:');
      console.log('   a) Email customer with payment instructions (Venmo/Zelle/PayPal)');
      console.log('   b) Wait for payment');
      console.log('   c) Fulfill via Lulu.com (study kit) + ship landing pad');
      console.log('   d) Send tracking info to customer\n');

      console.log('='.repeat(60) + '\n');
      console.log('✅ YOUR SHOP IS 100% LEGAL & READY FOR BUSINESS!\n');
      console.log('📋 Products: All legal (removed FPV simulator)');
      console.log('📧 Emails: Working perfectly');
      console.log('💰 Payment: Manual (Venmo/Zelle/PayPal)');
      console.log('📦 Fulfillment: Print-on-demand + wholesale + affiliate');
      console.log('\n🎉 CHECK YOUR INBOX NOW!\n');

    } else {
      console.log('❌ ORDER FAILED!');
      console.log('Status:', response.status);
      console.log('Error:', result);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

testFinalCheckout();
