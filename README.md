# 启知云课堂 (QiZhi Cloud Classroom) - 在线培训机构落地页

本项目是一个基于 **Vue 3 + TypeScript + Vite + Tailwind CSS**
构建的高美感、模块化在线培训机构落地页。页面具备丰富的设计美学与出色的微交互，旨在为在线教育和培训机构提供现代化、高转化的精美页面模板。

## 效果图

<img src="./ScreenShot.avif" alt="效果图" style="zoom: 70%;" />

## 🌟 核心特性

- 🧱
  **高度模块化架构**：所有的页面板块（Hero、核心特色、讲师团队、数据看板、价格方案、常见问题、CTA
  等）均已被拆分为独立的 Vue 组件，位于 `src/components/sections`
  目录下，便于在其他页面中作为模版快速复用。
- ⚙️ **配置驱动内容 (Configuration
  Driven)**：页面上的文案、图片链接、价格表、常见问题等所有内容，均通过静态 API
  数据驱动（模拟从后端接口获取并具有网络延迟），数据源配置于
  `public/api/page-data.json`。
- 🎨 **多主题与深色模式**：
  - 支持**一键切换深色模式/浅色模式**，并由内联首屏防闪烁（Anti-FOUC）脚本提供平滑加载保障。
  - 集成 **`@zeldafox/vue-tailwind-theme-kit` 动态设计系统主题库**：内置 40+
    种精美主题预设（如 Claude、Vercel、Twitter、Catppuccin、Cyberpunk
    等），能够动态联动整站的主色、背景色、文字颜色、边框、圆角弧度及字体族，支持用户通过搜索和配色小圆点方便地切换。
- ✨ **滚动渐现动效**：基于 Intersection Observer API 封装了自定义指令
  `v-reveal`，支持 Fade/Zoom
  动画模式，并可配置动画方向（上/下/左/右）、延迟时间与持续时间，带来丝滑的滚动加载视觉体验。
- 📱
  **完美响应式适配**：针对移动端、平板与桌面端进行了细致的适配，确保在任何设备上都拥有极致的视觉呈现。

## 🛠️ 技术栈

- **前端框架**：Vue 3 (Composition API & `<script setup>`)
- **构建工具**：Vite 8
- **类型系统**：TypeScript 6
- **样式系统**：Tailwind CSS v4 + 原生 CSS 自定义属性 (CSS Variables)
- **图标系统**：Iconify (`@iconify/vue`) - 引入 Lucide 规范化图标

## 📂 项目目录结构

```text
qizhi-cloud-website/
├── public/                 # 静态资源
│   ├── api/
│   │   └── page-data.json  # 落地页核心数据配置文件 (可在此直接修改文案/结构)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── qizhi.ts        # 数据请求接口层与 TypeScript 接口定义
│   ├── assets/             # 静态图片/媒体资源
│   ├── components/
│   │   ├── sections/       # 拆分后的高复用模块化组件
│   │   │   ├── PageHeader.vue     # 导航栏 (包含深色模式及主题色切换逻辑)
│   │   │   ├── HeroSection.vue    # 屏首巨幕
│   │   │   ├── FeatureSection.vue # 左右图文交错特色展示
│   │   │   ├── FeaturesGrid.vue   # 核心优势网格
│   │   │   ├── TeamSection.vue    # 师资力量/团队介绍
│   │   │   ├── StatsSection.vue   # 数据实力指标条
│   │   │   ├── PricingSection.vue # 价格订阅卡片
│   │   │   ├── FaqSection.vue     # 折叠风琴式常见问题
│   │   │   ├── CtaSection.vue     # 底部转化呼吁
│   │   │   ├── PageFooter.vue     # 页脚版权信息
│   │   │   └── FeedbackModal.vue  # 全局交互反馈弹窗
│   │   └── QiZhi.vue       # 落地页主控页面，负责状态管理与数据分发
│   ├── directives/
│   │   └── reveal.ts       # 滚动渐现动效自定义指令 (v-reveal)
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── style.css           # 全局样式与自定义主题变量定义
├── index.html
├── package.json
└── tsconfig.json
```

## 🚀 快速开始

### 1. 安装依赖

本项目推荐使用 `pnpm` 进行包管理：

```bash
pnpm install
```

### 2. 启动本地开发服务

```bash
pnpm dev
```

启动后访问控制台输出的本地服务地址（如 `http://localhost:5173/`）。

### 3. 构建生产环境产物

```bash
pnpm build
```

### 4. 预览生产环境产物

```bash
pnpm preview
```

## 💡 开发与定制指南

### 1. 修改页面内容与文案

如需更新页面文字、价格方案或 FAQ，无需修改任何 Vue 代码，直接编辑
[page-data.json](file:///Users/devlink/code/study/qizhi-cloud-website/public/api/page-data.json)
即可。例如：

- 修改 `hero` 节点下的 `title` 改变首屏大标题。
- 在 `pricing.plans` 中增加或删除价格方案。

### 2. 使用滚动渐现指令 `v-reveal`

页面上任何元素都可以通过绑定 `v-reveal` 来实现平滑的滚动渐现效果：

```html
<!-- 最简用法：默认向上平移渐现 -->
<div v-reveal>...</div>

<!-- 高级配置：设置缩放(zoom)动画，延迟 200ms，持续 800ms -->
<div v-reveal="{ animation: 'zoom', delay: 200, duration: 800 }">...</div>

<!-- 方向配置：从左向右平移，偏移距离 50px -->
<div v-reveal="{ direction: 'right', distance: '50px' }">...</div>
```

### 3. 注册额外的自定义主题

如果想添加一个全新的自定义主题，您可以在
[main.ts](file:///Users/devlink/code/study/qizhi-cloud-website/src/main.ts)
中注册 `themePlugin` 时，通过 `extraThemes`
选项传入自定义的主题配置（包含明暗模式下的配色、圆角及字体等）：

```typescript
app.use(themePlugin, {
  defaultTheme: "theme",
  extraThemes: {
    sunset: {
      name: "sunset",
      light: {
        background: "oklch(0.98 0.02 80)",
        foreground: "oklch(0.15 0.05 40)",
        primary: "oklch(0.65 0.22 45)", // 亮橘色
        "primary-foreground": "oklch(0.99 0.01 90)",
        border: "oklch(0.92 0.02 80)",
        radius: "0.5rem",
        "font-sans": "sans-serif",
        // ... 更多语义化颜色
      },
      dark: {
        background: "oklch(0.15 0.05 40)",
        foreground: "oklch(0.98 0.02 80)",
        primary: "oklch(0.70 0.20 45)",
        "primary-foreground": "oklch(0.15 0.05 40)",
        border: "oklch(0.25 0.04 40)",
        radius: "0.5rem",
        "font-sans": "sans-serif",
        // ... 更多语义化颜色
      },
    },
  },
});
```

注册完成后，新的自定义主题将自动同步并显示在顶部导航栏的主题选择列表中。
