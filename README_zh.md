# Next.js Todo List 应用

一个使用 Next.js 和 Upstash Redis 构建的现代化待办事项清单应用。

## 概述

这是一个 Serverless 架构的待办事项清单应用，使用 Next.js 与 Upstash Redis 实现数据持久化存储。具有实时更新功能和清晰响应式的界面。

## 环境要求

- Node.js 16.x 或更高版本
- Upstash Redis 数据库
- Vercel 账号（用于部署）

## 数据库设置

1. 在 [Upstash](https://upstash.com/) 创建一个新的 Redis 数据库
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

4. 在 `.env.local` 文件中设置环境变量：
```env
# Redis 连接 URL（必需）
REDIS_URL=你的_UPSTASH_REDIS_URL

# 访问密码（可选）
CODE=你的访问密码
```

## 访问控制

应用支持可选的密码访问控制：

1. **启用密码保护**：
   - 在环境变量中设置 `CODE` 变量
   - 访问者需要输入正确的密码才能访问应用
   - 适用于需要私密访问的场景

2. **不启用密码保护**：
   - 不设置 `CODE` 变量
   - 访问者可以直接访问应用
   - 适用于公开访问的场景

## 部署选项

### 本地开发

```bash
npm run dev
```

应用将在 `http://localhost:3000` 上运行

### Docker 部署

您可以通过两种方式使用 Docker 运行此应用：

1. **从 Docker Hub 拉取**：
```bash
docker pull your-username/nexttdl
docker run -d -p 3000:3000 \
  -e REDIS_URL=你的_REDIS_URL \
  -e CODE=你的访问密码 \
  your-username/nexttdl
```

2. **本地构建**：
```bash
docker build -t nexttdl .
docker run -d -p 3000:3000 \
  -e REDIS_URL=你的_REDIS_URL \
  -e CODE=你的访问密码 \
  nexttdl
```

### Vercel 部署

1. 在 [Vercel](https://vercel.com) 导入此项目
2. 在项目设置中添加环境变量：
   - `REDIS_URL`：Redis 连接字符串
   - `CODE`：访问密码（可选）
3. 部署完成后即可访问

## 持续集成/持续部署

本项目使用 GitHub Actions 实现自动化 Docker 镜像构建：

1. **自动构建触发条件**：
   - 推送到 `main` 分支时
   - 创建新的版本标签时（v*.*.*)
   - 创建 Pull Request 时进行测试构建

2. **Docker 标签策略**：
   - Latest：main 分支最新构建
   - 版本标签：发布版本（如 v1.0.0）
   - SHA 标签：特定提交的构建

3. **必要配置**：
   - 在 GitHub 仓库密钥中添加 `DOCKERHUB_USERNAME`
   - 在 GitHub 仓库密钥中添加 `DOCKERHUB_TOKEN`

## 功能特性

- 创建、读取、更新和删除待办事项
- 使用 Upstash Redis 实现数据持久化
- 完全 Serverless 架构
- 响应式设计
- 简单直观的界面
- 实时任务状态更新
- 任务截止时间和进度显示
- 可选的密码访问保护
- 优雅的登录界面
- Docker 支持和自动构建
- GitHub Actions 自动化部署

## 技术栈

- Next.js 14+
- Upstash Redis
- Tailwind CSS
- TypeScript
- Vercel
- Docker
- GitHub Actions

## 许可证

MIT 