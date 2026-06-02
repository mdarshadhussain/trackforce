const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add /api/media route
const mediaRoute = `
// Bypass LiteSpeed static interception
app.get('/api/media', (req, res) => {
  const filePath = req.query.path;
  if (!filePath || typeof filePath !== 'string') return res.status(400).send('Path required');
  
  // Prevent directory traversal
  const safePath = path.normalize(filePath).replace(/^(\\.\\.(\\/|\\\\|$))+/, '');
  const absolutePath = path.join(UPLOADS_DIR, safePath);
  
  if (fs.existsSync(absolutePath)) {
    res.sendFile(absolutePath);
  } else {
    res.status(404).send('File not found');
  }
});
`;

if (!content.includes('/api/media')) {
  content = content.replace(
    "app.use('/api/uploads', express.static(UPLOADS_DIR));",
    "app.use('/api/uploads', express.static(UPLOADS_DIR));\n" + mediaRoute
  );
}

// 2. Replace all `/api/uploads/` string templates with `/api/media?path=`
content = content.replace(/`\/api\/uploads\//g, '`/api/media?path=');
// Also replace any legacy `/uploads/` that might have been missed
content = content.replace(/`\/uploads\//g, '`/api/media?path=');

fs.writeFileSync(filePath, content);
console.log('Fixed media paths in index.ts');
