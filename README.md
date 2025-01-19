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

## Deployment Options

### Local Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Docker Deployment

You can run this application using Docker in two ways:

1. **Pull from Docker Hub**:
```bash
docker pull your-username/nexttdl
docker run -d -p 3000:3000 \
  -e REDIS_URL=your_redis_url \
  -e CODE=your_access_code \
  your-username/nexttdl
```

2. **Build Locally**:
```bash
docker build -t nexttdl .
docker run -d -p 3000:3000 \
  -e REDIS_URL=your_redis_url \
  -e CODE=your_access_code \
  nexttdl
```

### Vercel Deployment

1. Import this project to [Vercel](https://vercel.com)
2. Add environment variables in project settings:
   - `REDIS_URL`: Redis connection string
   - `CODE`: Access password (optional)
3. Deploy and access your application

## CI/CD

This project includes automated Docker image builds using GitHub Actions:

1. **Automatic Builds**: 
   - Triggers on pushes to `main` branch
   - Triggers on new version tags (v*.*.*)
   - Builds and tests on pull requests

2. **Docker Tags**:
   - Latest: Most recent build from main
   - Version tags: Releases (e.g., v1.0.0)
   - SHA tags: Commit specific builds

3. **Setup Required**:
   - Add `DOCKERHUB_USERNAME` to GitHub repository secrets
   - Add `DOCKERHUB_TOKEN` to GitHub repository secrets

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
- Docker support with automated builds
- CI/CD with GitHub Actions

## Tech Stack

- Next.js 14+
- Upstash Redis
- Tailwind CSS
- TypeScript
- Vercel
- Docker
- GitHub Actions

## License

MIT
