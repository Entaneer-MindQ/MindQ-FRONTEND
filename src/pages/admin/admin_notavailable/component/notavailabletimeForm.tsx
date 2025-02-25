
import { useState } from "react";
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

  const isSameDay = startDate && endDate && startDate === endDate;
  const handleSlotSelect = (slotId: number) => {
    if (!isSameDay) return;
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
      <div className="bg-[var(--primary-color)] text-white p-6">
        <h2 className="text-xl font-semibold">ตั้งค่าเวลาที่ไม่พร้อม</h2>
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
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 transition-colors"
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
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ช่วงเวลาที่ไม่พร้อม
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slotOptions.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotSelect(slot.id)}
                  disabled={!isSameDay}
                  className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                    selectedSlots.includes(slot.id)
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)] text-white"
                      : "border-gray-200 hover:border-[var(--primary-color)] hover:bg-[var(--hover-color)]"
                  } ${
                    !isSameDay
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            {isSameDay && selectedSlots.length === 0 && (
              <p className="text-amber-600 text-sm mt-2">กรุณาเลือกช่วงเวลา</p>
            )}
            {!isSameDay && (
              <p className="text-gray-500 text-sm mt-2">
                เลือกต่างวัน slot จะเป็น 7 อัตโนมัติ
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              เหตุผล
            </label>
            <textarea
              {...register("reason")}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 transition-colors resize-none h-24"
              placeholder="กรุณาระบุเหตุผล..."
            />
          </div>

          <button
            type="submit"
            disabled={
              !startDate ||
              !endDate ||
              (isSameDay && selectedSlots.length === 0)
                ? true
                : false
            }
            className={`w-full p-3 rounded-lg text-white transition-all duration-200 
              ${
                !startDate ||
                !endDate ||
                (isSameDay && selectedSlots.length === 0)
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
