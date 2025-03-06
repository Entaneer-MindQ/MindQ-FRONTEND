import React, { useEffect, useState } from "react";
import { post } from "../../services/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  status: number;
  data: Array<{
    qid: number;
    mind_code: string;
    date: string;
    slot: number;
  }>;
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  // Create a map: key = slot number (1-6), value = mind_code (if exists) or false.
  const [mindCodeMap, setMindCodeMap] = useState<
    Record<number, { mindCode: string; qid: number } | false>
  >({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [cookies] = useCookies(["auth_token"]);

  const currentDate = new Date();
  const formattedDate = formatThaiDate(currentDate);

  const fetchData = async () => {
    try {
      const requestBody = {
        token: cookies["auth_token"],
        date: formattedDate,
      };

      const response = (await post(
        "/api/toDayAppointment",
        requestBody
      )) as ApiResponse;
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      // Save fetched data
      setData(response.data);

      // Build the mindCodeMap for slots 1-6
      const newMap: Record<number, { mindCode: string; qid: number } | false> =
        {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        };
      console.log(response.data);
      for (let i = 1; i <= 6; i++) {
        // Find an item with slot equal to i
        const item = response.data.find((d) => d.slot === i);
        newMap[i] =
          item && item.mind_code
            ? { mindCode: item.mind_code, qid: item.qid }
            : false;
      }
      console.log("newMap:", newMap);
      setMindCodeMap(newMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-5 shadow-md rounded-lg mt-5">
      {/* Header Section */}
      <div className="bg-gray-200 p-4 rounded-t-lg text-center">
        <h2 className="text-lg font-semibold">
          รายการปรึกษาวันนี้ (กดปุ่มเพื่อดูรายละเอียด)
        </h2>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>

      {/* Schedule Button */}
      <div className="flex justify-center my-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md text-sm font-semibold">
          จัดตารางเวลา
        </button>
      </div>

      {/* Schedule Section: For each slot 1-6 */}
      <div className="p-4">
        {[1, 2, 3, 4, 5, 6].map((slotNumber) => {
          const mindCode = mindCodeMap[slotNumber];
          // console.log(data ? (data[index].qid ? data[index].qid : 0) : 0);
          return (
            <div
              key={slotNumber}
              className="flex justify-between items-center my-2 border rounded p-2 shadow-sm"
            >
              {mindCode ? (
                <button
                  className="px-4 py-2 rounded w-36 text-sm font-semibold bg-blue-400 text-white"
                  onClick={() => navigate(`/queue-complete/${mindCode.qid}`)}
                >
                  {`Slot ${timeSlots[slotNumber]}`}
                </button>
              ) : (
                <span className="text-sm text-gray-700">{`Slot ${timeSlots[slotNumber]}`}</span>
              )}
              {mindCode ? mindCode.mindCode : "ไม่มีการจอง"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
