// 构建后处理脚本：把 Hugo 生成的明文 secret.json 加密为 AES-256-GCM 密文。
// 用法：node scripts/encrypt-secret.mjs [public目录，默认 ./public]
// 口令：环境变量 SECRET_PASSWORD，或默认 "FQY:HYSX:2018"（三段以冒号连接，与前端表单一致）。
// 说明：密钥由口令经 PBKDF2-SHA256 派生，salt 随机生成并随文件发布；
//       前端用 Web Crypto 以同样参数派生密钥后解密（GCM 认证失败 = 口令错误）。

import { randomBytes, pbkdf2Sync, createCipheriv } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import process from "node:process";

const publicDir = resolve(process.argv[2] || "public");
const secretFile = join(publicDir, "secret.json");

const password = process.env.SECRET_PASSWORD || "FQY:HYSX:2018";
const iterations = 150000;
const salt = randomBytes(32);
const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");

const plain = JSON.parse(readFileSync(secretFile, "utf8"));
if (!Array.isArray(plain)) {
    console.error("secret.json 不是预期的数组结构，请确认 Hugo 已先生成明文索引。");
    process.exit(1);
}

const items = plain.map((item) => {
    const payload = JSON.stringify({
        title: item.title || "",
        date: item.date || "",
        tags: item.tags || null,
        categories: item.categories || null,
        contents: item.contents || "",
        html: item.html || "",
    });
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const ct = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { p: item.permalink, c: Buffer.concat([iv, ct, tag]).toString("base64") };
});

const out = {
    v: 1,
    kdf: { algo: "PBKDF2-SHA256", iterations, salt: salt.toString("base64") },
    items,
};
writeFileSync(secretFile, JSON.stringify(out));
console.log(`已加密 ${items.length} 条隐藏内容 → ${secretFile}`);
