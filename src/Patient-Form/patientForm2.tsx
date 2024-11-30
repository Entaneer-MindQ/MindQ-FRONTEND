import React from "react";
import "./patientForm.css";
import { useAppController } from "./patientFormController";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const App: React.FC = () => {
  const {
    prefix,
    setPrefix,
    prefixOptions,
    // setPrefixOptions,
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
    marriage,
    setMarriage,
    marital,
    // setMarital,
    education,
    setEducation,
    caseDate,
    setCaseDate,
    HN,
    setHN,
    illness,
    setIllness,
    privilege,
    setPrivilege,
    privilegeAvailable,
    setPrivilegeAvailable,
  } = useAppController();

  return (
    <>
      <h1>ส่งแบบฟอร์ม</h1>
      <div className="flex gap-4">
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="prefix-select-label">คำนำหน้า</InputLabel>
          <Select
            labelId="prefix-select-label"
            id="prefix-select"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            autoWidth
            label="คำนำหน้า *"
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
          id="outlined-basic"
          label="ชื่อ"
          variant="outlined"
          sx={{ minWidth: 250 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="นามสกุล"
          variant="outlined"
          sx={{ minWidth: 250 }}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="เลขที่บัตรประชาชน"
          variant="outlined"
          sx={{ minWidth: 250 }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="mt-4 flex gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-1/5"
            label="วัน/เดือน/ปี เกิด"
            value={birthdate}
            onChange={(e) => setBirthdate(e)}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="สัญชาติ"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="เชื้อชาติ"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={ethnicity}
          onChange={(e) => setEthnicity(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="ศาสนา"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          required
        />
      </div>
      <div className="mt-4 flex gap-4">
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="marital-select-label">สถานภาพ</InputLabel>
          <Select
            labelId="marital-select-label"
            id="marital-select"
            value={marriage}
            onChange={(e) => setMarriage(e.target.value)}
            autoWidth
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
          label="การศึกษา"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-1/5"
            label="วันที่รับเคส"
            value={caseDate}
            onChange={(e) => setCaseDate(e)}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="HN"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={HN}
          onChange={(e) => setHN(e.target.value)}
          required
        />
      </div>
      <div className="mt-4 flex gap-4">
        <TextField
          id="outlined-basic"
          label="โรค"
          variant="outlined"
          sx={{ minWidth: 918 }}
          value={illness}
          onChange={(e) => setIllness(e.target.value)}
          required
        />
      </div>
      <div className="mt-4 flex gap-4">
        <TextField
          id="outlined-basic"
          label="สิทธิการรักษา"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={privilege}
          onChange={(e) => setPrivilege(e.target.value)}
        />
        {privilege ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={privilegeAvailable}
                onChange={(e) => setPrivilegeAvailable(e.target.checked)}
              />
            }
            label="ใช้สิทธิ์ได้"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default App;
