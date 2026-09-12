import http from 'http';

function test(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n=== [${method}] ${path} ===`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        console.log(`Body Length: ${data.length}`);
        console.log(`Body Preview: ${data.slice(0, 200)}`);
        resolve({ status: res.statusCode, data });
      });
    });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function debug() {
  await test('/api/services');
  await test('/api/stats');
  await test('/api/cloudinary/corporate');
  await test('/api/auth/login', 'POST', { username: 'admin', password: 'password123' });
  await test('/api/contact', 'POST', {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 99999 99999',
    eventType: 'corporate',
    message: 'Hello world'
  });
}

debug();
