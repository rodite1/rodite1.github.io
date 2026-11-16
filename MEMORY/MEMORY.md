# MEMORY 索引

## 当前有效摘要（2026-11-16 更新）

- 个人博客：Hugo + PaperMod（子模块），仓库根 `C:\Users\33795\Desktop\myblog`，站点 https://rodite1.github.io/
- 首页：首屏 hero（站名+循环打字机+音乐按钮）→ 下滑文章卡片（仅标题）+侧边栏 → 页脚；文章页无封面图；全站银白拖尾；文章页粉红爱心光标；搜索只搜文章
- 隐藏内容已加密（AES-256-GCM + PBKDF2，构建后 `node scripts/encrypt-secret.mjs public`）；RSS/sitemap/JSON-LD 均不泄露
- 评论与统计：代码已集成 Waline（评论/回复/评论点赞/文章反应/浏览量，后台可看评论 IP/UA/时间）+ GoatCounter（流量明细 IP/主机/时间）；**待用户按 `评论与统计-部署指南.md` 部署并填 hugo.toml 配置**
- 本地验证用 Hugo：`C:\Users\33795\scoop\apps\hugo-extended\current\hugo.exe`（v0.166.0）；构建用 `--cacheDir .hugocache`
- 部署方式：push 到 main 后 GitHub Actions 自动构建发布（`.github/workflows/hugo.yaml`，含加密步骤）

## 子文件

- `决策点.md`：已确认的决定及原因
- `事实.md`：当前有效的客观信息
- `待办.md`：未完成事项与待确认问题
