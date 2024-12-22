import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  month: string;
  date: number;
}

const ConfirmBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    timeSlot: "",
    categories: [] as string[],
    details: "",
  });

  // Check for required data from calendar
  useEffect(() => {
    const state = location.state as LocationState;
    if (!state?.month || !state?.date) {
      navigate("/case");
    }
  }, [location.state, navigate]);

  // Available time slots
  const timeSlots = ["09.00", "10.00", "11.00", "13.00", "14.00", "15.00"];

  // Available categories
  const availableCategories = [
    "การเรียน",
    "ความเครียด",
    "ความสัมพันธ์",
    "ครอบครัว",
    "การปรับตัว",
    "อื่นๆ",
  ];

  const handleTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot: event.target.value,
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const currentCategories = [...prev.categories];
      if (currentCategories.includes(category)) {
        return {
          ...prev,
          categories: currentCategories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...currentCategories, category],
        };
      }
    });
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      details: event.target.value,
    }));
  };

  const handleConfirm = async () => {
    if (!formData.timeSlot) {
      alert("กรุณาเลือกเวลานัด");
      return;
    }
    if (formData.categories.length === 0) {
      alert("กรุณาเลือกหมวดหมู่อย่างน้อย 1 หมวด");
      return;
    }
    if (!formData.details.trim()) {
      alert("กรุณากรอกรายละเอียด");
      return;
    }

    try {
      // Here you would typically make an API call to confirm the booking
      // await post('/api/confirm-booking', { ...location.state, ...formData });
      alert("จองคิวสำเร็จ");
      navigate("/account");
    } catch (error) {
      console.error("Booking confirmation failed:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  const getEndTime = (startTime: string) => {
    const hour = parseInt(startTime.split(".")[0]);
    return `${hour + 1}.00`;
  };

  if (!location.state) {
    return null; // Component will unmount due to useEffect redirect
  }

  const { month, date } = location.state as LocationState;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      {/* ปรับ container ให้ responsive */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ปรับ max-width และ margin ให้ responsive */}
        <div className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-red-900 text-white p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-semibold">
              กรอกข้อมูลการนัดหมาย
            </h1>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Date Section */}
            <div className="bg-red-50 rounded-lg p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-red-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">วันที่</p>
                  <p className="font-medium text-gray-900">
                    {date} {month}
                  </p>
                </div>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-base sm:text-lg font-medium text-gray-900">
                  เลือกเวลานัด
                </h2>
              </div>
              <select
                value={formData.timeSlot}
                onChange={handleTimeSlotChange}
                className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 text-gray-900"
              >
                <option value="" className="text-gray-300">
                  กรุณาเลือกเวลา
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot} - {getEndTime(slot)} น.
                  </option>
                ))}
              </select>
            </div>

            {/* Categories Selection */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <h2 className="text-base sm:text-lg font-medium text-gray-900">
                  หมวดหมู่การปรึกษา
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-2 sm:px-3 py-1 rounded-full text-sm transition-colors
                      ${
                        formData.categories.includes(category)
                          ? "bg-red-900 text-white"
                          : "bg-red-50 text-red-900 hover:bg-red-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Details Input */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                <h2 className="text-base sm:text-lg font-medium text-gray-900">
                  รายละเอียด
                </h2>
              </div>
              <textarea
                value={formData.details}
                onChange={handleDetailsChange}
                placeholder="กรุณาระบุรายละเอียดเพิ่มเติม..."
                className="w-full h-24 sm:h-32 bg-white p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900"
              />
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    โปรดทราบ
                  </h3>
                  <div className="mt-2 text-xs sm:text-sm text-yellow-700">
                    <p>
                      กรุณามาถึงก่อนเวลานัด 5-10 นาที หากไม่สามารถมาตามนัดได้
                      กรุณาแจ้งล่วงหน้าอย่างน้อย 24 ชั่วโมง
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 sm:pt-6 border-t">
              <button
                onClick={() => navigate(-1)}
                className="px-4 sm:px-6 py-2 border bg-white border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 sm:px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm sm:text-base"
              >
                ยืนยันการนัดหมาย
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
