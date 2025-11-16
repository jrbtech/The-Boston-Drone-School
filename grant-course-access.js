// Grant course access to meganragab23@gmail.com for testing
const API_URL = 'https://bds-backend-5ao0.onrender.com';

async function grantCourseAccess() {
  console.log('🎓 GRANTING COURSE ACCESS\n');
  console.log('='.repeat(60) + '\n');

  // Step 1: Register user account
  console.log('Step 1: Creating user account...');
  const registerData = {
    email: 'meganragab23@gmail.com',
    password: 'TestPassword123!',
    firstName: 'Megan',
    lastName: 'Ragab',
    role: 'student'
  };

  try {
    const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    });

    let userId, token;

    if (registerResponse.ok) {
      const registerResult = await registerResponse.json();
      userId = registerResult.user.id;
      token = registerResult.token;
      console.log('✅ Account created successfully');
      console.log(`   User ID: ${userId}`);
    } else if (registerResponse.status === 409) {
      console.log('ℹ️  Account already exists, logging in...');

      // Login instead
      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'meganragab23@gmail.com',
          password: 'TestPassword123!'
        })
      });

      if (loginResponse.ok) {
        const loginResult = await loginResponse.json();
        userId = loginResult.user.id;
        token = loginResult.token;
        console.log('✅ Logged in successfully');
        console.log(`   User ID: ${userId}`);
      } else {
        throw new Error('Failed to login - password may have changed');
      }
    } else {
      const error = await registerResponse.json();
      throw new Error(`Registration failed: ${error.error}`);
    }

    // Step 2: Enroll in Part 107 course
    console.log('\nStep 2: Enrolling in Part 107 course...');
    const enrollResponse = await fetch(`${API_URL}/api/enrollment/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        courseId: 'part-107-complete'
      })
    });

    if (enrollResponse.ok) {
      const enrollResult = await enrollResponse.json();
      console.log('✅ Enrolled in course successfully!\n');
      console.log('Enrollment Details:', JSON.stringify(enrollResult.enrollment, null, 2));
    } else if (enrollResponse.status === 409) {
      console.log('✅ Already enrolled in this course!');
    } else {
      const error = await enrollResponse.json();
      throw new Error(`Enrollment failed: ${error.error}`);
    }

    console.log('\n' + '='.repeat(60) + '\n');
    console.log('✅ ACCESS GRANTED!\n');
    console.log('📧 Email: meganragab23@gmail.com');
    console.log('🔑 Password: TestPassword123!');
    console.log('📚 Course: FAA Part 107 Remote Pilot Certification\n');
    console.log('🌐 Login at: https://bds-frontend.onrender.com/login');
    console.log('   or: http://localhost:3000/login (if running locally)\n');
    console.log('After login, go to:');
    console.log('   📖 /dashboard - View your enrolled courses');
    console.log('   🎓 /learn/part-107-complete - Start learning\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\nIf account exists with different password, you can:');
    console.log('1. Use the forgot password feature');
    console.log('2. Or manually update in database');
  }
}

grantCourseAccess();
