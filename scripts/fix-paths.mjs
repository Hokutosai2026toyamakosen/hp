import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, "../docs");
const basePath = "/hp";
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (/\.(html|json|js|css)$/.test(file)) {
      let content = fs.readFileSync(fullPath, "utf8");
      const originalContent = content;

      if (file.endsWith(".html")) {
        content = content.replace(/(src|href)="\/((?!hp\/)[^"]+)"/g, '$1="/hp/$2"');
      }

      if (/\.(js|json)$/.test(file)) {
        content = content.replace(
          /(["'])\/(?!(?:hp|https?|ftp)\/)([^"']+\.(?:png|jpg|jpeg|svg|gif|webp|json|js))(["'])/g,
          `$1${basePath}/$2$3`,
        );
      }

      if (file.endsWith(".css")) {
        content = content.replace(/url\(\s*["']?\/([^"'>)]+)["']?\s*\)/g, (match, p1) => {
          if (p1.startsWith("hp/")) return match;
          return `url("${basePath}/${p1}")`;
        });
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`Enforced /hp/ in: ${file}`);
      }
    }
  });
}

walk(docsDir);
console.log("Finished updating paths.");
