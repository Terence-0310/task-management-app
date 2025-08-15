export function validateLogin(u: string, p: string) {
  const errors: Record<string, string> = {};
  if (!u.trim()) errors.username = 'Vui lòng nhập username';
  else if (u.trim().length < 3) errors.username = 'Tối thiểu 3 ký tự';
  if (!p.trim()) errors.password = 'Vui lòng nhập mật khẩu';
  else if (p.trim().length < 6) errors.password = 'Tối thiểu 6 ký tự';
  return errors;
}

const STATUS = ['todo', 'in-progress', 'completed'] as const;
const PRIORITY = ['low', 'medium', 'high'] as const;

export function validateTask(t: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
}) {
  const errors: Record<string, string> = {};
  if (!t.title?.trim()) errors.title = 'Bắt buộc';
  else if (t.title.length < 5 || t.title.length > 100) errors.title = '5–100 ký tự';
  if (t.description && t.description.length > 500) errors.description = '≤ 500 ký tự';
  if (!STATUS.includes(t.status as any)) errors.status = 'Giá trị không hợp lệ';
  if (!PRIORITY.includes(t.priority as any)) errors.priority = 'Giá trị không hợp lệ';
  if (!t.dueDate) errors.dueDate = 'Bắt buộc';
  else if (new Date(t.dueDate).getTime() < new Date().setHours(0, 0, 0, 0))
    errors.dueDate = 'Không được là ngày quá khứ';
  return errors;
}
