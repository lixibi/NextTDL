'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import TodoCard from '@/components/TodoCard';
import AddTodoModal from '@/components/AddTodoModal';
import LoginModal from '@/components/LoginModal';
import { api, Todo } from '@/utils/api';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: '' }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadTodos();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadTodos();
  };

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllTodos();
      const validTodos = data.filter(todo => todo.id);
      setTodos(validTodos.sort((a, b) => Number(b.created_at) - Number(a.created_at)));
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 对任务进行分组和排序
  const { activeTodos, completedTodos } = useMemo(() => {
    const active = todos.filter(todo => !todo.completed);
    const completed = todos.filter(todo => todo.completed);
    return {
      activeTodos: active.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
      completedTodos: completed.sort((a, b) => Number(b.created_at) - Number(a.created_at))
    };
  }, [todos]);

  const handleComplete = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await api.updateTodo(id, { completed: !todo.completed });
        await loadTodos();
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleAddTodo = async () => {
    await loadTodos();
    setIsAddModalOpen(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal isOpen={true} onSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="relative p-4 group">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            
            {/* 科技感装饰线条 */}
            <div className="absolute left-0 top-0 w-2 h-2 border-l-2 border-t-2 border-purple-500 opacity-50" />
            <div className="absolute right-0 bottom-0 w-2 h-2 border-r-2 border-b-2 border-blue-500 opacity-50" />
            
            {/* 动态光效 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 blur transition-all duration-500 rounded-lg" />

            {/* 内容区域 */}
            <div className="relative">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="mr-3">我的任务清单</span>
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              </h1>
              
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-gray-600">进行中: </span>
                  <span className="font-mono text-green-600 tabular-nums">
                    {String(activeTodos.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                  <span className="text-gray-600">已完成: </span>
                  <span className="font-mono text-gray-600 tabular-nums">
                    {String(completedTodos.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            添加任务
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">暂无任务，点击右上角添加新任务</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {activeTodos.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  进行中的任务
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      {...todo}
                      createdAt={todo.created_at}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </section>
            )}

            {completedTodos.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                  已完成的任务
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      {...todo}
                      createdAt={todo.created_at}
                      onComplete={handleComplete}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
      />
      
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
          },
        }}
      />
    </main>
  );
}
