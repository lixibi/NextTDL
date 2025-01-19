import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error('REDIS_URL environment variable is not defined');
}

// 创建 Redis 客户端单例
let client: ReturnType<typeof createClient> | null = null;

async function getClient() {
  if (!client) {
    client = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
      },
    });

    client.on('error', (error: Error) => console.error('Redis Client Error', error));
    await client.connect();
  }
  return client;
}

interface Todo {
  id: string;
  title: string;
  content: string;
  deadline: string;
  created_at: string;
  completed: boolean;
}

// GET /api/todos
export async function GET() {
  try {
    const redis = await getClient();
    const keys = await redis.keys('hebeos:notes:*');
    
    const todos = await Promise.all(
      keys.map(async (key: string) => {
        const data = await redis.get(key);
        if (!data) return null;
        
        const todo = JSON.parse(data);
        return {
          ...todo,
          id: key.split(':').pop() || todo.id || Date.now().toString(),
          completed: Boolean(todo.completed),
          created_at: todo.created_at || Date.now().toString(),
        };
      })
    );
    
    return NextResponse.json(
      todos.filter((todo): todo is Todo => 
        todo !== null && 
        typeof todo === 'object' && 
        typeof todo.id === 'string'
      )
    );
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(request: Request) {
  try {
    const todo = await request.json();
    const id = Date.now().toString();
    const todoData = {
      ...todo,
      id,
      created_at: id,
    };
    
    const redis = await getClient();
    await redis.set(
      `hebeos:notes:${id}`,
      JSON.stringify(todoData)
    );
    
    return NextResponse.json(todoData);
  } catch (error) {
    console.error('Failed to create todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

// PUT /api/todos/:id
export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    
    const redis = await getClient();
    const data = await redis.get(`hebeos:notes:${id}`);
    if (!data) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    const oldTodo = JSON.parse(data);
    const updatedTodo = {
      ...oldTodo,
      ...updates,
      id,
    };
    
    await redis.set(
      `hebeos:notes:${id}`,
      JSON.stringify(updatedTodo)
    );
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Failed to update todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

// DELETE /api/todos/:id
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    const redis = await getClient();
    await redis.del(`hebeos:notes:${id}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
} 