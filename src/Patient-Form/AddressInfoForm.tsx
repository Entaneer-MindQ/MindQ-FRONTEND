import React, { useContext } from "react";
import "./patientForm.css";
import { useAppController } from "./patientFormController";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIos";
import PatientContext from "../context/patientContext";
import { useNavigate } from "react-router-dom";

const CaseForm: React.FC = () => {
  const {
    QontoConnector,
    QontoStepIcon,
    steps,
    addressErrors,
    setAddressErrors,
    sharedStyles,
    handlePersonalInfoSubmit,
  } = useAppController();

  const { province, setProvince, provs } = useContext(PatientContext);

  const navigate = useNavigate();

  return (
    <>
      <h1>ส่งแบบฟอร์ม</h1>
      <div className="mt-10 mb-10">
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={1}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  sx={{
                    "& .MuiStepLabel-label": {
                      // fontFamily: "Noto Serif Thai",
                      fontSize: 17,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
      <div className="flex gap-4">
        <FormControl
          sx={{
            minWidth: 117,
            ...sharedStyles(addressErrors.province, province),
          }}
        >
          <InputLabel id="province-select-label">คำนำหน้า *</InputLabel>
          <Select
            labelId="province-select-label"
            id="province-select"
            label="คำนำหน้า *"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value); // Update name state
              if (addressErrors.province) {
                setAddressErrors({ ...addressErrors, province: false }); // Clear the error as the user starts typing
              }
            }}
          >
            {Array.isArray(provs) && provs.length > 0 ? (
              provs.map((option) => (
                <MenuItem key={option.id} value={option.province}>
                  {option.province}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                ไม่มีข้อมูล
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="mt-10 flex gap-4 justify-center">
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: "16px 32px",
            fontSize: "1.25rem",
            minWidth: "150px",
            backgroundColor: "#784af4",
            "&:focus": {
              outline: "none",
            },
          }}
          onClick={() => navigate("/patient-form/")}
          startIcon={<ArrowBackIosNewIcon />}
        >
          กลับ
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: "16px 32px",
            fontSize: "1.25rem",
            minWidth: "150px",
            backgroundColor: "#784af4",
            "&:focus": {
              outline: "none",
            },
          }}
          onClick={handlePersonalInfoSubmit}
          endIcon={<ArrowForwardIosIcon />}
        >
          ต่อไป
        </Button>
      </div>
    </>
  );
};

export default CaseForm;
