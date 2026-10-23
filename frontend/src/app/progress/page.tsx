"use client";

import Link from "next/link";
import { Flame, TrendingUp, Clock, Activity, ArrowRight } from "lucide-react";

export default function ProgressPage() {
  const topics = [
    { name: "Định luật Ôm & Đoạn mạch nối tiếp, song song", grade: 9, mastery: 94, status: "Thành thạo" },
    { name: "Lực đẩy Ác-si-mét & Điều kiện vật chìm, nổi", grade: 8, mastery: 90, status: "Thành thạo" },
    { name: "Tác dụng làm quay của lực & Quy tắc đòn bẩy", grade: 8, mastery: 92, status: "Thành thạo" },
    { name: "Quang hình học - Thấu kính hội tụ & Sự tạo ảnh", grade: 9, mastery: 86, status: "Khá" },
    { name: "Tốc độ chuyển động & Đồ thị quãng đường (s-t)", grade: 7, mastery: 88, status: "Khá" },
    { name: "Khối lượng riêng, Trọng lượng & Biến dạng lò xo", grade: 6, mastery: 96, status: "Xuất sắc" },
  ];

  return (
    <div className="w-full bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              HỒ SƠ HỌC TẬP THCS
            </span>
            <span className="text-xs text-slate-500 font-medium">Theo khung năng lực KHTN THCS GDPT 2018</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Bảng Theo Dõi Tiến Độ &amp; Năng Lực Học Tập THCS
          </h1>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-semibold">
              <span>ĐIỂM NĂNG LỰC ƯỚC TÍNH</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 font-mono mt-2">
              9.1 <span className="text-xs font-normal text-slate-500">/ 10</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">▲ Tăng 0.5 điểm so với bài kiểm tra trước</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-semibold">
              <span>CHUỖI HỌC TẬP (STREAK)</span>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-mono mt-2">
              7 <span className="text-xs font-normal text-slate-500">ngày liên tiếp</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Mục tiêu: Duy trì chuỗi 14 ngày</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-semibold">
              <span>THÍ NGHIỆM ĐÃ LÀM</span>
              <Activity className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 font-mono mt-2">
              12 <span className="text-xs font-normal text-slate-500">bài thực hành</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Hoàn thành cả 4 phòng thực nghiệm ảo</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-semibold">
              <span>THỜI LƯỢNG ÔN TẬP</span>
              <Clock className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-800 font-mono mt-2">
              24.5 <span className="text-xs font-normal text-slate-500">giờ</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Trung bình 1.2h / ngày</div>
          </div>
        </div>

        {/* Topic Mastery Progress Bars */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Mức Độ Nắm Vững Kiến Thức Theo Chuyên Đề KHTN (Vật Lý THCS)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Phân tích từ ngân hàng đề thi khảo sát vào 10 THCS và bài thực hành tương tác
              </p>
            </div>
            <Link
              href="/quiz"
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Luyện đề bổ trợ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 mt-6">
            {topics.map((t, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono font-bold text-[10px] mr-2">
                      Lớp {t.grade}
                    </span>
                    {t.name}
                  </span>
                  <span className="font-mono font-bold text-emerald-700">{t.mastery}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${t.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
