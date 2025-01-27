import React from "react";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50"
      onClick={onClose}
    >
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-lg font-bold text-black">ยืนยันการออกจากระบบ</h2>
          <p className="text-sm text-gray-600 mt-2">
            คุณต้องการที่จะออกจากระบบใช่หรือไม่?
          </p>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 text-sm font-medium text-white bg-[#943131] rounded-md hover:bg-[#B33D3D]"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};
