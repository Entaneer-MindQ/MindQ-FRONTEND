import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { post } from "../../services/api";

interface ApiResponse {
  status: number;
  data: Array<{
    mind_code: string;
    nickname: string;
    phone: string;
  }>;
}

const ITEMS_PER_PAGE = 15; // จำนวนข้อมูลต่อหน้า

const PatientHistory: React.FC = () => {
  const [year, setYear] = useState<string>("2024");
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [page, setPage] = useState<number>(1); // หน้าปัจจุบัน
  const [cookies] = useCookies(["auth_token"]);

  // เปลี่ยนปี
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  // ค้นหาคนไข้
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // รีเซ็ตไปหน้าแรกเมื่อค้นหาใหม่
  };

  // เปลี่ยนหน้า
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // ดึงข้อมูลจาก API
  const fetchData = async () => {
    try {
      const requestBody = { token: cookies["auth_token"] };
      const response = (await post(
        "/api/viewAllOpenigzipperOpeningCaseAndMindData",
        requestBody
      )) as ApiResponse;

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

  // กรองข้อมูลตาม search
  const filteredPatients = data
    ? data.filter(
        (patient) =>
          patient.nickname.includes(search) ||
          patient.mind_code.includes(search)
      )
    : [];

  // คำนวณหน้าที่ต้องแสดง
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const displayedPatients = filteredPatients.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center", p: 2 }}>
      {/* Header */}
      <Box sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
        กรุณาเลือกคนไข้เพื่อนัดเคสต่อ
      </Box>

      {/* Year & Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <FormControl>
          <NativeSelect value={year} onChange={handleYearChange}>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </NativeSelect>
        </FormControl>

        <TextField
          variant="outlined"
          size="small"
          placeholder="ค้นหาชื่อ หรือรหัสคนไข้"
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflowY: "auto" }}
      >
        <Table>
          <TableBody>
            {displayedPatients.length > 0 ? (
              displayedPatients.map((patient, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>
                    {patient.mind_code} - {patient.nickname}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" size="small">
                      จองคิว
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
};

export default PatientHistory;
