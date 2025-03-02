import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useCookies } from "react-cookie";
import { post } from "../../../../services/api";

interface SlotOption {
  id: number;
  label: string;
  icon: string;
}

interface ExistingData {
  NVTID: number;
  Phy_ID: number;
  Slot: number[];
  created_at: string;
  end_date: string;
  reason: string;
  start_date: string;
  updated_at: string;
}

interface FormData {
  start_date: string;
  end_date: string;
  reason: string;
}

interface FormErrors {
  start_date?: string;
  end_date?: string;
  slots?: string;
}

interface EditNotAvailableTimeFormProps {
  existingData: ExistingData;
  onClose: () => void;
}

const slotOptions: SlotOption[] = [
  { id: 1, label: "9:00 - 10:00", icon: "🕙" },
  { id: 2, label: "10:00 - 11:00", icon: "🕙" },
  { id: 3, label: "11:00 - 12:00", icon: "🕚" },
  { id: 4, label: "13:00 - 14:00", icon: "🕜" },
  { id: 5, label: "14:00 - 15:00", icon: "🕝" },
  { id: 6, label: "15:00 - 16:00", icon: "🕞" },
];

const thaiMonths: string[] = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

// Convert Thai date string to YYYY-MM-DD format
const parseThatDate = (thaiDate: string): string => {
  const [day, month, year] = thaiDate.split(" ");
  const monthIndex = thaiMonths.indexOf(month);
  const gregorianYear = parseInt(year) - 543;
  const formattedMonth = (monthIndex + 1).toString().padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  return `${gregorianYear}-${formattedMonth}-${formattedDay}`;
};

// Convert YYYY-MM-DD to Thai date format
const formatThaiDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${
    date.getFullYear() + 543
  }`;
};

const EditNotAvailableTimeForm: React.FC<EditNotAvailableTimeFormProps> = ({
  existingData,
  onClose,
}) => {
  // Convert Thai dates to YYYY-MM-DD format for the form inputs
  const initialStartDate = parseThatDate(existingData.start_date);
  const initialEndDate = parseThatDate(existingData.end_date);
  const [cookies] = useCookies(["auth_token"]);

  const [formData, setFormData] = useState<FormData>({
    start_date: initialStartDate,
    end_date: initialEndDate,
    reason: existingData.reason || "",
  });

  const [selectedSlots, setSelectedSlots] = useState<number[]>(
    existingData.Slot || []
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (existingData) {
      setFormData({
        start_date: parseThatDate(existingData.start_date),
        end_date: parseThatDate(existingData.end_date),
        reason: existingData.reason,
      });
      setSelectedSlots(existingData.Slot);
    }
  }, [existingData]);

  const isSameDay = formData.start_date === formData.end_date;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSlotSelect = (slotId: number): void => {
    if (!isSameDay) return;

    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((s) => s !== slotId)
        : [...prev, slotId]
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.start_date) {
      newErrors.start_date = "กรุณาเลือกวันที่เริ่มต้น";
    }
    if (!formData.end_date) {
      newErrors.end_date = "กรุณาเลือกวันที่สิ้นสุด";
    }

    // Check if end date is before start date
    if (
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) > new Date(formData.end_date)
    ) {
      newErrors.end_date = "วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น";
    }

    if (isSameDay && selectedSlots.length === 0) {
      newErrors.slots = "กรุณาเลือกช่วงเวลา";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        NVTID: existingData.NVTID,
        phy_id: existingData.Phy_ID,
        start: formatThaiDate(formData.start_date),
        end: formatThaiDate(formData.end_date),
        slot: isSameDay ? selectedSlots : [7],
        reason: formData.reason,
      };

      const response = await post("/api/updateNotAvailableTime", {
        update: submitData,
        token: cookies["auth_token"],
      });

      if (response) {
        // Success toast instead of alert
        showSuccessToast("บันทึกข้อมูลสำเร็จ");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Not Available Time:", error);
      // Error toast instead of alert
      showErrorToast("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function for delete button
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await post("/api/deleteNotAvailableTime", {
        NVTID: existingData.NVTID,
        token: cookies["auth_token"],
      });

      if (response) {
        // Success toast instead of alert
        showSuccessToast("ลบข้อมูลสำเร็จ");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting Not Available Time:", error);
      // Error toast instead of alert
      showErrorToast("ไม่สามารถลบข้อมูลได้ โปรดลองอีกครั้ง");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  // Toast notifications (simplified implementation)
  const showSuccessToast = (message: string) => {
    alert(message); // Replace with proper toast in production
  };

  const showErrorToast = (message: string) => {
    alert(message); // Replace with proper toast in production
  };

  if (!existingData) {
    return <div>No data to edit</div>;
  }

  return (
    <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header with gradient background */}
      <div
        className="bg-primary p-6"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            แก้ไขเวลาที่ไม่พร้อม
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="w-8 p-1 rounded-full bg-blue-400 bg-opacity-20 text-white hover:bg-blue-400 hover:bg-opacity-30 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="mb-6 bg-blue-50 rounded-lg p-3 flex items-start">
          <div className="text-blue-500 mr-3 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 text-sm text-blue-700">
            <p className="font-medium">หมายเหตุ:</p>
            <p>
              หากเลือกวันเริ่มต้นและวันสิ้นสุดเป็นวันเดียวกัน
              คุณจะต้องเลือกช่วงเวลาที่ไม่พร้อมให้บริการ
            </p>
            <p>
              หากเลือกต่างวัน
              ระบบจะตั้งค่าให้ไม่พร้อมให้บริการทั้งวันโดยอัตโนมัติ
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-blue-500"
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
                วันที่เริ่มต้น
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all
                  ${
                    errors.start_date
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
              />
              {errors.start_date && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
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
                  {errors.start_date}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-blue-500"
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
                วันที่สิ้นสุด
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all
                  ${
                    errors.end_date
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
              />
              {errors.end_date && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
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
                  {errors.end_date}
                </p>
              )}
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-blue-500"
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
              ช่วงเวลาที่ไม่พร้อม
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slotOptions.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotSelect(slot.id)}
                  disabled={!isSameDay}
                  className={`p-3 rounded-lg transition-all duration-200 font-medium text-sm flex flex-col items-center justify-center
                    ${
                      selectedSlots.includes(slot.id)
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                    }
                    ${
                      !isSameDay
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md"
                    }`}
                >
                  <span className="text-lg mb-1">{slot.icon}</span>
                  {slot.label}
                </button>
              ))}
            </div>

            {errors.slots && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
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
                {errors.slots}
              </p>
            )}

            {!isSameDay && (
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>เลือกต่างวัน ระบบจะตั้งค่าไม่พร้อมทั้งวันอัตโนมัติ</span>
              </div>
            )}
          </div>

          {/* Reason Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              เหตุผล
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="ระบุเหตุผลที่ไม่พร้อมให้บริการ"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>

          {/* Confirmation Dialog for Delete */}
          {showConfirm && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-2"
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
                  <span className="text-red-700 font-medium">
                    ต้องการลบรายการนี้ใช่หรือไม่?
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm flex items-center"
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        กำลังลบ...
                      </>
                    ) : (
                      "ยืนยันการลบ"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center font-medium text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              ลบรายการ
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center font-medium text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.start_date ||
                !formData.end_date ||
                (isSameDay && selectedSlots.length === 0)
              }
              style={
                !isSubmitting &&
                formData.start_date &&
                formData.end_date &&
                (!isSameDay || selectedSlots.length > 0)
                  ? { backgroundColor: "var(--primary-color)" }
                  : {}
              }
              className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center justify-center
                ${
                  isSubmitting ||
                  !formData.start_date ||
                  !formData.end_date ||
                  (isSameDay && selectedSlots.length === 0)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"
                }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  บันทึกข้อมูล
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 border-t">
        แก้ไขล่าสุด: {new Date(existingData.updated_at).toLocaleString("th-TH")}
      </div>
    </div>
  );
};

export default EditNotAvailableTimeForm;
