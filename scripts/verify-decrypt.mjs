// 临时验证：模拟前端 Web Crypto 逻辑解密 public/secret.json
import { readFileSync } from "node:fs";
import { pbkdf2Sync, createDecipheriv } from "node:crypto";

const meta = JSON.parse(readFileSync("public/secret.json", "utf8"));
const password = process.env.TEST_PASSWORD || "FQY:HYSX:2018";
const salt = Buffer.from(meta.kdf.salt, "base64");
const key = pbkdf2Sync(password, salt, meta.kdf.iterations, 32, "sha256");

for (const item of meta.items) {
    const raw = Buffer.from(item.c, "base64");
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(raw.length - 16);
    const ct = raw.subarray(12, raw.length - 16);
    const d = createDecipheriv("aes-256-gcm", key, iv);
    d.setAuthTag(tag);
    const pt = Buffer.concat([d.update(ct), d.final()]);
    const obj = JSON.parse(pt.toString("utf8"));
    console.log("解密成功:", obj.title, "| permalink:", item.p);
    console.log("  contents:", JSON.stringify(obj.contents));
    console.log("  html:", obj.html);
}

// 错误口令必须失败
try {
    const wrongKey = pbkdf2Sync("wrong:wrong:wrong", salt, meta.kdf.iterations, 32, "sha256");
    const raw = Buffer.from(meta.items[0].c, "base64");
    const d = createDecipheriv("aes-256-gcm", wrongKey, raw.subarray(0, 12));
    d.setAuthTag(raw.subarray(raw.length - 16));
    d.update(raw.subarray(12, raw.length - 16));
    d.final();
    console.log("!!! 错误口令居然解密成功，异常");
} catch (e) {
    console.log("错误口令正确失败（GCM 认证拒绝）✓");
}
