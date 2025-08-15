const TaskItem = ({ task, onStatusChange, getCategoryName, getUserName }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#3b82f6';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return status;
    }
  };

  const getPriorityText = (priority) => {
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

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="status-badge" style={{ backgroundColor: getStatusColor(task.status) }}>
          {getStatusText(task.status)}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-details">
        <div className="detail-row">
          <span>Độ ưu tiên:</span>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {getPriorityText(task.priority)}
          </span>
        </div>
        <div className="detail-row">
          <span>Danh mục:</span>
          <span>{getCategoryName(task.categoryId)}</span>
        </div>
        <div className="detail-row">
          <span>Người thực hiện:</span>
          <span>{getUserName(task.userId)}</span>
        </div>
      </div>
      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}>
          <option value="pending">Chờ xử lý</option>
          <option value="in-progress">Đang thực hiện</option>
          <option value="completed">Hoàn thành</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
