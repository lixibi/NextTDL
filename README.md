# Next.js Todo List Application

A simple and efficient Todo List application built with Next.js and Redis.

[中文文档](./README_zh.md)

## Overview

This is a modern Todo List application that demonstrates the integration of Next.js with Redis for data persistence. It features real-time updates and a clean, responsive interface.

## Prerequisites

- Node.js 16.x or higher
- Redis server
- Webdis server

## Setup Webdis

1. Install Webdis on your server
2. Configure Webdis by editing the `webdis.json` configuration file
3. Ensure Webdis is running and accessible

Example Webdis configuration:

{
    "redis_host": "127.0.0.1",
    "redis_port": 6379,
    "http_host": "127.0.0.1",
    "http_port": 7379,
    "threads": 5,
    "pool_size": 20
}

## Installation

1. Clone the repository
2. Install dependencies:

npm install

3. Configure your environment variables:

cp .env.example .env.local

4. Update the `.env.local` file with your Webdis server URL

## Running the Application

npm run dev

The application will be available at `http://localhost:3000`

## Features

- Create, read, update, and delete todos
- Real-time updates using Redis
- Responsive design
- Simple and intuitive interface

## License

MIT
