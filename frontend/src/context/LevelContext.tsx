"use client";

import React, { createContext, useContext, useState } from "react";

export type EducationLevel = "thcs";

interface LevelContextType {
  level: EducationLevel;
  setLevel: (lvl: EducationLevel) => void;
  toggleLevel: () => void;
}

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export function LevelProvider({ children }: { children: React.ReactNode }) {
  // Cố định chuyên sâu 100% cho THCS (KHTN Lớp 6 - 9)
  const [level] = useState<EducationLevel>("thcs");

  const setLevel = (_lvl: EducationLevel) => {
    // Luôn giữ mức THCS
  };

  const toggleLevel = () => {
    // Cố định THCS
  };

  return (
    <LevelContext.Provider value={{ level, setLevel, toggleLevel }}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within a LevelProvider");
  }
  return context;
}
