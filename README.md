# Task Management System

Ứng dụng quản lý công việc (Task Manager) xây dựng bằng **React (Vite)** và **JSON Server**.
Hỗ trợ đăng nhập, xem/thêm/sửa/xoá nhiệm vụ, gán ưu tiên, danh mục, ngày hạn và cập nhật trạng thái.

---

## Demo

- **Website (Vercel):** <https://task-management-app-gamma-three.vercel.app>
- **API (Render):** <https://task-management-app-nzra.onrender.com>
- **Proxy tại FE:** mọi request dùng `/api/...` (Vercel serverless proxy sang Render).

### Tài khoản demo

- **Admin:** `admin / 123456`
- **User:** `user / 123456`

---

## Tính năng

- 🔐 **Authentication** (Login/Logout)
- ✅ **CRUD Tasks**: tạo, cập nhật, xoá, đổi trạng thái
- 🏷️ **Danh mục (Categories)** & **độ ưu tiên**
- 📅 **Due date** + trạng thái: Chờ xử lý / Đang thực hiện / Hoàn thành
- 🧪 **Form validation** cơ bản
- 📱 **Responsive UI/UX** (mobile / tablet / desktop)
- 🌙 **(Tuỳ chọn)** Dark mode qua CSS `prefers-color-scheme`

---

## Kiến trúc & Công nghệ

- **React 18 + Vite**
- **TypeScript**
- **JSON Server** (mock API)
- **Vercel** (FE + serverless function **/api** proxy)
- **Render** (host JSON Server)
- **CSS/utility styles** (+ có thể Styled Components/Tailwind nếu cấu hình)

---

## Cấu trúc thư mục

task-management-app/
├── README.md
├── package.json
├── vercel.json
├── db.json
├── api/
│ └── [...path].js # Serverless /api/\* → Render
├── public/ # static assets
├── src/
│ ├── main.tsx
│ ├── App.tsx
│ ├── pages/
│ │ ├── LoginPage.tsx
│ │ ├── TasksPage.tsx
│ │ └── CategoriesPage.tsx
│ ├── modules/
│ │ └── auth/ # AuthContext, hooks…
│ ├── services/
│ │ ├── http.ts # API_URL lấy từ VITE_API_URL (mặc định /api)
│ │ ├── usersAPI.ts
│ │ └── tasksAPI.ts
│ └── styles/ # CSS
└── screenshots/
├── login.png
├── dashboard.png
├── task-form.png
└── mobile.png

> **Lưu ý:** thư mục `api/` phải ở **root** để Vercel build serverless function.

---

## Cài đặt & Chạy dự án (Local)

### Yêu cầu

- **Node.js ≥ 18**
- **npm** hoặc **yarn**

### Cài đặt

```bash
git clone <repo-url>
cd task-management-app
npm install
```

### Chạy local (2 terminal)

```bash
# Terminal 1: JSON Server (port 3001)
npm run server
# hoặc:
# json-server --watch db.json --port 3001

# Terminal 2: React app (Vite)
npm run dev
```

Mặc định FE gọi `/api`. Khi chạy local (không có function proxy), bạn có 2 lựa chọn:

1. Tạo `.env.local`:

   ```bash
   VITE_API_URL=http://localhost:3001
   ```

2. Hoặc tự setup reverse-proxy `/api` tương ứng.

---

## Build & Deploy

1. **FE (Vercel)**

   - Kết nối GitHub → Import project.
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Environment Variables:**
     - `VITE_API_URL = /api`
     - `RENDER_API_URL = https://task-management-app-nzra.onrender.com`
   - `vercel.json` (tránh 404 khi refresh SPA):

     ```json
     {
       "cleanUrls": true,
       "rewrites": [{ "source": "/(.*)", "destination": "/" }]
     }
     ```

2. **API (Render)**

   - Service Node + `json-server`
   - `package.json`:

     ```json
     {
       "scripts": {
         "start": "json-server --host 0.0.0.0 --watch db.json --port $PORT"
       },
       "dependencies": {
         "json-server": "^0.17.4"
       }
     }
     ```

   - Deploy và lấy **External URL**: `https://task-management-app-nzra.onrender.com`

---

## Biến môi trường

| Key              | Giá trị (Production)                            | Ghi chú                                 |
| ---------------- | ----------------------------------------------- | --------------------------------------- |
| `VITE_API_URL`   | `/api`                                          | FE gọi `/api` để proxy qua Vercel       |
| `RENDER_API_URL` | `https://task-management-app-nzra.onrender.com` | Serverless function forward sang Render |

> Đổi ENV xong cần **Redeploy** Vercel để build nhận giá trị mới.

---

## API mẫu

- `GET /users`
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Ví dụ đăng nhập (demo):

```http
GET /api/users?username=admin&password=123456
```

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001"
  }
}

```

## Submission Checklist

- [ ] Tất cả chức năng **CRUD** hoạt động
- [ ] **Authentication** chạy ổn
- [ ] **Form validation** đầy đủ
- [ ] **Responsive** trên mobile/desktop
- [ ] **Error handling** hợp lý
- [ ] **Code clean** & organized
- [ ] **Advance feature** (nếu có) hoạt động
- [ ] **Deploy** thành công (Vercel + Render)
- [ ] **README.md** đầy đủ
- [ ] **Screenshots** đính kèm

---

## Troubleshooting

- **`/api/*` trên Vercel trả 404** → thiếu `api/[...path].js` ở **root** hoặc chưa redeploy.
- **FE vẫn gọi `https://<task-api>`** → sửa `VITE_API_URL=/api` và **dùng** `API_URL` trong code, không hard-code; redeploy lại.
- **Render 404** → kiểm tra `db.json` và script `start`, redeploy Render.

---

## Tác giả

- **Học viên:** _Nguyễn Đức Anh Tài_
- **Liên hệ:** _anhtai9712@gmail.com_

---

## License

MIT
