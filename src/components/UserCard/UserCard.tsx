import { MindData, UserData } from "../../types/user";
import { useBooking } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

interface userCard {
  userProfile: UserData | null;
  mind_data: MindData | null;
}

const UserInfoCard: React.FC<userCard> = ({ userProfile, mind_data }) => {

  const navigate = useNavigate();
  const { setIsBookingFlow, setSelectedCaseId } = useBooking();
  const {setMindCode} = useBooking();
  const handleBooking = () => {
    setIsBookingFlow(true);
    setSelectedCaseId(1
    )
    setMindCode( (mind_data)? mind_data.mind_code: "")//mind_data?.mind_code)
    navigate("/calendar");
  };

  return (
    <div className="w-full bg-neutral-400 rounded-lg p-4 text-white">
      <div className="flex flex-col">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-start text-white">
            Name: {userProfile?.name}.
          </h2>
          <p className="text-sm">
            ชื่อเล่น: {mind_data?.nickname} เลขประจำตัวผู้ใช้บริการ:{" "}
            {userProfile?.mind_code}
          </p>
          <p className="text-sm">CMU IT Account: {mind_data?.email}</p>
          <p className="text-sm">ตำแหน่ง: {userProfile?.status}</p>
          <p className="text-sm">เบอร์ติดต่อ : {mind_data?.phone}</p>
        </div>
        <div className="flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm max-w-36"
            onClick = { handleBooking }
            >
            จองคิวเพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
