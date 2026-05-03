# SpaceX Showcase

一个适合上传 GitHub 并部署到 Vercel 的 SpaceX 介绍型静态页面。

## 结构

- `index.html`：页面入口
- `src/styles.css`：页面样式
- `src/script.js`：交互逻辑
- `assets/`：项目内置视觉素材，不依赖手动下载图片
- `vercel.json`：Vercel 静态部署配置
- `scripts/check-site.mjs`：资源引用与语法检查

## 本地预览

```bash
npm install
npm run serve
```

如果不想安装依赖，也可以直接用浏览器打开 `index.html`。

## 部署到 Vercel

把本目录上传到 GitHub 后，在 Vercel 中导入仓库即可。项目是零构建静态站，默认入口为仓库根目录的 `index.html`。

上线后建议把 `robots.txt` 里的 `Sitemap` 域名替换成你的正式域名。
