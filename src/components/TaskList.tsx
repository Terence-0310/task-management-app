import { AlertCircle, CheckCircle, Clock, Tag, User } from 'lucide-react';
import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  categoryId: number;
  userId: number;
}

interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  users: User[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, categories, users }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return 'Đang thực hiện';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Không xác định';
  };

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : 'Không xác định';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Danh sách nhiệm vụ ({tasks.length})</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
              <div className="flex items-center space-x-2 ml-2">{getStatusIcon(task.status)}</div>
            </div>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{task.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Trạng thái:</span>
                <span className="text-sm font-medium text-gray-900">
                  {getStatusText(task.status)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Độ ưu tiên:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityText(task.priority)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Danh mục:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {getCategoryName(task.categoryId)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Người thực hiện:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {getUserName(task.userId)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có nhiệm vụ nào</h3>
          <p className="text-gray-500">Hãy thêm nhiệm vụ đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
