import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

interface CancellationDialogProps {
  open: boolean;
  reason: string;
  onClose: () => void;
  onConfirm: () => void;
  onReasonChange: (reason: string) => void;
}

const CancellationDialog: React.FC<CancellationDialogProps> = ({
  open,
  reason,
  onClose,
  onConfirm,
  onReasonChange,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onChange={(e) => onReasonChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#943131",
            "&:hover": { backgroundColor: "rgba(148, 49, 49, 0.04)" },
          }}
        >
          ยกเลิก
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "#943131",
            "&:hover": { backgroundColor: "#B22222" },
          }}
        >
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancellationDialog;
