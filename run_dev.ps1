# Khởi động đồng thời cả Backend (FastAPI) và Frontend (Next.js)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Khởi động Hệ thống PhysiX FullStack (Backend + Frontend)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Start Backend in a background process
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd backend; .\.venv\Scripts\uvicorn app.main:app --reload --port 8000"

# Start Frontend in a background process
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nĐã khởi động cả 2 dịch vụ:" -ForegroundColor Green
Write-Host " - Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host " - Backend API: http://localhost:8000 (Swagger docs: http://localhost:8000/docs)" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
