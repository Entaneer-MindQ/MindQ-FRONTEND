import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { post } from "../../services/api";

interface ApiResponse {
  status: number;
  data: Array<{}>;
}

const Export: React.FC = () => {
  const [year, setYear] = useState<string>("2024");
  const [category, setCategory] = useState<string>("ประเด็นขอรับคำปรึกษา");
  const [cookies] = useCookies(["auth_token"]);
  const [data, setData] = useState<ApiResponse["data"] | null>(null);

  const fetchData = async () => {
    try {
      const requestBody = { token: cookies["auth_token"] };
      const response = (await post("/api/test", requestBody)) as ApiResponse;

      if (response?.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Export Files
        </h2>
        <div className="flex flex-col gap-4">
          <TextField
            label="Years"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>หมวดหมู่</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="ประเด็นขอรับคำปรึกษา">
                ประเด็นขอรับคำปรึกษา
              </MenuItem>
              <MenuItem value="ระดับความเสี่ยง">ระดับความเสี่ยง</MenuItem>
              <MenuItem value="ภาควิชา(นักศึกษา)">ภาควิชา(นักศึกษา)</MenuItem>
              <MenuItem value="ปีการศึกษา(นักศึกษา)">
                ปีการศึกษา(นักศึกษา)
              </MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth>
            Export Files ประจำปี
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Export;
