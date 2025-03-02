import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../services/api";
import { useCookies } from "react-cookie";
import "../styles/global.css";

interface LocationState {
  month: string;
  date: number;
  availableSlots?: number[];
  mind_code?: string;
}

interface SlotOption {
  id: number;
  label: string;
  time: string;
}

interface NotAvailableTime {
  NVTID: number;
  Phy_ID: number;
  start_date: string;
  end_date: string;
  Slot: number[];
  reason: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: number;
  data: NotAvailableTime[];
}

const ConfirmBookingPage = ({ cid }: { cid: number | null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["auth_token"]);
  const [formData, setFormData] = useState({
    timeSlot: "",
    date: "",
    details: "",
    mind_code: "",
  });
  const [availableSlots, setAvailableSlots] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slotOptions: SlotOption[] = [
    { id: 1, label: "09.00 - 10.00 น.", time: "09.00" },
    { id: 2, label: "10.00 - 11.00 น.", time: "10.00" },
    { id: 3, label: "11.00 - 12.00 น.", time: "11.00" },
    { id: 4, label: "13.00 - 14.00 น.", time: "13.00" },
    { id: 5, label: "14.00 - 15.00 น.", time: "14.00" },
    { id: 6, label: "15.00 - 16.00 น.", time: "15.00" },
  ];

  useEffect(() => {
    const state = location.state as LocationState;
    if (!state?.month || !state?.date || !state?.mind_code) {
      navigate("/case");
    } else {
      console.log("Location State:", state);
      setFormData((prev) => ({
        ...prev,
        date: `${state.date} ${state.month}`,
        mind_code: `${state.mind_code}`,
      }));

      if (state.availableSlots) {
        setAvailableSlots(state.availableSlots);
        setLoading(false);
      } else {
        fetchAvailableSlots(state.date, state.month);
      }
    }
  }, [location.state, navigate]);

  const fetchAvailableSlots = async (date: number, Month: string) => {
    try {
      const token = cookies["auth_token"];
      const response = (await post("/api/getNotAvailableTimesbyPhyId", {
        phyId: 1,
      })) as ApiResponse;

      if (response.data) {
        console.log("API Response:", response.data);

        // แยก Month string (เช่น "เมษายน 2025")
        const [selectedMonth, selectedYear] = Month.split(" ");
        // แปลงปี ค.ศ. เป็น พ.ศ.
        const thaiYear = parseInt(selectedYear) + 543;

        console.log("Selected Month:", selectedMonth);
        console.log("Thai Year:", thaiYear);

        // หา unavailable slots สำหรับวันที่เลือก
        const matchingDate = response.data.find((item) => {
          // แยกวันที่ออกเป็นส่วนๆ
          const [day, month, year] = item.start_date.split(" ");
          console.log("Comparing:");
          console.log("Day:", day, "vs", date);
          console.log("Month:", month, "vs", selectedMonth);
          console.log("Year:", year, "vs", thaiYear);

          // แปลงวันที่เป็นตัวเลข
          const itemDate = parseInt(day);
          // เปรียบเทียบวันที่, เดือน และปี
          return (
            itemDate === date &&
            month === selectedMonth &&
            parseInt(year) === thaiYear
          );
        });

        if (!matchingDate) {
          // ถ้าไม่พบข้อมูลของวันที่เลือก แสดงว่าทุก slot ว่าง
          setAvailableSlots([1, 2, 3, 4, 5, 6]);
        } else {
          console.log("Matching Date:", matchingDate);
          // ถ้าพบข้อมูล ให้แสดงเฉพาะ slot ที่ไม่อยู่ใน Slot array
          const availableSlotIds = [1, 2, 3, 4, 5, 6].filter(
            (id) => !matchingDate.Slot.includes(id)
          );
          console.log("Available Slots:", availableSlotIds);
          setAvailableSlots(availableSlotIds);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
      setLoading(false);
    }
  };

  const handleTimeSlotChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot: event.target.value,
    }));
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

    if (!formData.details.trim()) {
      alert("กรุณากรอกรายละเอียด");
      return;
    }

    try {
      const responseData = {
        cid: cid,
        token: cookies["auth_token"],
        formData,
      };

      console.log("Sending data:", responseData);

      const response = await post("/api/insertQueue", {
        responseData,
      });

      console.log("API Response:", response);

      alert("จองคิวสำเร็จ");
      navigate("/account");
    } catch (error) {
      console.error("Booking confirmation failed:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  if (!location.state) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[var(--primary-color)] text-white p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-semibold">
              กรอกข้อมูลการนัดหมาย
            </h1>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Date Section */}
            <div className="bg-[var(--hover-color)] rounded-lg p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--primary-color)]"
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
                  <p className="font-medium text-gray-900">{formData.date}</p>
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
              <div className="relative">
                <select
                  value={formData.timeSlot}
                  onChange={handleTimeSlotChange}
                  className="appearance-none w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 text-gray-900"
                >
                  <option value="">กรุณาเลือกเวลา</option>
                  {slotOptions
                    .filter((slot) => availableSlots.includes(slot.id))
                    .map((slot) => (
                      <option key={slot.id} value={slot.time}>
                        {slot.label}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {availableSlots.length === 0 && (
                <p className="text-red-600 text-sm">
                  ไม่มีช่วงเวลาว่างในวันที่เลือก
                </p>
              )}
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
                className="px-4 sm:px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-red-800 transition-colors text-sm sm:text-base"
                disabled={!formData.timeSlot || !formData.details.trim()}
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
