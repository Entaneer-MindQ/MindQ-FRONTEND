import React, { useState, useEffect } from "react";
import { Box, Tab, NativeSelect } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { post } from "../../services/api";

interface ApiResponse {
  status: number;
  data: Array<{
    cid: number;
    personalID: string;
    name: string;
    topic: string[];
    description: string;
    role: string;
    facebook: string;
    email: string;
    created_at: string;
    updated_at: string;
  }>;
}

const PatientHistory: React.FC = () => {
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [cookies] = useCookies(["auth_token"]);
  console.log(cookies);
  const fetchData = async () => {
    try {
      const response = (await post("/api/viewAllOpeningCase", {
        token: cookies["auth_token"],
      })) as ApiResponse;

      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cookies]);

  const [year, setYear] = useState<string>();
  const [tab, setTab] = useState<string>("1");

  const handleYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setYear(event.target.value as string);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const registeredPatients = [
    { id: "2025/001", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/002", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/003", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/004", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/005", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/006", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/007", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/008", detail: "กดเพื่อดูรายละเอียด" },
    { id: "2025/009", detail: "กดเพื่อดูรายละเอียด" },
  ];

  const newPatients = [
    { id: "N2025/001", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/002", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/003", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/004", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/005", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/006", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/007", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/008", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
    { id: "N2025/009", detail: "ผู้ป่วยใหม่ รายละเอียดที่นี่" },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          p: 2,
        }}
      >
        <Box
          component="section"
          sx={{
            p: 2,
            fontSize: "40px",
            fontWeight: "bold",
            alignItems: "flex-start",
          }}
        >
          Patients History
        </Box>
        <Box
          sx={{
            p: 2,
            fontSize: "25px",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <label htmlFor="year-select" style={{ marginRight: "10px" }}>
              Years
            </label>

            <FormControl>
              <NativeSelect defaultValue={year}>
                <option value={2025}>2025</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList
              sx={{
                display: "flex", // ใช้ Flexbox
                justifyContent: "center", // จัดกึ่งกลาง
                width: "100%", // ให้ TabList ขยายเต็มความกว้าง
              }}
              onChange={handleTabChange}
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab
                label="ผู้ป่วยลงทะเบียนแล้ว"
                value="1"
                sx={{
                  flexGrow: 1, // ให้ Tab ขยายตัวตามพื้นที่ว่าง
                  maxWidth: "none", // ปิดการจำกัดความกว้าง
                }}
              />
              <Tab
                label="ผู้ป่วยใหม่"
                value="2"
                sx={{
                  flexGrow: 1, // ให้ Tab ขยายตัวตามพื้นที่ว่าง
                  maxWidth: "none", // ปิดการจำกัดความกว้าง
                }}
              />
            </TabList>
          </Box>

          {/* TabPanel for Registered Patients */}
          <TabPanel value="1">
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 400,
                overflow: "auto", // เพิ่ม Scroll ได้
              }}
            >
              <Table stickyHeader>
                <TableBody>
                  {registeredPatients.map((patient, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                      }}
                    >
                      <TableCell sx={{ color: "black" }}>
                        {patient.id}
                      </TableCell>
                      <TableCell>
                        <Link href="#" underline="hover" color="primary">
                          {patient.detail}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* TabPanel for New Patients */}
          <TabPanel value="2">
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 400,
                overflow: "auto", // เพิ่ม Scroll ได้
              }}
            >
              <Table stickyHeader>
                <TableBody>
                  {newPatients.map((patient, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                      }}
                    >
                      <TableCell sx={{ color: "black" }}>
                        {patient.id}
                      </TableCell>
                      <TableCell>
                        <Link href="#" underline="hover" color="primary">
                          {patient.detail}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default PatientHistory;
