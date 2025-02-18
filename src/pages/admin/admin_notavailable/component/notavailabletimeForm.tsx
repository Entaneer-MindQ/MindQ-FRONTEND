import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useState } from "react";
import "./style.css";
import { post } from "../../../../services/api";

interface NonAvai {
  start_date: string;
  end_date: string;
  slot: number[];
  reason: string;
}

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
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const formatThaiDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
};

const NotAvailableTimeForm: React.FC = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [cookies] = useCookies(["auth_token"]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  const startDate: string = watch("start_date");
  const endDate: string = watch("end_date");

  const isSameDay = startDate && endDate && startDate === endDate;
  const isSameMonth =
    startDate &&
    endDate &&
    new Date(startDate).getMonth() === new Date(endDate).getMonth();

  const handleSlotSelect = (slotId: number) => {
    if (!isSameDay) return;

    setSelectedSlots((prev) =>
      prev.includes(slotId) ? prev.filter((s) => s !== slotId) : [...prev, slotId]
    );
  };

  const prepareRequestData = (): NonAvai[] => {
    let requests: NonAvai[] = [];
    requests.push({
      start_date: formatThaiDate(startDate),
      end_date: formatThaiDate(endDate),
      slot: selectedSlots,
      reason: watch("reason"),
    });


    return requests;
  };

  const onSubmit = async () => {
    try {
      const requestData = prepareRequestData();
      console.log("Request data:", requestData);
      console.log(requestData[0].start_date);
      console.log(requestData[0].end_date);
      console.log(requestData[0].slot);
      console.log(requestData[0].reason);


      const response = await post("/api/createNotAvailableTime", {
        start: requestData[0].start_date,
        end: requestData[0].end_date,
        slot: requestData[0].slot,
        reason: requestData[0].reason,
        token: cookies["auth_token"],
      });
      if (response) {
        alert("Save Non Available Time Success.");
  
      } else {
        alert("Failed to save Non Available Time." + (response as any).message);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Failed to save Non Available Time. T_T" + error.message);
        console.error("Error saving Non Available Time:", error.message);
      } else {
        alert("Failed to save Non Available Time. T_T");
        console.error("Error saving Non Available Time:", error);
      }
    }
     };


  return (
    <div className="form-container">
      <h2>ตั้งค่าเวลาที่ไม่พร้อม</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>วันที่เริ่มต้น</label>
        <input type="date" {...register("start_date", { required: true })} />

        <label>วันที่สิ้นสุด</label>
        <input type="date" {...register("end_date", { required: true })} />

        <label>ช่วงเวลาที่ไม่พร้อม</label>
        <div className="slot-buttons">
          {slotOptions.map((slot) => (
            <button
              key={slot.id}
              type="button"
              className={`slot-button ${selectedSlots.includes(slot.id) ? "active" : ""}`}
              onClick={() => handleSlotSelect(slot.id)}
              disabled={!isSameDay}
            >
              {slot.label}
            </button>
          ))}
        </div>
        {isSameDay && selectedSlots.length === 0 && (
          <p className="warning">Please choose time slot</p>
        )}
        {!isSameDay && <p className="note">เลือกต่างวัน slot จะเป็น 7 อัตโนมัติ</p>}

        <label>เหตุผล</label>
        <textarea {...register("reason", { required: false })} defaultValue=""/>

        <button 
          type="submit" 
          disabled={
            (!startDate || !endDate) ||
            (isSameDay ? selectedSlots.length === 0 : false)
          }
          style={{
            backgroundColor:
              (!startDate || !endDate) ||
              (isSameDay && selectedSlots.length === 0)
          ? "gray"
          : "blue",
            cursor:
              (!startDate || !endDate) ||
              (isSameDay && selectedSlots.length === 0)
          ? "not-allowed"
          : "pointer",
          }}
        >
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default NotAvailableTimeForm;
