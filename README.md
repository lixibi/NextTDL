# Next.js Todo List Application

A modern Todo List application built with Next.js and Upstash Redis, featuring a serverless architecture.

[中文文档](./README_zh.md)

## Overview

This is a serverless Todo List application that demonstrates the integration of Next.js with Upstash Redis for data persistence. It features real-time updates and a clean, responsive interface.

## Prerequisites

- Node.js 16.x or higher
- Upstash Redis database
- Vercel account (for deployment)

## Database Setup

1. Create a new Redis database at [Upstash](https://upstash.com/)
2. You can find two connection formats in your Upstash dashboard:

   **Redis Connection String (for application):**
   ```
   rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   ```

   **Redis CLI (for command line testing):**
   ```bash
   redis-cli -u rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   # or with TLS
   redis-cli --tls -u rediss://default:xxxxxxxxxxxx@xxx-xxx-xxxx.upstash.io:6379
   ```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure your environment variables:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your environment variables:
```env
# Redis Connection URL (required)
REDIS_URL=your_upstash_redis_url

# Access Password (optional)
CODE=your_access_password
```

## Access Control

The application supports optional password protection:

1. **Enable Password Protection**:
   - Set the `CODE` environment variable
   - Visitors must enter the correct password to access the application
   - Suitable for private access scenarios

2. **Disable Password Protection**:
   - Don't set the `CODE` variable
   - Visitors can access the application directly
   - Suitable for public access scenarios

## Local Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Vercel Deployment

1. Import this project to [Vercel](https://vercel.com)
2. Add environment variables in project settings:
   - `REDIS_URL`: Redis connection string
   - `CODE`: Access password (optional)
3. Deploy and access your application

## Features

- Create, read, update, and delete todos
- Data persistence with Upstash Redis
- Fully serverless architecture
- Responsive design
- Simple and intuitive interface
- Real-time task status updates
- Task deadline and progress tracking
- Optional password protection
- Elegant login interface

## Tech Stack

- Next.js 14+
- Upstash Redis
- Tailwind CSS
- TypeScript
- Vercel

## License

MIT
