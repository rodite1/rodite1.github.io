// 本地静态预览服务器：直接服务 public/（构建+加密后的成品）。
// 为什么不用 hugo server：hugo server 输出的 /secret.json 是明文索引（未加密），
//   前端无法解锁隐藏文章，会一直报"密码或口令错误"。用它预览会误判隐藏文章坏了。
// 用法：
//   1) hugo --minify --cacheDir "C:\Users\33795\Desktop\File\myblog-DSH\.hugocache"
//   2) node scripts/encrypt-secret.mjs public
//   3) node scripts/serve.mjs [端口，默认 8080]
//   然后浏览器打开 http://localhost:8080/
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize, extname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const port = Number(process.argv[2] || 8080);

// 启动前检查：secret.json 必须是加密格式，否则隐藏文章解锁必然失败
try {
    const raw = await readFile(join(root, "secret.json"), "utf8");
    const meta = JSON.parse(raw);
    if (Array.isArray(meta) || !meta.kdf) {
        console.warn("");
        console.warn("⚠ public/secret.json 是明文（未加密），隐藏文章解锁会失败！");
        console.warn("  请先运行：node scripts/encrypt-secret.mjs public");
        console.warn("");
    }
} catch {
    // 没有 secret.json 时忽略
}

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp3": "audio/mpeg",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
};

createServer(async (req, res) => {
    let pathname;
    try {
        pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
        res.writeHead(400);
        res.end();
        return;
    }
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = normalize(join(root, pathname));
    if (!file.startsWith(root)) {
        res.writeHead(403);
        res.end();
        return;
    }
    try {
        const data = await readFile(file);
        res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(data);
    } catch {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
    }
}).listen(port, () => {
    console.log("本地预览（含隐藏文章解锁，可正常验证口令）: http://localhost:" + port + "/");
    console.log("按 Ctrl+C 结束");
});
