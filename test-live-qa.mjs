import http from 'http';

function makeRequest(options, postData = null) {
  return new Promise((resolve) => {
    const opts = { ...options, agent: false };
    const payload = postData ? (typeof postData === 'string' ? postData : JSON.stringify(postData)) : null;
    if (payload && opts.headers) {
      opts.headers['Content-Length'] = Buffer.byteLength(payload);
    }
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = JSON.parse(data);
        } catch (_) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: parsed,
          rawBody: data
        });
      });
    });

    req.on('error', (err) => {
      resolve({ error: err.message, statusCode: 500 });
    });

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function runTestSuite() {
  const results = {
    passed: [],
    failed: []
  };

  function assert(name, condition, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      results.passed.push(name);
    } else {
      console.error(`❌ [FAIL] ${name} - ${details}`);
      results.failed.push({ name, details });
    }
  }

  console.log('\n======================================================');
  console.log('       PAN EVENTZ LIVE QA & FUNCTIONALITY SUITE        ');
  console.log('======================================================\n');

  // 1. PUBLIC HTML ROUTES
  const publicRoutes = [
    '/',
    '/services',
    '/media',
    '/about',
    '/blog',
    '/blog/top-10-wedding-trends-2024',
    '/event/annual-corporate-summit-2023',
    '/contact',
    '/admin/login'
  ];

  console.log('--- 1. Testing Public HTML Routes ---');
  for (const route of publicRoutes) {
    const res = await makeRequest({
      hostname: 'localhost',
      port: 5005,
      path: route,
      method: 'GET'
    });
    assert(`Route ${route} returns 200 OK`, res.statusCode === 200, `Got status ${res.statusCode}`);
    assert(`Route ${route} serves HTML template`, typeof res.rawBody === 'string' && res.rawBody.includes('<html'), `Length: ${res.rawBody?.length}`);
  }

  // 2. TEST RESTORED API ENDPOINTS
  console.log('\n--- 2. Testing Restored API Endpoints ---');
  
  // A. /api/services
  const resServices = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/services',
    method: 'GET'
  });
  assert('/api/services returns 200', resServices.statusCode === 200);
  assert('/api/services returns array of services', Array.isArray(resServices.body) && resServices.body.length > 0, `Length: ${resServices.body?.length}`);

  // B. /api/testimonials
  const resTestimonials = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/testimonials',
    method: 'GET'
  });
  assert('/api/testimonials returns 200', resTestimonials.statusCode === 200);
  assert('/api/testimonials returns array', Array.isArray(resTestimonials.body) && resTestimonials.body.length > 0, `Count: ${resTestimonials.body?.length}`);

  // C. /api/stats
  const resStats = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/stats',
    method: 'GET'
  });
  assert('/api/stats returns 200', resStats.statusCode === 200);
  assert('/api/stats returns stat items with labels', Array.isArray(resStats.body) && resStats.body.length >= 4, `Count: ${resStats.body?.length}`);

  // D. /api/about
  const resAbout = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/about',
    method: 'GET'
  });
  assert('/api/about returns 200', resAbout.statusCode === 200);
  assert('/api/about has title/story/values/team', !!resAbout.body && (resAbout.body.title || resAbout.body.content || resAbout.body.values), `Keys: ${Object.keys(resAbout.body || {})}`);

  // E. /api/cloudinary/:folder
  const folders = ['corporate', 'weddings', 'mika-singh', 'sonu-nigam', 'sports'];
  for (const folder of folders) {
    const resFolder = await makeRequest({
      hostname: 'localhost',
      port: 5005,
      path: `/api/cloudinary/${folder}`,
      method: 'GET'
    });
    assert(`/api/cloudinary/${folder} returns 200`, resFolder.statusCode === 200);
    assert(`/api/cloudinary/${folder} returns image items`, Array.isArray(resFolder.body) && resFolder.body.length > 0, `Count: ${resFolder.body?.length}`);
  }

  // 3. FORM VALIDATION & CONTACT SUBMISSIONS
  console.log('\n--- 3. Testing Contact Form & Validation API ---');
  
  // A. Valid contact submission
  const validContact = {
    name: 'Rohit Singhania',
    email: 'rohit@singhaniagroup.com',
    phone: '+91 98200 12345',
    eventType: 'corporate',
    message: 'We are requesting a proposal for our Annual Tech Conclave 2024 with 1,500 VIP delegates.'
  };
  const resContactValid = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, validContact);
  assert('Contact form submission (Valid) returns 200/201', resContactValid.statusCode === 200 || resContactValid.statusCode === 201, `Status: ${resContactValid.statusCode}`);

  // B. Invalid contact submission (missing required fields)
  const invalidContact = {
    name: '',
    email: 'not-an-email',
    message: ''
  };
  const resContactInvalid = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, invalidContact);
  assert('Contact form submission (Invalid) returns 400 Bad Request', resContactInvalid.statusCode === 400, `Got: ${resContactInvalid.statusCode}`);

  // C. Special characters & SQL injection attempt sanitization
  const sqlInjectionContact = {
    name: "O'Connor <script>alert('xss')</script> -- DROP TABLE users;",
    email: "security_test@domain.co.in",
    phone: "+91 99999 88888",
    eventType: "wedding",
    message: "Special chars test: !@#$%^&*()_+~`|}{[]:;?><,./"
  };
  const resContactSql = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, sqlInjectionContact);
  assert('Contact form handles special characters safely', resContactSql.statusCode === 200 || resContactSql.statusCode === 201, `Status: ${resContactSql.statusCode}`);

  // 4. AUTHENTICATION & SECURITY AUDIT
  console.log('\n--- 4. Testing Admin Authentication ---');
  
  // A. Invalid login attempt
  const resAuthInvalid = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'fakeuser', password: 'wrongpassword' });
  assert('Admin login (Invalid credentials) returns 401 Unauthorized', resAuthInvalid.statusCode === 401, `Got: ${resAuthInvalid.statusCode}`);

  // B. Valid login attempt
  const resAuthValid = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'admin', password: 'password123' });
  assert('Admin login (Valid credentials) returns 200 OK', resAuthValid.statusCode === 200, `Status: ${resAuthValid.statusCode}`);
  assert('Admin login returns JWT token', !!resAuthValid.body?.token, `Token exists: ${!!resAuthValid.body?.token}`);

  const authToken = resAuthValid.body?.token;

  // C. Protected route access without token
  const resProtectedNoAuth = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/admin/dashboard',
    method: 'GET'
  });
  assert('Protected admin endpoint without token returns 401', resProtectedNoAuth.statusCode === 401, `Got: ${resProtectedNoAuth.statusCode}`);

  // D. Protected route access with token
  const resProtectedAuth = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/admin/dashboard',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  assert('Protected admin endpoint with JWT token returns 200', resProtectedAuth.statusCode === 200, `Status: ${resProtectedAuth.statusCode}`);

  // 5. ADMIN CRUD FUNCTIONALITY
  console.log('\n--- 5. Testing Admin CRUD Capabilities ---');
  
  // A. CREATE a Testimonial
  const newTestimonial = {
    name: 'Aarav Singhania',
    role: 'Managing Director, Apex Global',
    company: 'Apex Global',
    content: 'Pan Eventz managed our 25th Silver Jubilee Conclave with impeccable artistry and zero audio-visual lag.',
    rating: 5,
    event: 'Apex Silver Jubilee',
    featured: true
  };
  const resCreateTestimonial = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/testimonials',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  }, newTestimonial);
  assert('Admin CREATE Testimonial returns 200/201', resCreateTestimonial.statusCode === 200 || resCreateTestimonial.statusCode === 201, `Status: ${resCreateTestimonial.statusCode}`);

  // B. CREATE an Event
  const newEvent = {
    title: 'QA Automated Test Gala 2024',
    slug: 'qa-automated-test-gala-2024',
    description: 'An automated testing case study verification event.',
    date: '2024-12-31',
    location: 'Leela Palace, Bangalore',
    category: 'corporate',
    clientName: 'Enterprise Testing Labs',
    attendees: 500,
    status: 'upcoming'
  };
  const resCreateEvent = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/events',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  }, newEvent);
  assert('Admin CREATE Event returns 200/201', resCreateEvent.statusCode === 200 || resCreateEvent.statusCode === 201, `Status: ${resCreateEvent.statusCode}`);

  // C. READ newly created event
  const resGetEvents = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/api/events',
    method: 'GET'
  });
  assert('Admin READ Events returns updated list', Array.isArray(resGetEvents.body) && resGetEvents.body.length > 0);

  // 6. 404 NOT FOUND BEHAVIOR
  console.log('\n--- 6. Testing 404 & SPA Routing ---');
  const resNonExistent = await makeRequest({
    hostname: 'localhost',
    port: 5005,
    path: '/some-random-non-existent-route-xyz',
    method: 'GET'
  });
  assert('Non-existent route is served by SPA template for client-side 404 handling', resNonExistent.statusCode === 200 && resNonExistent.rawBody.includes('<html'), `Status: ${resNonExistent.statusCode}`);

  console.log('\n======================================================');
  console.log(`TOTAL PASSED: ${results.passed.length}`);
  console.log(`TOTAL FAILED: ${results.failed.length}`);
  console.log('======================================================\n');

  if (results.failed.length > 0) {
    process.exit(1);
  }
}

runTestSuite();
