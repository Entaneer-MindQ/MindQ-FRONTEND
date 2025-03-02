import React from "react";
import NotAvailableTimes from "./component/boxshow";
import "../../../styles/global.css";

const AdminshowNotAvai: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-var(--primary-color) to-white pl-24">
      {" "}
      {/* เพิ่ม pl-24 เพื่อเว้นระยะห่างด้านซ้าย */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <NotAvailableTimes />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-4">
          &copy; {new Date().getFullYear()} © 2025 Chiang Mai University. All
          rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminshowNotAvai;
