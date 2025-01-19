// 从环境变量获取 API 地址
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

if (!API_BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE environment variable is not defined');
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  deadline: string;
  created_at: string;
  completed: boolean;
}

export const api = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const res = await fetch(`${API_BASE}/KEYS/hebeos:notes:*`);
      const data = await res.json();
      const keys = data.KEYS || [];
      
      const todos = await Promise.all(
        keys.map(async (key: string) => {
          try {
            const res = await fetch(`${API_BASE}/GET/${key}`);
            const data = await res.json();
            const todo = JSON.parse(data.GET);
            
            return {
              ...todo,
              id: key.split(':').pop() || todo.id || Date.now().toString(),
              completed: Boolean(todo.completed),
              created_at: todo.created_at || Date.now().toString(),
            };
          } catch (error) {
            console.error(`Failed to fetch todo ${key}:`, error);
            return null;
          }
        })
      );
      
      return todos.filter((todo): todo is Todo => 
        todo !== null && 
        typeof todo === 'object' && 
        typeof todo.id === 'string'
      );
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  },

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const id = Date.now().toString();
    const todoData = {
      ...todo,
      id,
      created_at: id,
    };
    
    await fetch(
      `${API_BASE}/SET/hebeos:notes:${id}/${JSON.stringify(todoData)}`
    );
    
    return todoData as Todo;
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<void> {
    const res = await fetch(`${API_BASE}/GET/hebeos:notes:${id}`);
    const data = await res.json();
    const oldTodo = JSON.parse(data.GET);
    
    const updatedTodo = {
      ...oldTodo,
      ...todo,
      id,
    };
    
    await fetch(
      `${API_BASE}/SET/hebeos:notes:${id}/${JSON.stringify(updatedTodo)}`
    );
  },

  async deleteTodo(id: string): Promise<void> {
    await fetch(`${API_BASE}/DEL/hebeos:notes:${id}`);
  },
}; 