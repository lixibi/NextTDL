import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error('REDIS_URL environment variable is not defined');
}

const client = createClient({
  url: REDIS_URL
});

client.on('error', (error: Error) => console.error('Redis Client Error', error));

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
    await client.connect();
    const keys = await client.keys('hebeos:notes:*');
    
    const todos = await Promise.all(
      keys.map(async (key: string) => {
        const data = await client.get(key);
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
    
    await client.disconnect();
    
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
    
    await client.connect();
    await client.set(
      `hebeos:notes:${id}`,
      JSON.stringify(todoData)
    );
    await client.disconnect();
    
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
    
    await client.connect();
    const data = await client.get(`hebeos:notes:${id}`);
    if (!data) {
      await client.disconnect();
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    const oldTodo = JSON.parse(data);
    const updatedTodo = {
      ...oldTodo,
      ...updates,
      id,
    };
    
    await client.set(
      `hebeos:notes:${id}`,
      JSON.stringify(updatedTodo)
    );
    await client.disconnect();
    
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
    
    await client.connect();
    await client.del(`hebeos:notes:${id}`);
    await client.disconnect();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
} 