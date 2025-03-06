import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { post } from "../../services/api";

interface Queue {
  qid: number;
  current_date: string;
  slot: string;
}

interface QueueCompleteHistory {
  date: string;
  description: string;
}

interface ApiResponse {
  data: {
    fullname: string;
    nickname: string;
    tel: string;
    current_queue: Queue;
    history_complete: QueueCompleteHistory[];
    phy_name: string;
  };
  status: number;
  message: string;
}

const timeSlots: Record<number, string> = {
  1: "9:00-10:00",
  2: "10:00-11:00",
  3: "11:00-12:00",
  4: "13:00-14:00",
  5: "14:00-15:00",
  6: "15:00-16:00",
};

const formatThaiDate = (date: Date): string => {
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
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const QueueComplete: FC = () => {
  const { qid } = useParams<{ qid: string }>();
  const [cookies] = useCookies(["auth_token"]);
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [severity, setSeverity] = useState<string>("low"); // Added state for severity

  const fetchData = async () => {
    if (!qid) return;
    try {
      const requestBody = { token: cookies["auth_token"], qid: qid };
      const response = (await post(
        "/api/adminGetPersonalData",
        requestBody
      )) as ApiResponse;
      if (response?.data) {
        setData(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies, qid]);

  const handleSave = async () => {
    if (!data || !data.current_queue) return;
    try {
      const requestBody = {
        token: cookies["auth_token"],
        qid: data.current_queue.qid,
        description: "Completed queue", // สามารถเปลี่ยนแปลงตามต้องการ
        risk: severity, // Use the selected severity
      };

      console.log(requestBody);

      const response: ApiResponse = await post<ApiResponse>(
        "/api/completeQueue",
        requestBody
      );

      console.log(response);
      if (response.status === 200) {
        alert("บันทึกสำเร็จ");
        fetchData(); // โหลดข้อมูลใหม่หลังจากบันทึกสำเร็จ
      } else {
        throw new Error(response.message || "บันทึกล้มเหลว");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div className="max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-black border-b-2 pb-2">
        บันทึกประวัติบุคคล
      </h2>
      <p>QID: {qid}</p>

      {/* ข้อมูลผู้ป่วย */}
      <div className="border p-6 my-6 rounded-xl shadow-lg bg-white relative">
        <h3 className="font-semibold text-lg mb-4">
          ข้อมูลผู้ป่วยที่มีอยู่แล้ว
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            ชื่อจริง:{" "}
            <span className="font-medium text-gray-700">
              {data?.fullname || "N/A"}
            </span>
          </p>
          <p>
            ชื่อเล่น:{" "}
            <span className="font-medium text-gray-700">
              {data?.nickname || "N/A"}
            </span>
          </p>
          <p className="md:col-span-2">
            เบอร์โทร:{" "}
            <span className="font-medium text-gray-700">
              {data?.tel || "N/A"}
            </span>
          </p>
          <p className="md:col-span-2">
            ผู้ให้คำปรึกษา:{" "}
            <span className="font-medium text-gray-700">
              {data?.phy_name || "N/A"}
            </span>
          </p>

          {/* Dropdown for severity */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">
              ระดับความรุนแรงของเคส:
            </label>
            <select
              className="border border-gray-300 p-2 rounded-lg w-full bg-gray-100 text-gray-700"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
            </select>
          </div>
        </div>
      </div>

      {/* คิวปัจจุบัน */}
      <div className="border p-6 my-6 rounded-xl shadow-lg bg-white relative">
        <h3 className="font-semibold text-lg mb-4">คิวปัจจุบัน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">วันที่:</label>

            <span className="border border-gray-300 bg-gray-100 text-gray-800 p-2 rounded-lg w-full text-center">
              {data?.current_queue?.current_date}
            </span>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">ช่วงเวลา:</label>
            <span className="border border-gray-300 bg-gray-100 text-gray-800 p-2 rounded-lg w-full text-center">
              {timeSlots[Number(data?.current_queue?.slot)] ||
                data?.current_queue?.slot}
            </span>
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-95"
          >
            บันทึก
          </button>
        </div>
      </div>

      {/* ประวัติ */}
      <div className="border p-6 my-6 rounded-xl shadow-lg bg-white relative">
        <h3 className="font-semibold font-semibold text-lg mb-4">ประวัติ</h3>
        {data?.history_complete?.length ? (
          <ul>
            {data.history_complete.map((history, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <span className="font-medium">{history.date}</span>:{" "}
                  {history.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีข้อมูลการรักษา</p>
        )}
      </div>
    </div>
  );
};

export default QueueComplete;
