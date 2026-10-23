# Hướng Dẫn Triển Khai Thực Tế Website: THCS-Tan-Tien

Dự án **PhysiX THCS — Phòng Thí Nghiệm & Học Tập KHTN Vật Lý** gồm 2 phần:
- **Frontend:** Next.js (chứa 14 bài thí nghiệm mô phỏng tương tác cao, công thức KaTeX, luyện tập trắc nghiệm).
- **Backend:** FastAPI (Python RAG AI Tutor với Gemini API & Vernier IoT).

Để đưa dự án lên mạng Internet thực tế hoàn toàn **MIỄN PHÍ** với tên miền **`thcs-tan-tien.vercel.app`** (và có thể gắn tên miền riêng của trường như `thcstantien.edu.vn`), thực hiện theo 2 bước sau:

---

## BƯỚC 1: Triển Khai Frontend Lên Vercel (Tên miền `thcs-tan-tien.vercel.app`)

Vercel là nền tảng tối ưu nhất cho Next.js, miễn phí trọn đời, tự động có chứng chỉ bảo mật HTTPS/SSL và CDN toàn cầu.

### Cách 1: Deploy qua GitHub (Khuyên Dùng - Tự động cập nhật mỗi khi sửa code)
1. Đưa thư mục dự án lên tài khoản GitHub của bạn (hoặc của trường):
   ```bash
   git init
   git add .
   git commit -m "Khoi tao PhysiX THCS Tan Tien"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/PhysiX-THCS-Tan-Tien.git
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Bấm **"Add New..."** $\to$ Chọn **"Project"** $\to$ Chọn repository `PhysiX-THCS-Tan-Tien`.
4. Trong phần cấu hình:
   - **Root Directory:** Bấm Edit và chọn thư mục `frontend`.
   - **Framework Preset:** Next.js (tự động nhận diện).
   - **Project Name:** Nhập `thcs-tan-tien`.
   - **Environment Variables:**
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: URL Backend của bạn (ví dụ `https://thcs-tan-tien-api.onrender.com` hoặc để trống nếu chưa deploy backend).
5. Bấm nút **"Deploy"**. Sau khoảng 1 phút, website sẽ hoạt động chính thức tại:
   👉 **`https://thcs-tan-tien.vercel.app`**

### Cách 2: Deploy trực tiếp bằng lệnh Vercel CLI (Không cần GitHub)
1. Mở PowerShell trong thư mục `frontend`:
   ```bash
   cd frontend
   npx vercel
   ```
2. Đăng nhập tài khoản Vercel trên trình duyệt khi được yêu cầu.
3. Khi Vercel hỏi:
   - *Set up and deploy?* $\to$ Gõ `y`
   - *Which scope?* $\to$ Chọn tài khoản của bạn
   - *Link to existing project?* $\to$ Gõ `n`
   - *What's your project's name?* $\to$ Gõ `thcs-tan-tien`
   - *In which directory is your code located?* $\to$ Gõ `./`
4. Để xuất bản bản chính thức (Production), chạy tiếp:
   ```bash
   npx vercel --prod
   ```

---

## BƯỚC 2: Triển Khai Backend Lên Render (Miễn Phí)

Backend FastAPI phục vụ tính năng Trợ lý AI Gia sư (RAG) và kết nối IoT Vernier.

1. Truy cập [render.com](https://render.com) và đăng nhập (bằng GitHub).
2. Bấm **"New +"** $\to$ Chọn **"Web Service"**.
3. Kết nối với GitHub repo của bạn.
4. Cấu hình thông số:
   - **Name:** `thcs-tan-tien-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables:**
     - `GEMINI_API_KEY`: *(Nhập mã Gemini API Key của bạn từ Google AI Studio)*
5. Bấm **"Create Web Service"**. Sau khi build xong, bạn sẽ có link Backend:
   👉 **`https://thcs-tan-tien-api.onrender.com`**

*(Sau đó vào lại Vercel $\to$ Project Settings $\to$ Environment Variables $\to$ Cập nhật `NEXT_PUBLIC_API_URL` thành link Render trên).*

---

## BƯỚC 3: Gắn Tên Miền Riêng Của Trường (Tùy Chọn)
Nếu nhà trường đã có tên miền riêng (ví dụ: `thcstantien.edu.vn` hoặc `thcs-tan-tien.com`):
1. Vào trang quản trị dự án trên Vercel: **Settings** $\to$ **Domains**.
2. Nhập tên miền (ví dụ: `thcstantien.edu.vn` hoặc `hoclieu.thcstantien.edu.vn`).
3. Vercel sẽ cung cấp bản ghi DNS:
   - **Type A:** Trỏ về IP `76.76.21.21`
   - Hoặc **CNAME:** Trỏ về `cname.vercel-dns.com`
4. Đăng nhập vào trang quản trị tên miền của trường (Mắt Bão, PA Việt Nam, Cloudflare, Viettel...) và thêm bản ghi trên. Vercel sẽ tự động kích hoạt HTTPS SSL miễn phí sau vài phút!
