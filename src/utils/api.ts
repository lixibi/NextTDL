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
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      return response.json();
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  },

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<void> {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...todo }),
    });
    
    if (!response.ok) throw new Error('Failed to update todo');
  },

  async deleteTodo(id: string): Promise<void> {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    
    if (!response.ok) throw new Error('Failed to delete todo');
  },
}; 