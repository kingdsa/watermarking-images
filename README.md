# Toolbox

一个本地优先的工具小合集，所有处理在浏览器中完成，隐私安全。包含图片水印、UI 配色、UI 模版等常用小工具。

A local-first toolbox running entirely in the browser for privacy and security. Includes image watermark, UI color, UI templates and more small utilities.

## ✨ Features | 功能特性

- 🧰 **工具合集 | Tool Collection**：图片、UI 等多场景小工具统一入口
- 🖼️ **图片水印 | Image Watermark**：批量添加文字水印，支持大小、透明度、颜色、位置、旋转
- 🎨 **UI 配色 | UI Color**：生成、预览并导出适用于设计系统的配色方案
- 📐 **UI 模版 | UI Templates**：常用 UI 模版集合，可预览复用
- 🔒 **隐私优先 | Privacy First**：所有处理在浏览器本地完成，不上传服务器
- 🌓 **暗黑模式 | Dark Mode**：亮色/暗色主题切换
- 🌍 **国际化 | i18n**：中文/英文双语切换
- 📱 **响应式 | Responsive**：适配桌面端和移动端
- 👥 **实时在线人数 | Real-time Online Users**：基于 Firebase 的跨设备统计

> 更多工具（图片压缩、缩放、格式转换等）正在陆续上线。

## 🚀 Quick Start | 快速开始

### Installation | 安装依赖

```bash
npm install
```

### Firebase Configuration | Firebase 配置

本项目使用 Firebase Realtime Database 实现实时在线人数统计功能。

1. 复制环境变量模板文件：
   ```bash
   cp .env.example .env
   ```
2. 在 [Firebase Console](https://console.firebase.google.com/) 创建项目并获取配置信息
3. 将配置信息填入 `.env` 文件：
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. 在 Firebase Console 启用 Realtime Database（选择测试模式即可）

### Development | 开发模式

```bash
npm run dev
```

访问 `http://localhost:3000`

### Build | 构建生产版本

```bash
npm run build
```

### Preview | 预览生产构建

```bash
npm run preview
```

## 🛠️ Tech Stack | 技术栈

- **Vue 3** + **TypeScript** - 渐进式框架与类型安全
- **Vue Router** - 工具页面路由
- **Vite** - 快速构建工具
- **Canvas API** - 图片处理
- **JSZip** - ZIP 文件生成
- **Firebase** - 实时数据库（在线人数统计）

## 📖 Available Tools | 可用工具

| 工具 | 路径 | 说明 |
| --- | --- | --- |
| 图片水印 Image Watermark | `/tools/watermark` | 为单张或多张图片添加文字水印，支持实时预览与批量导出 |
| UI 配色 UI Color | `/tools/ui-color` | 生成、预览并导出 UI 配色方案 |
| UI 模版 UI Templates | `/tools/ui-templates` | 常用 UI 模版集合，可预览复用 |

### Image Watermark Usage | 图片水印使用说明

1. **上传图片**：拖拽或点击上传区域选择图片（支持 JPG、PNG、WebP）
2. **设置水印**：
   - 水印文字
   - 字体大小（12-120px）
   - 不透明度（0-100%）
   - 颜色
   - 位置（左上、右上、左下、右下、居中）
   - 旋转角度（-45° 到 45°）
3. **批量处理**：点击"批量处理"按钮为所有图片添加水印
4. **下载图片**：
   - 单独下载：点击图片下方的"下载"按钮
   - 批量下载：点击"打包下载"按钮下载 ZIP 压缩包

## 🎨 Design | 设计

本项目遵循 `DESIGN.md` 中定义的设计规范：

- 柔和米白色配色，配合雅致的石板蓝作为强调色
- Inter 字体系统
- 完整的暗黑模式支持
- L1 级交互：优雅的静态交互，流畅的 hover 反馈

## 📄 License

MIT
