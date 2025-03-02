import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { post } from "../../../../services/api";
import "./style.css";

interface SlotOption {
  id: number;
  label: string;
}

const slotOptions: SlotOption[] = [
  { id: 1, label: "9:00 - 10:00" },
  { id: 2, label: "10:00 - 11:00" },
  { id: 3, label: "11:00 - 12:00" },
  { id: 4, label: "13:00 - 14:00" },
  { id: 5, label: "14:00 - 15:00" },
  { id: 6, label: "15:00 - 16:00" },
];

const thaiMonths = [
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

const formatThaiDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${
    date.getFullYear() + 543
  }`;
};

const NotAvailableTimeForm = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [cookies] = useCookies(["auth_token"]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  const startDate: string = watch("start_date");
  const endDate: string = watch("end_date");
  const reason: string = watch("reason");

  useEffect(() => {
    // Clear selected slots if switching from same day to multiple days
    if (
      startDate &&
      endDate &&
      startDate !== endDate &&
      selectedSlots.length > 0
    ) {
      setSelectedSlots([]);
    }
  }, [startDate, endDate, selectedSlots.length]);

  const handleSlotSelect = (slotId: number) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((s) => s !== slotId)
        : [...prev, slotId]
    );
  };

  const onSubmit = async (data: any) => {
    try {
      const requestData = {
        start: formatThaiDate(data.start_date),
        end: formatThaiDate(data.end_date),
        slot: selectedSlots,
        reason: data.reason,
        token: cookies["auth_token"],
      };

      const response = await post("/api/createNotAvailableTime", requestData);

      if (response) {
        setMessage("บันทึกเวลาที่ไม่พร้อมสำเร็จ");
        reset();
        setSelectedSlots([]);
      } else {
        setMessage("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--primary-color)]  p-6">
        <h2 className=" text-white text-lg sm:text-xl lg:text-2xl font-semibold">
          ตั้งค่าเวลาที่ไม่ว่าง
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-800">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                วันที่เริ่มต้น
              </label>
              <input
                type="date"
                {...register("start_date", { required: true })}
                className="w-full p-2  border-2 border-gray-200 rounded-lg focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 transition-colors"
                style={{ colorScheme: "light" }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                วันที่สิ้นสุด
              </label>
              <input
                type="date"
                {...register("end_date", { required: true })}
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 transition-colors"
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>

          {/* ช่วงเวลา - แสดงเฉพาะเมื่อเลือกวันเดียว */}
          {startDate && endDate && startDate === endDate && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ช่วงเวลา
              </label>

              {selectedSlots.length === 0 && (
                <p className="text-amber-600 text-sm mb-2">
                  กรุณาเลือกช่วงเวลา
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slotOptions.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => handleSlotSelect(slot.id)}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                      selectedSlots.includes(slot.id)
                        ? "border-[var(--primary-color)] bg-[var(--primary-color)] text-white"
                        : "border-gray-200 hover:border-[var(--primary-color)] hover:bg-[var(--hover-color)]"
                    } cursor-pointer`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ข้อความเมื่อเลือกหลายวัน */}
          {startDate && endDate && startDate !== endDate && (
            <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
              <p className="text-sm">
                เนื่องจากเลือกหลายวัน
                ระบบจะลงทะเบียนว่าไม่ว่างทั้งวันโดยอัตโนมัติ
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              เหตุผล <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("reason", { required: true })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 transition-colors resize-none h-24"
              placeholder="กรุณาระบุเหตุผล..."
            />
          </div>

          <button
            type="submit"
            disabled={
              !startDate ||
              !endDate ||
              !reason ||
              (startDate === endDate && selectedSlots.length === 0)
            }
            className={`w-full p-3 rounded-lg text-white transition-all duration-200 
              ${
                !startDate ||
                !endDate ||
                !reason ||
                (startDate === endDate && selectedSlots.length === 0)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--primary-color)] hover:bg-[var(--hover-color)] cursor-pointer"
              }`}
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotAvailableTimeForm;
