"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Bell, Sparkles, BookOpen, Activity, Cpu, Award, Sun, Moon, School, Calculator } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Trang chủ", href: "/", icon: BookOpen },
    { label: "Công thức KHTN", href: "/formulas", icon: Calculator },
    { label: "Thí nghiệm ảo", href: "/lab", icon: Activity },
    { label: "Cảm biến IoT", href: "/iot", icon: Cpu },
    { label: "Ôn thi vào 10", href: "/quiz", icon: Award },
    { label: "Gia sư AI", href: "/ai-tutor", icon: Sparkles },
    { label: "Tiến độ", href: "/progress", icon: Activity },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-lg shadow-sm">
              Ψ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                PhysiX
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase -mt-1">
                KHTN &amp; Vật Lý THCS (6-9)
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Chuyển chế độ sáng tối"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === "light" ? "Chuyển sang Giao diện Tối" : "Chuyển sang Giao diện Sáng"}
          >
            {theme === "light" ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300">7 ngày</span>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Minh Anh</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Học sinh Lớp 9 KHTN
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
              MA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
