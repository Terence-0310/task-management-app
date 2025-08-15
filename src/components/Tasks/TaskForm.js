import { useState } from 'react';

const TaskForm = ({ onSubmit, categories, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    categoryId: categories[0]?.id || 1,
    status: 'pending',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <h3>Thêm nhiệm vụ mới</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Độ ưu tiên:</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>
          <div className="form-group">
            <label>Danh mục:</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Thêm nhiệm vụ</button>
            <button type="button" onClick={onCancel}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
