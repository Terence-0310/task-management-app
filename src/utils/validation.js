export const validateLogin = ({ username, password }) => {
  const errors = {};
  if (!username?.trim()) errors.username = 'Username là bắt buộc';
  else if (username.length < 3) errors.username = 'Ít nhất 3 ký tự';
  if (!password) errors.password = 'Password là bắt buộc';
  else if (password.length < 6) errors.password = 'Ít nhất 6 ký tự';
  return errors;
};

export const validateTask = (data) => {
  const e = {};
  const len = (s = '') => s.trim().length;
  if (!data.title?.trim()) e.title = 'Tiêu đề là bắt buộc';
  else if (len(data.title) < 5) e.title = 'Tối thiểu 5 ký tự';
  else if (len(data.title) > 100) e.title = 'Tối đa 100 ký tự';
  if (data.description && data.description.length > 500) e.description = 'Tối đa 500 ký tự';
  if (!['todo', 'in-progress', 'completed'].includes(data.status))
    e.status = 'Trạng thái không hợp lệ';
  if (!['low', 'medium', 'high'].includes(data.priority)) e.priority = 'Độ ưu tiên không hợp lệ';
  if (!data.dueDate) e.dueDate = 'Ngày hạn là bắt buộc';
  else {
    const d = new Date(data.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) e.dueDate = 'Không chọn ngày quá khứ';
  }
  return e;
};
