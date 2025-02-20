import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../services/api";
import { QueueApiResponse, QueueItem } from "../types/queue";
import { useCookies } from "react-cookie";
import UserInfoCard from "../components/UserCard/UserCard";
import { UserData, MindData } from "../../src/types/user";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaseData } from "../types/queue";
import { AppointmentHistoryCard } from "../components/AppointmentHistoryCard/AppointmentHistoryCard";

interface AppointmentQueue {
  current: QueueItem[];
  cancelled: QueueItem[];
  completed: QueueItem[];
}
const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded-lg ${
            currentPage === idx + 1 ? "bg-red-900 text-white" : "hover:bg-gray-100"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const { mindCode } = useParams<{ mindCode: string }>();
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["auth_token"]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mind_data, setMindData] = useState<MindData | null>(null);
  const [case_data, setCaseData] = useState<CaseData| null> (null);
  const [appointmentQueue, setAppointmentQueue] = useState<AppointmentQueue | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!mindCode) {
      setError("ไม่พบรหัสผู้ใช้งาน");
      return;
    }
  }, [mindCode]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!mindCode) return;
      setLoading(true);
      try {
        const response = (await post("/api/getHistoryByMindCode", {
          token: cookies["auth_token"],
          mind_code: mindCode
        })) as QueueApiResponse;
        setUserData(response.data.user_data);
        setMindData(response.data.mind_data);
        setCaseData(response.data.case_data);
        setAppointmentQueue({
          current: response.data.current_queue,
          cancelled: response.data.cancel_queue,
          completed: response.data.complete_queue
        });

        // Calculate total appointments across all queues
        const totalAppointments = 
          response.data.current_queue.length + 
          response.data.cancel_queue.length + 
          response.data.complete_queue.length;
        
        setTotal(totalAppointments);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้งานได้");
        console.error("Error fetching user info: ", err);
      } finally {
        setLoading(false);  // Fixed: Was setting to true before
      }
    };

    fetchUserInfo();
  }, [mindCode, cookies]);

  const getAllAppointments = () => {
    if (!appointmentQueue) return [];
    return [
      ...appointmentQueue.current,
      ...appointmentQueue.cancelled,
      ...appointmentQueue.completed
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const paginatedAppointments = () => {
    const allAppointments = getAllAppointments();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allAppointments.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(getAllAppointments().length / itemsPerPage);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-2">
      <div className="max-w-5xl w-full px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <button
                    onClick={() => navigate(-1)}
                    className="w-32 text-left text-black bg-white hover:hover:bg-blue-300 transition-colors"
                  >
                    ← ย้อนกลับ
                  </button>
            {userData && (
              <UserInfoCard userProfile = {userData} mind_data={mind_data}/>
          )
          }

            {/* Queue Statistics */}
            {appointmentQueue && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">การนัดหมายทั้งหมด</p>
                    <p className="text-2xl font-bold text-blue-600">{total}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">นัดหมายปัจจุบัน</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {appointmentQueue.current.length}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">ยกเลิกนัดหมาย</p>
                    <p className="text-2xl font-bold text-red-600">
                      {appointmentQueue.cancelled.length}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">นัดหมายเสร็จสิ้น</p>
                    <p className="text-2xl font-bold text-green-600">
                      {appointmentQueue.completed.length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {appointmentQueue && (
            <div className="mt-6">
              {paginatedAppointments().map((appointment, index) => (
                <AppointmentHistoryCard key={index} appointment={appointment} caseData={case_data}/>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;