import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  topic: string;
  description: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

interface UserInfo {
  patientId: string;
  email: string;
  position: string;
}

// Mock data
const sampleAppointments: Appointment[] = [
  {
    topic: "การเงิน",
    description:
      "efdsdjfoisjfldsdlifjlsdjfisjdfisoifjllsdfjlsjdfojjsiodfjisodf",
    date: "16th January 2024",
    time: "10.00 - 11.00",
    status: "จองคิวแล้ว",
  },
  {
    topic: "การเงิน",
    description: "qlwjfldfmgjpowjdsdkgowiherowsjgowtjoewrtjowejroiwj",
    date: "16th January 2024",
    time: "13.00 - 14.00",
    status: "ยกเลิกคิว",
    reason: "ติดเรียน",
  },
];

const sampleUserInfo: UserInfo = {
  patientId: "2024/001",
  email: "theeraphan_p@cmu.ac.th",
  position: "นักศึกษา",
};

// API service
const api = {
  getUserInfo: async (): Promise<UserInfo> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(sampleUserInfo), 500);
    });
  },

  getAppointments: async (
    page: number,
    limit: number
  ): Promise<{
    appointments: Appointment[];
    total: number;
  }> => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const appointments = sampleAppointments.slice(start, end);
        resolve({
          appointments,
          total: sampleAppointments.length,
        });
      }, 500);
    });
  },
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const appointmentsPerPage = 5;

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await api.getUserInfo();
        setUserInfo(data);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserInfo();
  }, []);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await api.getAppointments(
          currentPage,
          appointmentsPerPage
        );
        setAppointments(data.appointments);
        setTotalAppointments(data.total);
        setError(null);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลการนัดหมายได้");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalAppointments / appointmentsPerPage);

  // Get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "จองคิวแล้ว":
        return "bg-green-100 text-green-800";
      case "ยกเลิกคิว":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Loading state
  if (loading && !appointments.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-900 border-t-transparent"></div>
          <p className="mt-2 text-red-900">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 ml-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="bg-red-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    ← ย้อนกลับ
                  </button>
                  <h1 className="text-2xl font-semibold">ประวัติการนัดหมาย</h1>
                </div>
              </div>
            </div>

            {/* User Info */}
            {userInfo && (
              <div className="p-6 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">เลขประจำตัวคนไข้</p>
                    <p className="font-medium">{userInfo.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CMU IT Account</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ตำแหน่ง</p>
                    <p className="font-medium">{userInfo.position}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <h2 className="text-lg font-medium">
                        หัวข้อ: {appointment.topic}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span>{appointment.date}</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">รายละเอียด:</p>
                      <p className="text-gray-800">{appointment.description}</p>
                    </div>
                    {appointment.reason && (
                      <div>
                        <p className="text-sm text-gray-600">เหตุผล:</p>
                        <p className="text-gray-800">{appointment.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-red-900 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
