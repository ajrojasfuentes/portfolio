import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const pnpmDir = path.join(__dirname, '../node_modules/.pnpm');

if (!fs.existsSync(pnpmDir)) {
  console.log('No .pnpm directory found. Assuming not using pnpm or already fixed.');
  process.exit(0);
}

// Regex to match: import ... from "./something" or export ... from "./something"
// Ensuring it doesn't already end with .js, .css, etc.
const importRegex = /(import|export)\s+.*?\s+from\s+['"](\.[^'"]+)['"]/g;

fs.readdirSync(pnpmDir).forEach(pkgFolder => {
  if (pkgFolder.startsWith('@ajrojasfuentes')) {
    const pkgPath = path.join(pnpmDir, pkgFolder);
    walkDir(pkgPath, (filePath) => {
      if (filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;
        
        content = content.replace(importRegex, (match, p1, p2) => {
          // If it already has a valid extension, ignore
          if (p2.match(/\.(js|css|json)$/)) {
            return match;
          }
          // Check if the path points to a directory. If so, append /index.js instead of .js
          const absoluteImportPath = path.resolve(path.dirname(filePath), p2);
          if (fs.existsSync(absoluteImportPath) && fs.statSync(absoluteImportPath).isDirectory()) {
            return match.replace(p2, p2 + '/index.js');
          }
          return match.replace(p2, p2 + '.js');
        });

        if (content !== original) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log('Fixed ESM extensions in:', filePath);
        }
      }
    });
  }
});
