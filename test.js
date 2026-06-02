const https = require('https');
const data = JSON.stringify({ employeeId: 'ELE001', password: 'Elemecs@825314' });
const options = {
  hostname: 'api.elemecs.com',
  port: 443,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});
req.on('error', error => console.error(error));
req.write(data);
req.end();
