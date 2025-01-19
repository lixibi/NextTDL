import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import moment from 'moment';

interface TodoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: {
    id: string;
    title: string;
    content: string;
    deadline: string;
    createdAt: string;
    completed: boolean;
  };
}

export default function TodoDetailModal({ isOpen, onClose, todo }: TodoDetailModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    {todo.title}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">任务内容</div>
                    <p className="text-gray-700 whitespace-pre-wrap">{todo.content}</p>
                  </div>

                  <div className="flex space-x-6 text-sm text-gray-500">
                    <div>
                      截止时间: {moment(todo.deadline).format('YYYY-MM-DD HH:mm')}
                    </div>
                    <div>
                      创建时间: {moment(parseInt(todo.createdAt)).format('YYYY-MM-DD HH:mm')}
                    </div>
                    <div>
                      状态: {todo.completed ? '已完成' : '进行中'}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 