import React from "react";
import "../../styles/global.css";
export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--primary-color)] border-t-transparent"></div>
        <p className="mt-2 text-[var(--primary-color)]">
          กำลังโหลดข้อมูลวันหยุด...
        </p>
      </div>
    </div>
  );
};
