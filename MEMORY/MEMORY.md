# MEMORY 索引

## 当前有效摘要（2026-11-15 二改后更新）

- 个人博客：Hugo + PaperMod（子模块），仓库根 `C:\Users\33795\Desktop\myblog`，站点 https://rodite1.github.io/
- 首页已二改：极简（只留站名 + 循环打字机 + 轮播背景），隐藏页脚；文章页无封面图；全站银白鼠标拖尾，文章页粉红爱心光标；搜索只搜文章，搜索页密码验证（FQY/HYSX/2018）后合并 secret 隐藏内容。详见 `决策点.md`
- 本地验证用 Hugo：`C:\Users\33795\scoop\apps\hugo-extended\current\hugo.exe`（v0.166.0）
- 部署方式：push 到 main 后 GitHub Actions 自动构建发布（`.github/workflows/hugo.yaml`）
- 构建注意：`--gc` 需写用户目录缓存（本机受限）；本地验证用 `--cacheDir .hugocache` 即可。Hugo 多输出格式共享 `.Scratch`，索引模板须用局部变量

## 子文件

- `决策点.md`：已确认的决定及原因
- `事实.md`：当前有效的客观信息
- `待办.md`：未完成事项与待确认问题
