import { useEffect, useState } from 'react';
import { taskAPI } from '../../api/taskAPI';
import ErrorMessage from '../Common/ErrorMessage';
import LoadingSpinner from '../Common/LoadingSpinner';
import TaskList from './TaskList';

const TaskManagement = ({ user, data }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);
    let result;

    if (user.role === 'admin') {
      result = await taskAPI.getAllTasks();
    } else {
      result = await taskAPI.getTasksByUser(user.id);
    }

    if (result.success) {
      setTasks(result.tasks);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      ...taskData,
      userId: user.id,
    };
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const result = await taskAPI.updateTaskStatus(taskId, newStatus);
    if (result.success) {
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <TaskList
      tasks={tasks}
      categories={data.categories}
      users={data.users}
      onAddTask={handleAddTask}
      onStatusChange={handleStatusChange}
    />
  );
};

export default TaskManagement;
