import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, categories, users, onAddTask, onStatusChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Không xác định';
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : 'Không xác định';
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const handleAddTask = (taskData) => {
    onAddTask(taskData);
    setShowForm(false);
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Danh sách nhiệm vụ ({filteredTasks.length})</h2>
        <div className="task-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xử lý</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
          </select>
          <button onClick={() => setShowForm(true)} className="add-task-btn">
            + Thêm nhiệm vụ
          </button>
        </div>
      </div>

      <div className="tasks-grid">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            getCategoryName={getCategoryName}
            getUserName={getUserName}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          categories={categories}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
