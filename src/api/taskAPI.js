// API cho quản lý nhiệm vụ
export const taskAPI = {
  // Lấy tất cả nhiệm vụ
  getAllTasks: async () => {
    try {
      const response = await fetch('/db.json');
      const data = await response.json();
      return { success: true, tasks: data.tasks };
    } catch (error) {
      return { success: false, message: 'Lỗi khi tải nhiệm vụ' };
    }
  },

  // Lấy nhiệm vụ theo user
  getTasksByUser: async (userId) => {
    try {
      const response = await fetch('/db.json');
      const data = await response.json();
      const userTasks = data.tasks.filter((task) => task.userId === userId);
      return { success: true, tasks: userTasks };
    } catch (error) {
      return { success: false, message: 'Lỗi khi tải nhiệm vụ' };
    }
  },

  // Cập nhật trạng thái nhiệm vụ
  updateTaskStatus: async (taskId, status) => {
    // Trong thực tế sẽ gọi API để cập nhật
    // Ở đây chỉ mô phỏng
    return { success: true, message: 'Cập nhật thành công' };
  },
};
