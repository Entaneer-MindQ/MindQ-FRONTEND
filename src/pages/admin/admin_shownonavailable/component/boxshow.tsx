import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { post } from "../../../../services/api";
import EditNotAvailableTimeForm from "./EditNotAvailableTimeForm";
import { createPortal } from "react-dom";

interface NotAvailableTime {
  NVTID: number;
  Phy_ID: number;
  start_date: string;
  end_date: string;
  Slot: number[];
  reason?: string;
  updated_at: string;
  created_at: string;
}

const getSlotLabel = (slotId: number): string => {
  const slotLabels: Record<number, string> = {
    1: "9:00 - 10:00",
    2: "10:00 - 11:00",
    3: "11:00 - 12:00",
    4: "13:00 - 14:00",
    5: "14:00 - 15:00",
    6: "15:00 - 16:00",
    7: "All Day",
  };

  return slotLabels[slotId] || `Slot ${slotId}`;
};

const NotAvailableTimes = () => {
  const [cookies] = useCookies(["auth_token"]);
  const [notAvailableTimes, setNotAvailableTimes] = useState<
    NotAvailableTime[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        setError("Failed to fetch Non Available Time.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cookies]);

  // Group by physician ID for better organization
  const groupedByPhysician = notAvailableTimes.reduce((acc, time) => {
    if (!acc[time.Phy_ID]) {
      acc[time.Phy_ID] = [];
    }
    acc[time.Phy_ID].push(time);
    return acc;
  }, {} as Record<number, NotAvailableTime[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div className="text-red-500 text-lg font-semibold mb-2">Error</div>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (notAvailableTimes.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <div className="text-blue-500 text-xl font-semibold mb-3">
          No unavailable times found
        </div>
        <p className="text-gray-600">All time slots are currently available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedByPhysician).map(([physicianId, times]) => (
        <div
          key={physicianId}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div
            className="bg-primary px-6 py-4"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <h3 className="text-white text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Physician Non-Available Times
            </h3>
          </div>

          <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {times.map((time) => (
              <div
                key={time.NVTID}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md hover:border-blue-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 text-blue-800 p-1.5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </div>
                    <h4 className="font-medium text-gray-800">
                      Unavailable Period
                    </h4>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                    ID: {time.NVTID}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                      <p className="text-gray-500 font-medium">Date Range</p>
                      <p className="text-gray-800">
                        {time.start_date} - {time.end_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Time Slots</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {time.Slot.includes(7) ? (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                            All Day
                          </span>
                        ) : (
                          time.Slot.map((slotId) => (
                            <span
                              key={slotId}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {getSlotLabel(slotId)}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Reason</p>
                      <p className="text-gray-800">
                        {time.reason || "No reason provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setEditingData(time)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-sm"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
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
                    Edit Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editingData &&
        createPortal(
          <div className="relative">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
              }}
              onClick={() => setEditingData(null)}
            />

            {/* Modal content */}
            <div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
              style={{ zIndex: 9999 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EditNotAvailableTimeForm
                existingData={{
                  ...editingData,
                  reason: editingData.reason || "No reason provided",
                }}
                onClose={() => setEditingData(null)}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default NotAvailableTimes;
