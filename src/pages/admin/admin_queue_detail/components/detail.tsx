import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { post } from "../../../../services/api";
import { useCookies } from "react-cookie";
import UserInfoCard from "../../../../components/UserCard/UserCard";
import { UserData, MindData } from "../../../../types/user";
import CancellationDialog from "../../../../components/CancellationDialog/CancellationDialog";
import useAccountData from "../../../../hooks/useAccountData";

interface QueueDetails {
  qid: number;
  case_id: number;
  mind_code: string;
  date: string;
  slot: string;
  topic: string;
  description: string;
  status: string;
}

interface ApiResponse {
  status: number;
  queue_data: QueueDetails;
  user_data: UserData;
  mind_data: MindData;
}

const Admin_QueueDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queueId = searchParams.get("queue_id");
  const [queueDetails, setQueueDetails] = useState<QueueDetails | null>(null);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [mind_data, setMindData] = useState<MindData | null>(null);
  const [cookies] = useCookies(["auth_token"]);
  const { refreshData } = useAccountData();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    fetchQueueDetails(); // Re-fetch queue details after closing the dialog
  };

  const fetchQueueDetails = async () => {
    try {
      const response = (await post("/api/getQueueDetails", {
        token: cookies["auth_token"],
        qid: queueId,
      })) as ApiResponse;

      if (response.status === 200) {
        setQueueDetails(response.queue_data);
        setUserProfile(response.user_data);
        setMindData(response.mind_data);
      }
    } catch (error) {
      console.error("Error fetching queue details:", error);
      navigate("/admin-queue");
    }
  };

  useEffect(() => {
    if (queueId) {
      fetchQueueDetails();
    } else {
      navigate("/admin-queue");
    }
  }, [queueId, cookies, navigate]);

  if (!queueDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 max-w-28">
        <button
          onClick={() => navigate("/admin-queue")}
          className="text-black flex items-center gap-2 bg-white hover:bg-blue-300"
        >
          ← ย้อนกลับ
        </button>
      </div>

      {/* User Info Card */}
      <UserInfoCard userProfile={userProfile} mind_data={mind_data} />

      {/* Appointment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Appointment</h2>
        <div className="border rounded-lg p-4 space-y-2">
          <div>
            <span className="font-semibold">Topic: </span>
            {queueDetails.topic}
          </div>
          <div>
            <span className="font-semibold">Description: </span>
            {queueDetails.description}
          </div>
          <div>
            <span className="font-semibold">Date: </span>
            {queueDetails.date}
          </div>
          <div>
            <span className="font-semibold">Time: </span>
            {queueDetails.slot}
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            {queueDetails ? "จองคิวแล้ว" : "N/A"}
          </div>

          {/* Cancel button */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded max-w-36"
              onClick={handleOpenDialog}
            >
              ยกเลิกคิว
            </button>
          </div>
        </div>
      </div>
      <CancellationDialog
        open={openDialog}
        qid={queueDetails.qid.toString()}
        onClose={handleCloseDialog}
        onSuccess={() => {
          handleCloseDialog();
          refreshData();
        }}
      />
    </div>
  );
};

export default Admin_QueueDetails;