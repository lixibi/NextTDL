# Next.js Todo List 应用

一个使用 Next.js 和 Upstash Redis 构建的现代化待办事项清单应用。

## 概述

这是一个 Serverless 架构的待办事项清单应用，使用 Next.js 与 Upstash Redis 实现数据持久化存储。具有实时更新功能和清晰响应式的界面。

## 环境要求

- Node.js 16.x 或更高版本
- Upstash Redis 数据库
- Vercel 账号（用于部署）

## 数据库设置

1. 在 [Upstash]或者 Vercel (https://upstash.com/) 创建一个新的 Redis 数据库
2. 在 Upstash 控制面板中可以找到两种连接格式：

   **Redis 连接字符串（用于应用程序）：**
   ```
   rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   ```

   **Redis CLI（用于命令行测试）：**
   ```bash
   redis-cli -u rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   # 或使用 TLS 连接
   redis-cli --tls -u rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   ```

## 安装步骤

1. 克隆仓库
2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
```bash
cp .env.example .env.local
```

4. 在 `.env.local` 文件中设置 Upstash Redis 连接 URL：
```env
REDIS_URL=你的_UPSTASH_REDIS_URL
```

## 本地运行

```bash
npm run dev
```

应用将在 `http://localhost:3000` 上运行

## Vercel 部署

1. 在 [Vercel](https://vercel.com) 导入此项目
2. 在项目设置中添加环境变量 `REDIS_URL`
3. 部署完成后即可访问

## 功能特性

- 创建、读取、更新和删除待办事项
- 使用 Upstash Redis 实现数据持久化
- 完全 Serverless 架构
- 响应式设计
- 简单直观的界面
- 实时任务状态更新
- 任务截止时间和进度显示

## 技术栈

- Next.js 14+
- Upstash Redis
- Tailwind CSS
- TypeScript
- Vercel

## 许可证

MIT 