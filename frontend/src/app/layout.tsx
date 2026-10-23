import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIFloatingTutor from "@/components/AIFloatingTutor";
import { ThemeProvider } from "@/context/ThemeContext";
import { LevelProvider } from "@/context/LevelContext";

export const metadata: Metadata = {
  title: "PhysiX - Cổng Học & Thực Nghiệm Vật Lý THCS (KHTN 6-9)",
  description: "Nền tảng học Khoa Học Tự Nhiên & Vật Lý THCS tương tác, thí nghiệm ảo Archimedes, Định luật Ôm, Thấu kính, kết nối cảm biến IoT và Trợ lý AI RAG SGK GDPT 2018.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light" style={{ colorScheme: "light" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
                localStorage.setItem('physix_theme', 'light');
              } catch (e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <ThemeProvider>
          <LevelProvider>
            <Navbar />
            <main className="flex-1 pt-16 bg-white">{children}</main>
            <Footer />
            <AIFloatingTutor />
          </LevelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
