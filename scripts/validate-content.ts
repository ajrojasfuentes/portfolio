import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, "../src/content");

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

console.log("🔍 Validating MDX content collections in src/content/...");
const files = getFiles(contentDir);
let hasErrors = false;

for (const file of files) {
  const relative = path.relative(contentDir, file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.startsWith("---")) {
    console.error(`❌ Missing frontmatter delimiter in: ${relative}`);
    hasErrors = true;
    continue;
  }
  const endFrontmatter = content.indexOf("---", 3);
  if (endFrontmatter === -1) {
    console.error(`❌ Unclosed frontmatter in: ${relative}`);
    hasErrors = true;
    continue;
  }
  console.log(`✅ Validated structure: ${relative}`);
}

if (hasErrors) {
  console.error("\n❌ Content validation failed with errors.");
  process.exit(1);
} else {
  console.log(`\n🎉 All ${files.length} content files successfully validated!`);
}

