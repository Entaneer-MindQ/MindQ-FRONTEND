import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { post } from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import YearSelector from "../../../../components/YearSelector/YearSelector";

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
  const [year, setYear] = useState(new Date().getFullYear().toString());
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

  const filteredData = data.filter(
    (item) =>
      item.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.mind_code?.toLowerCase().includes(year.toLowerCase())
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

  const renderPaginationButtons = () => {
    const buttons = [];

    // Always show first page
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 border ${
          page === 1 ? "bg-blue-500 text-white" : ""
        }`}
      >
        1
      </button>
    );

    // Calculate range around current page
    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      buttons.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      );
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border ${
            page === i ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      buttons.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 border ${
            page === totalPages ? "bg-blue-500 text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <Box className="p-6">
      <Typography variant="h5" className="mb-6">
        Advisees History
      </Typography>

      <Box className="flex justify-between mb-6 items-center">
        <Box className="flex items-center gap-2">
          <YearSelector
            value={year}
            onChange={(newValue) => setYear(newValue)}
          />
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
        {renderPaginationButtons()}
      </Box>
    </Box>
  );
};

export default AdviseeHistory;
