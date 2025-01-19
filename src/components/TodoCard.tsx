import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useState, useMemo } from 'react';
import TodoDetailModal from './TodoDetailModal';

interface TodoCardProps {
  id: string;
  title: string;
  content: string;
  deadline: string;
  createdAt: string;
  completed: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoCard({
  id,
  title,
  content,
  deadline,
  createdAt,
  completed,
  onComplete,
  onDelete
}: TodoCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 计算剩余时间和进度
  const { progress, timeLeft, isOverdue } = useMemo(() => {
    const now = moment();
    const deadlineTime = moment(deadline);
    const createdTime = moment(parseInt(createdAt));
    const totalDuration = moment.duration(deadlineTime.diff(createdTime));
    const remainingDuration = moment.duration(deadlineTime.diff(now));
    
    // 计算进度百分比
    const progressValue = Math.max(0, Math.min(100, 
      (1 - remainingDuration.asMilliseconds() / totalDuration.asMilliseconds()) * 100
    ));

    // 判断是否已过期
    const isOverdueValue = now.isAfter(deadlineTime);

    // 格式化剩余时间
    let timeLeftText = '';
    if (isOverdueValue) {
      timeLeftText = '已过期';
    } else if (remainingDuration.asDays() > 1) {
      timeLeftText = `剩余 ${Math.ceil(remainingDuration.asDays())} 天`;
    } else if (remainingDuration.asHours() > 1) {
      timeLeftText = `剩余 ${Math.ceil(remainingDuration.asHours())} 小时`;
    } else {
      timeLeftText = `剩余 ${Math.ceil(remainingDuration.asMinutes())} 分钟`;
    }

    return {
      progress: progressValue,
      timeLeft: timeLeftText,
      isOverdue: isOverdueValue
    };
  }, [deadline, createdAt]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) {
      setIsDetailOpen(true);
    }
  };

  // 根据截止时间状态返回颜色类名
  const getStatusColors = () => {
    if (completed) {
      return 'from-gray-50 to-gray-50 border-gray-200';
    }
    if (isOverdue) {
      return 'from-red-50 to-rose-50 border-red-100';
    }
    if (progress > 75) {
      return 'from-amber-50 to-yellow-50 border-yellow-100';
    }
    return 'from-emerald-50 to-green-50 border-green-100';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={`relative p-5 rounded-xl bg-gradient-to-br ${getStatusColors()} 
          border hover:shadow-xl transition-all duration-300 group`}
        onClick={handleCardClick}
      >
        {/* 顶部渐变条 - 根据状态改变颜色 */}
        <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r 
          ${completed 
            ? 'from-gray-200 to-gray-300'
            : isOverdue
              ? 'from-red-500 to-rose-500'
              : progress > 75
                ? 'from-amber-500 to-yellow-500'
                : 'from-emerald-500 to-green-500'
          } opacity-0 group-hover:opacity-100 transition-opacity`} 
        />
        
        <div className="space-y-3">
          {/* 标题和按钮 */}
          <div className="flex items-start justify-between gap-4">
            <h3 className={`text-base font-semibold truncate ${
              completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <div className="flex space-x-1 flex-shrink-0">
              <button
                onClick={() => onComplete(id)}
                className={`p-1.5 rounded-full transition-colors ${
                  completed 
                    ? 'text-green-600 hover:bg-white/60' 
                    : 'text-gray-400 hover:bg-white/60'
                }`}
              >
                <CheckCircleIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-white/60 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 内容 */}
          <p className={`text-sm line-clamp-2 ${
            completed ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {content}
          </p>

          {/* 时间和进度信息 */}
          {!completed && (
            <div className="pt-1">
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center text-gray-500 min-w-0">
                  <ClockIcon className="h-4 w-4 flex-shrink-0 mr-1" />
                  <span className="truncate">{moment(deadline).format('MM-DD HH:mm')}</span>
                </div>
                <span className={`flex-shrink-0 font-medium ml-2 ${
                  isOverdue 
                    ? 'text-red-600' 
                    : progress > 75 
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                }`}>
                  {timeLeft}
                </span>
              </div>
              
              {/* 进度条 - 半透明背景 */}
              <div className="h-1 w-full bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverdue 
                      ? 'bg-gradient-to-r from-red-500 to-rose-500' 
                      : progress > 75 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-green-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <TodoDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        todo={{
          id,
          title,
          content,
          deadline,
          createdAt,
          completed,
        }}
      />
    </>
  );
} 