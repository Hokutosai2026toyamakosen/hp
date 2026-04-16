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
            // 画像などのバイナリは無視し、テキストファイルのみ処理
            let content = fs.readFileSync(fullPath, "utf8");
            const originalContent = content;

            // 1. HTML用: 属性パスの置換
            if (file.endsWith(".html")) {
                content = content.replace(/(src|href)="\/((?!hp\/)[^"]+)"/g, '$1="/hp/$2"');
            }

            // 2. JS / JSON 用: 内部のパス文字列を置換
            // "/img/", "/data/", "/js/" で始まる文字列をターゲットにする
            if (/\.(js|json)$/.test(file)) {
                // ダブルクォーテーション、シングルクォーテーション両対応
                content = content.replace(
                    /(["'])\/(?!(?:hp|https?|ftp)\/)([^"']+\.(?:png|jpg|jpeg|svg|gif|webp|json|js))(["'])/g,
                    `$1${basePath}/$2$3`,
                );
            }

            // 3. CSS用: url() の置換
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
