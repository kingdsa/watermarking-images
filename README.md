# Image Watermark Tool

一个本地图片水印工具，支持批量添加水印，保护隐私安全。

A local image watermarking tool with batch processing, ensuring privacy and security.

## ✨ Features | 功能特性

- 📤 **批量上传 | Batch Upload**: 支持拖拽或选择多张图片
- 🎨 **自定义水印 | Custom Watermark**: 自由调整文字、大小、透明度、颜色、位置、旋转角度
- 🔒 **隐私保护 | Privacy First**: 所有处理完全在浏览器本地完成，不上传到服务器
- 🌓 **暗黑模式 | Dark Mode**: 支持亮色/暗色主题切换
- 🌍 **国际化 | i18n**: 支持中文/英文双语切换
- 📱 **响应式 | Responsive**: 完美适配桌面端和移动端
- 💾 **批量下载 | Batch Download**: 支持打包下载所有已处理的图片（ZIP格式）

## 🚀 Quick Start | 快速开始

### Installation | 安装依赖

```bash
npm install
```

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

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Canvas API** - 图片处理
- **JSZip** - ZIP 文件生成

## 📖 Usage | 使用说明

1. **上传图片**: 拖拽或点击上传区域选择图片（支持 JPG、PNG、WebP）
2. **设置水印**: 
   - 输入水印文字
   - 调整字体大小（12-120px）
   - 调整不透明度（0-100%）
   - 选择颜色
   - 选择位置（左上、右上、左下、右下、居中）
   - 调整旋转角度（-45° 到 45°）
3. **批量处理**: 点击"批量处理"按钮为所有图片添加水印
4. **下载图片**: 
   - 单独下载：点击每张图片下方的"下载"按钮
   - 批量下载：点击"打包下载"按钮下载 ZIP 压缩包

## 🎨 Design | 设计

本项目遵循 `DESIGN.md` 中定义的设计规范：

- 柔和的米白色配色，配合雅致的石板蓝作为强调色
- Inter 字体系统
- 完整的暗黑模式支持
- L1 级交互：优雅的静态交互，流畅的 hover 反馈

## 📄 License

MIT

## 🙏 Acknowledgments

Design and development following modern web best practices.
