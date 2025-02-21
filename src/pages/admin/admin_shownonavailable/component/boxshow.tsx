import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { post } from "../../../../services/api";
import EditNotAvailableTimeForm from "./EditNotAvailableTimeForm";

interface NotAvailableTime {
  NVTID: string;
  Phy_ID: string;
  start_date: string;
  end_date: string;
  Slot: string[];
  reason?: string;
}

const NotAvailableTimes = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [notAvailableTimes, setNotAvailableTimes] = useState<NotAvailableTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingData, setEditingData] = useState<NotAvailableTime | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await post("/api/getNotAvailableTime", {
          token: cookies["auth_token"],
        });
        console.log("Response:", response);
        const data = (response as { data: NotAvailableTime[] }).data;
        console.log("Data:", data);
        setNotAvailableTimes(data);
      } catch (err) {
        alert("Failed to fetch Non Available Time. T_T");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cookies]);

  if (loading)
    return (
      <div className="text-center p-4 text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg font-semibold">{error}</div>
    );

  return (
    <div className="relative p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {notAvailableTimes.map((time) => (
        <div
          key={time.NVTID}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unavailable Period
          </h3>
          <p className="text-sm text-gray-600">
            👨‍⚕️ Physician ID:{" "}
            <span className="font-medium">{time.Phy_ID}</span>
          </p>
          <p className="text-sm text-gray-600">
            📅 Start: <span className="font-medium">{time.start_date}</span>
          </p>
          <p className="text-sm text-gray-600">
            📅 End: <span className="font-medium">{time.end_date}</span>
          </p>
          <p className="text-sm text-gray-600">
            ⏳ Slots:{" "}
            <span className="font-medium">{time.Slot.join(", ")}</span>
          </p>
          <p className="text-sm text-gray-700 font-medium mt-2">
            📝 Reason: {time.reason || "No reason provided"}
          </p>
          <button
            onClick={() => setEditingData(time)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ))}
      {editingData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          {/* Wrapper เพื่อควบคุมขนาดของ EditNotAvailableTimeForm */}
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <EditNotAvailableTimeForm
              existingData={editingData}
              onClose={() => setEditingData(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotAvailableTimes;
