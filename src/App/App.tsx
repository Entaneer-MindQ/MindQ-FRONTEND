import React, { useState, useEffect } from "react";
import "./App.css";
import { useAppController } from "./AppController";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App: React.FC = () => {
  const {
    prefix,
    setPrefix,
    name,
    setName,
    surname,
    setSurname,
    id,
    setId,
    ethnicity,
    setEthnicty,
    nationality,
    setNationality,
    religion,
    setReligion,
    marriage,
    setMarriage,
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
  } = useAppController();
  return (
    <>
      <h1>ส่งแบบฟอร์ม</h1>
      <div className="flex gap-4">
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-autowidth-label" required>
            คำนำหน้า
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            autoWidth
            label="คำนำหน้า * "
          >
            <MenuItem value={20}>นาย</MenuItem>
            <MenuItem value={21}>นาง</MenuItem>
            <MenuItem value={22}>นางสาว</MenuItem>
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
          <DatePicker className="w-1/5" />
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
          onChange={(e) => setEthnicty(e.target.value)}
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
        <TextField
          id="outlined-basic"
          label="สถานภาพ"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={marriage}
          onChange={(e) => setMarriage(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="การศึกษา"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="วันที่รับเคส"
          variant="outlined"
          sx={{ minWidth: 200 }}
          value={caseDate}
          onChange={(e) => setCaseDate(e.target.value)}
          required
        />
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
          value={illness}
          onChange={(e) => setIllness(e.target.value)}
        />
      </div>
    </>
  );
};

export default App;
