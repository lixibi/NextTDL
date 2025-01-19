# Next.js Todo List 应用

一个使用 Next.js 和 Redis 构建的简洁高效的待办事项清单应用。

## 概述

这是一个现代化的待办事项清单应用，展示了 Next.js 与 Redis 的集成实现数据持久化存储。具有实时更新功能和清晰响应式的界面。

## 环境要求

- Node.js 16.x 或更高版本
- Redis 服务器
- Webdis 服务器

## Webdis 设置

1. 在服务器上安装 Webdis
2. 通过编辑 `webdis.json` 配置文件来配置 Webdis
3. 确保 Webdis 正在运行且可访问

Webdis 配置示例：

{
    "redis_host": "127.0.0.1",
    "redis_port": 6379,
    "http_host": "127.0.0.1",
    "http_port": 7379,
    "threads": 5,
    "pool_size": 20
}

## 安装步骤

1. 克隆仓库
2. 安装依赖：

npm install

3. 配置环境变量：

cp .env.example .env.local

4. 更新 `.env.local` 文件中的 Webdis 服务器 URL

## 运行应用

npm run dev

应用将在 `http://localhost:3000` 上运行

## 功能特性

- 创建、读取、更新和删除待办事项
- 使用 Redis 实现实时更新
- 响应式设计
- 简单直观的界面

## 许可证

MIT 