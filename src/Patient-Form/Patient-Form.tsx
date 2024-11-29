import React, { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const App: React.FC = () => {
  const [prefix, setPrefix] = React.useState(""); // set patient's prefix
  const [name, setName] = React.useState(""); // set patient's name
  const [surname, setSurname] = React.useState(""); // set patient's surname

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
      </div>
    </>
  );
};

export default App;
