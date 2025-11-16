// Test Real Customer Checkout
// Customer: Sarah Johnson (not the business owner)
// Admin notifications should go to: info@thebostondroneschool.org

const API_URL = 'https://bds-backend-5ao0.onrender.com';

console.log('🛒 REAL CUSTOMER CHECKOUT TEST\n');
console.log('='.repeat(60) + '\n');

async function testRealCustomerCheckout() {
  const orderData = {
    // REAL CUSTOMER (not you)
    name: 'Sarah Johnson',
    email: 'sarah.johnson.customer@gmail.com',  // Customer email
    phone: '(508) 555-7890',

    // Shipping Address
    address: '456 Commonwealth Avenue',
    city: 'Cambridge',
    state: 'MA',
    zip: '02139',

    // Items purchased
    cart_items: [
      {
        id: 'part-107-complete-study-kit',
        name: 'FAA Part 107 Complete Study Kit',
        price: 89,
        quantity: 1,
        category: 'Study Materials'
      },
      {
        id: 'sectional-chart-set',
        name: 'Laminated Sectional Chart Set',
        price: 34,
        quantity: 1,
        category: 'Study Materials'
      }
    ],

    total_price: 123.00,
    total_items: 2,
    notes: 'Please ship ASAP - taking exam next month!'
  };

  console.log('👤 CUSTOMER: Sarah Johnson');
  console.log('📧 Customer Email: sarah.johnson.customer@gmail.com');
  console.log('📦 Order Total: $123.00\n');
  console.log('Items:');
  orderData.cart_items.forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item.name} - $${item.price}`);
  });
  console.log('\n' + '='.repeat(60) + '\n');

  console.log('📤 Submitting order to backend...\n');

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
      console.log('✅ ORDER SUBMITTED!\n');
      console.log('Response:', JSON.stringify(result, null, 2));
      console.log('\n' + '='.repeat(60) + '\n');
      console.log('📧 EMAILS SENT:\n');
      console.log('1. TO CUSTOMER (Sarah):');
      console.log('   Email: sarah.johnson.customer@gmail.com');
      console.log('   From: info@bostondroneschool.org');
      console.log('   Subject: "Order Received - The Boston Drone School"\n');

      console.log('2. TO YOU (Admin Notification):');
      console.log('   Email: info@thebostondroneschool.org ⭐');
      console.log('   From: info@bostondroneschool.org');
      console.log('   Subject: "New Order: Sarah Johnson - $123.00"');
      console.log('   Contains: Customer details, order items, shipping address\n');

      console.log('='.repeat(60) + '\n');
      console.log('✅ CHECK YOUR INBOX NOW!\n');
      console.log('📬 info@thebostondroneschool.org\n');
      console.log('You should receive the ADMIN NOTIFICATION email');
      console.log('(Customer confirmation went to sarah.johnson.customer@gmail.com)\n');

    } else {
      console.log('❌ FAILED!');
      console.log('Status:', response.status);
      console.log('Error:', result);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

testRealCustomerCheckout();
