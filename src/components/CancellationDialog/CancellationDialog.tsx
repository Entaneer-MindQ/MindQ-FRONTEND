import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { post } from "../../services/api";
import { useCookies } from "react-cookie";

interface CancellationDialogProps {
  open: boolean;
  qid: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface ApiResponse {
  status: number;
  message: string;
}

const CancellationDialog: React.FC<CancellationDialogProps> = ({
  open,
  qid,
  onClose,
  onSuccess,
}) => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["auth_token"]);

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
    if (error) setError(null);
  };

  const handleClose = () => {
    setReason("");
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!reason.trim()) {
      setError("กรุณาระบุสาเหตุการยกเลิกนัด");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        token: cookies["auth_token"],
        qid: qid,
        reason: reason.trim(),
      };

      console.log("Request Body:", requestBody);

      const response = (await post(
        "/api/cancelQueue",
        requestBody
      )) as ApiResponse;

      if (response.status === 200) {
        handleClose();
        onSuccess();
      } else {
        setError(
          response.message ||
            "เกิดข้อผิดพลาดในการยกเลิกนัด กรุณาลองใหม่อีกครั้ง"
        );
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
      console.error("Error cancelling appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          m: 2,
          width: { xs: "calc(100% - 32px)", sm: "100%" },
          maxWidth: { sm: "500px" },
        },
      }}
    >
      <DialogTitle sx={{ color: "#943131", pt: 3 }}>
        ยกเลิกการนัดหมาย
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          กรุณาระบุสาเหตุการยกเลิกนัด
        </Typography>
        <TextField
          autoFocus
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="ระบุสาเหตุการยกเลิกนัด"
          value={reason}
          onChange={handleReasonChange}
          error={!!error}
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            color: "#943131",
            "&:hover": { backgroundColor: "rgba(148, 49, 49, 0.04)" },
          }}
        >
          ยกเลิก
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: "#943131",
            "&:hover": { backgroundColor: "#B22222" },
          }}
        >
          {isLoading ? "กำลังดำเนินการ..." : "ยืนยัน"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancellationDialog;
