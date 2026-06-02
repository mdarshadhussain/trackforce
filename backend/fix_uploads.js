const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add /api/uploads route
content = content.replace(
  "app.use('/uploads', express.static(UPLOADS_DIR));",
  "app.use('/uploads', express.static(UPLOADS_DIR));\napp.use('/api/uploads', express.static(UPLOADS_DIR));"
);

// 2. Replace all `/uploads/` string templates with `/api/uploads/`
content = content.replace(/`\/uploads\//g, '`/api/uploads/');

fs.writeFileSync(filePath, content);
console.log('Fixed uploads paths in index.ts');
