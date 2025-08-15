// API cho xác thực người dùng
export const authAPI = {
  // Đăng nhập
  login: async (username, password) => {
    try {
      const response = await fetch('/db.json');
      const data = await response.json();

      const user = data.users.find((u) => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
      } else {
        return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }
    } catch (error) {
      return { success: false, message: 'Lỗi kết nối' };
    }
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },
};
