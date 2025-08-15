import { BarChart3, CheckCircle, Clock, Folder } from 'lucide-react';
import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  categoryId: number;
  userId: number;
}

interface CategoryListProps {
  categories: Category[];
  tasks: Task[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, tasks }) => {
  const getTasksByCategory = (categoryId: number) => {
    return tasks.filter((task) => task.categoryId === categoryId);
  };

  const getCompletedTasks = (categoryId: number) => {
    return tasks.filter((task) => task.categoryId === categoryId && task.status === 'completed');
  };

  const getCompletionRate = (categoryId: number) => {
    const categoryTasks = getTasksByCategory(categoryId);
    const completedTasks = getCompletedTasks(categoryId);

    if (categoryTasks.length === 0) return 0;
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Danh sách danh mục ({categories.length})
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const totalTasks = getTasksByCategory(category.id).length;
          const completedTasks = getCompletedTasks(category.id).length;
          const completionRate = getCompletionRate(category.id);

          return (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Folder className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{totalTasks} nhiệm vụ</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Tiến độ:</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{completedTasks}</p>
                      <p className="text-xs text-gray-500">Hoàn thành</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {totalTasks - completedTasks}
                      </p>
                      <p className="text-xs text-gray-500">Còn lại</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có danh mục nào</h3>
          <p className="text-gray-500">Danh sách danh mục sẽ hiển thị ở đây.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
