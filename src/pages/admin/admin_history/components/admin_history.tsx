import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { post } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface MindData {
  mind_code: string;
  phone: string;
  nickname: string;
}

interface ApiResponse {
  status: number;
  data: Array<MindData>;
}

const AdviseeHistory: React.FC = () => {
  const [data, setData] = useState<ApiResponse["data"]>([]);
  const [cookies] = useCookies(["auth_token"]);
  const [year, setYear] = useState("2024");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const handleViewDetails = (mindCode: string) => {
    navigate(`/history/${mindCode}`);
  };

  const fetchData = async () => {
    try {
      const response = (await post("/api/getAllUser", {
        token: cookies["auth_token"],
      })) as ApiResponse;

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  // Updated filter to include nickname
  const filteredData = data.filter((item) =>
    item.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box className="p-6">
      <Typography variant="h5" className="mb-6">
        Advisees History
      </Typography>

      <Box className="flex justify-between mb-6 items-center">
        <Box className="flex items-center gap-2">
          <Typography>Years</Typography>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-32"
            size="small"
          >
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </Box>

        <Box className="flex items-center gap-2 ml-8">
          <Typography>Search ชื่อเล่น:</Typography>
          <TextField
            placeholder="Type Here"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>

      <Typography className="font-medium mb-4">ผู้ใช้บริการทั้งหมด</Typography>

      <Box className="w-full">
        <table className="w-full border-collapse text-center">
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="p-2">
                  {item.mind_code ||
                    `2024/${(startIndex + index + 1)
                      .toString()
                      .padStart(3, "0")}`}
                </td>
                <td className="p-2">{item.nickname}</td>
                <td className="p-2">{item.phone || "081-xxxxxxx"}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleViewDetails(item.mind_code)}
                    className="text-blue-600 hover:underline hover:bg-blue-400 cursor-pointer bg-transparent border-none p-0"
                  >
                    คลิกเพื่อดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Box className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border ${
              page === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </Box>
    </Box>
  );
};

export default AdviseeHistory;
