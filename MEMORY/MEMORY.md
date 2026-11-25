# MEMORY 索引

## 当前有效摘要（2026-11-25 更新）

- 个人博客：Hugo + PaperMod（子模块），仓库根 `C:\Users\33795\Desktop\File\myblog-DSH`（2026-11-24 从 Desktop\myblog 迁入并改名），站点 https://rodite1.github.io/
- 首页：首屏 hero（站名+循环打字机+音乐按钮）→ 下滑文章卡片（仅标题，悬停结霜效果）+侧边栏 → 页脚；文章页无封面图；全站银白拖尾；文章页光标为默认样式（爱心光标已移除）；搜索只搜文章
- 隐藏内容已加密（AES-256-GCM + PBKDF2，构建后 `node scripts/encrypt-secret.mjs public`）；RSS/sitemap/JSON-LD/OpenGraph 均不泄露；secret 文章可写 `date`（随索引加密，解锁后文章页 meta 显示，源码不出现）
- 访客防护：全站拦截 F12 / 开发者工具快捷键 / 查看源码 / 保存 / 打印 / 复制剪切 / 右键，触发弹暗色毛玻璃温和提示（`layouts/partials/content-guard.html`，经 extend_head 引入；防君子不防小人，可被禁用 JS 绕过，评论区 iframe 不受影响）
- 评论与统计已上线：Waline（评论/回复/评论点赞/文章反应/浏览量，后台可看评论 IP/UA/时间）+ GoatCounter（流量明细 IP/主机/时间）；大陆访问 Waline 需加速器，侧边栏公告已注明
- 本地验证用 Hugo：`C:\Users\33795\scoop\apps\hugo-extended\current\hugo.exe`（v0.166.0）；构建用绝对路径 `--cacheDir "C:\Users\33795\Desktop\File\myblog-DSH\.hugocache"`
- 部署方式：push 到 main 后 GitHub Actions 自动构建发布（`.github/workflows/hugo.yaml`，含加密步骤）

## 子文件

- `决策点.md`：已确认的决定及原因
- `事实.md`：当前有效的客观信息
- `待办.md`：未完成事项与待确认问题
