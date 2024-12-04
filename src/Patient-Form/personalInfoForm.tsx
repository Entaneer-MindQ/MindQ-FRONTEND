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
import PatientContext from "../context/patientContext";

const InfoForm: React.FC = () => {
  const {
    QontoConnector,
    QontoStepIcon,
    steps,
    errors,
    setErrors,
    sharedStyles,
    handleChange,
    handlePersonalInfoSubmit,
  } = useAppController();

  const {
    prefix,
    setPrefix,
    prefixOptions,
    name,
    setName,
    surname,
    setSurname,
    id,
    setId,
    birthdate,
    setBirthdate,
    ethnicity,
    setEthnicity,
    nationality,
    setNationality,
    religion,
    setReligion,
    education,
    setEducation,
    phoneNumber,
    setPhoneNumber,
    marriage,
    setMarriage,
    marital,
  } = useContext(PatientContext);

  return (
    <>
      <h1>ส่งแบบฟอร์ม</h1>
      <div className="mt-10 mb-10">
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={0}
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
            ...sharedStyles(errors.prefix, prefix),
          }}
        >
          <InputLabel id="prefix-select-label">คำนำหน้า *</InputLabel>
          <Select
            labelId="prefix-select-label"
            id="prefix-select"
            label="คำนำหน้า *"
            value={prefix}
            onChange={(e) => {
              setPrefix(e.target.value); // Update name state
              if (errors.prefix) {
                setErrors({ ...errors, prefix: false }); // Clear the error as the user starts typing
              }
            }}
          >
            {Array.isArray(prefixOptions) && prefixOptions.length > 0 ? (
              prefixOptions.map((option) => (
                <MenuItem key={option.id} value={option.prefix}>
                  {option.prefix}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                ไม่มีข้อมูล
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          id="name"
          label="ชื่อ"
          variant="outlined"
          sx={{
            minWidth: 167,
            ...sharedStyles(errors.name, name),
          }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors({ ...errors, name: false }); // Clear the error as the user starts typing
            }
          }}
        />
        <TextField
          id="surname"
          label="นามสกุล"
          variant="outlined"
          sx={{
            minWidth: 167,
            ...sharedStyles(errors.surname, surname),
          }}
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            if (errors.surname) {
              setErrors({ ...errors, surname: false }); // Clear the error as the user starts typing
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="เลขที่บัตรประชาชน"
          variant="outlined"
          sx={{
            minWidth: 167,
            ...sharedStyles(errors.id, id),
          }}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (errors.id) {
              setErrors({ ...errors, id: false }); // Clear the error as the user starts typing
            }
          }}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-1/5"
            label="วัน/เดือน/ปี เกิด *"
            value={birthdate}
            sx={{
              minWidth: 167,
              ...sharedStyles(errors.birthdate, birthdate),
            }}
            onAccept={(e) =>
              e
                ? handleChange("birthdate", e)
                : handleChange("birthdate", birthdate)
            }
            onChange={(e) => {
              setBirthdate(e);
              handleChange("birthdate", e); // Perform validation directly on change
              if (errors.birthdate) {
                setErrors({ ...errors, birthdate: false }); // Clear the error as the user starts typing
              }
            }}
            disableFuture
          />
        </LocalizationProvider>

        <TextField
          id="outlined-basic"
          label="สัญชาติ"
          variant="outlined"
          sx={{
            maxWidth: 120,
            ...sharedStyles(errors.nationality, nationality),
          }}
          value={nationality}
          onChange={(e) => {
            setNationality(e.target.value);
            if (errors.nationality) {
              setErrors({ ...errors, nationality: false }); // Clear the error as the user starts typing
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="เชื้อชาติ"
          variant="outlined"
          sx={{
            maxWidth: 120,
            ...sharedStyles(errors.ethnicity, ethnicity),
          }}
          value={ethnicity}
          onChange={(e) => {
            setEthnicity(e.target.value);
            if (errors.ethnicity) {
              setErrors({ ...errors, ethnicity: false }); // Clear the error as the user starts typing
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="ศาสนา"
          variant="outlined"
          sx={{
            maxWidth: 120,
            ...sharedStyles(errors.religion, religion),
          }}
          value={religion}
          onChange={(e) => {
            setReligion(e.target.value);
            if (errors.religion) {
              setErrors({ ...errors, religion: false }); // Clear the error as the user starts typing
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="การศึกษา"
          variant="outlined"
          sx={{
            maxWidth: 120,
            ...sharedStyles(errors.education, education),
          }}
          value={education}
          onChange={(e) => {
            setEducation(e.target.value);
            if (errors.education) {
              setErrors({ ...errors, education: false }); // Clear the error as the user starts typing
            }
          }}
        />
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        <FormControl
          sx={{
            minWidth: 230,
            ...sharedStyles(errors.marriage, marriage),
          }}
        >
          <InputLabel id="marital-select-label">สถานภาพ *</InputLabel>
          <Select
            labelId="marital-select-label"
            id="marital-select"
            value={marriage}
            onChange={(e) => {
              setMarriage(e.target.value); // Update name state
              if (errors.marriage) {
                setErrors({ ...errors, marriage: false }); // Clear the error as the user starts typing
              }
            }}
            label="สถานภาพ *"
          >
            {Array.isArray(marital) && marital.length > 0 ? (
              marital.map((option) => (
                <MenuItem key={option.id} value={option.maritalStatus}>
                  {option.maritalStatus}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                ไม่มีข้อมูล
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="หมายเลขโทรศัพท์"
          variant="outlined"
          sx={{
            minWidth: 150,
            ...sharedStyles(errors.phoneNumber, phoneNumber),
          }}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value); // Update name state
            if (errors.phoneNumber) {
              setErrors({ ...errors, phoneNumber: false }); // Clear the error as the user starts typing
            }
          }}
        />
      </div>
      <div className="mt-10">
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

export default InfoForm;
