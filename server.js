const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// Default Admin Credentials
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// In-Memory Active Session Tokens Store
const activeTokens = new Set();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // Set CORS headers
  const setCorsHeaders = (resObj) => {
    resObj.setHeader('Access-Control-Allow-Origin', '*');
    resObj.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    resObj.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning, Accept');
  };

  // Handle CORS Preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, ngrok-skip-browser-warning, Accept',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  // API Route 1: Admin Login
  if (req.method === 'POST' && reqUrl === '/api/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        if (username === ADMIN_USER && password === ADMIN_PASS) {
          const token = crypto.randomBytes(32).toString('hex');
          activeTokens.add(token);

          setCorsHeaders(res);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            token,
            user: { name: 'د. حسام جعفر', role: 'مدير النظام' }
          }));
        } else {
          setCorsHeaders(res);
          res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: false,
            message: 'اسم المستخدم أو كلمة السر غير صحيحة'
          }));
        }
      } catch (e) {
        setCorsHeaders(res);
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, message: 'بيانات غير صالحة' }));
      }
    });
    return;
  }

  // API Route 2: Verify Session Token
  if (req.method === 'POST' && reqUrl === '/api/verify-token') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { token } = JSON.parse(body || '{}');
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const targetToken = token || bearerToken;

        const isValid = targetToken && activeTokens.has(targetToken);
        setCorsHeaders(res);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ valid: !!isValid }));
      } catch (e) {
        setCorsHeaders(res);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ valid: false }));
      }
    });
    return;
  }

  // API Route 3: Admin Logout
  if (req.method === 'POST' && reqUrl === '/api/logout') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { token } = JSON.parse(body || '{}');
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const targetToken = token || bearerToken;

        if (targetToken) activeTokens.delete(targetToken);

        setCorsHeaders(res);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        setCorsHeaders(res);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true }));
      }
    });
    return;
  }

  // API Route 4: Save Site Data to data.json (Protected Endpoint)
  if (req.method === 'POST' && reqUrl === '/api/save-data') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      // Check Authorization Bearer Token
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

      if (!token || !activeTokens.has(token)) {
        setCorsHeaders(res);
        res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'غير مصرح لك بإجراء هذه العملية. يرجى تسجيل الدخول أولاً.' }));
        return;
      }

      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(path.join(PUBLIC_DIR, 'data.json'), JSON.stringify(parsed, null, 2), 'utf-8');
        setCorsHeaders(res);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        setCorsHeaders(res);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON', details: e.message }));
      }
    });
    return;
  }

  // API Route 5: Read Site Data from data.json (Public)
  if (req.method === 'GET' && reqUrl === '/api/data') {
    const jsonPath = path.join(PUBLIC_DIR, 'data.json');
    if (fs.existsSync(jsonPath)) {
      fs.readFile(jsonPath, (err, content) => {
        if (err) {
          setCorsHeaders(res);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        } else {
          setCorsHeaders(res);
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
          });
          res.end(content);
        }
      });
    } else {
      try {
        const dataModule = require('./data.js');
        const initialData = JSON.stringify(dataModule.siteData, null, 2);
        fs.writeFileSync(jsonPath, initialData, 'utf-8');
        setCorsHeaders(res);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        });
        res.end(initialData);
      } catch (e) {
        setCorsHeaders(res);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create data.json', details: e.message }));
      }
    }
    return;
  }

  if (reqUrl === '/') reqUrl = '/index.html';

  const safeUrl = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safeUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(content),
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

