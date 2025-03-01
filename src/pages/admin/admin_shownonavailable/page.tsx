import React from "react";
import NotAvailableTimes from "./component/boxshow";

const AdminshowNotAvai: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-10">Non-Available Times</h1>
      <div className="w-full max-w-7xl mx-auto">
        <NotAvailableTimes />
      </div>
    </div>
  );
};

export default AdminshowNotAvai;
