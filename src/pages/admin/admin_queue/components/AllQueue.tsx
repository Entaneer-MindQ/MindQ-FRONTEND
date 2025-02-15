import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Pagination } from "@mui/material";
import { post } from "../../../../services/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  status: number;
  data: Array<{
    qid: number;
    case_id: number;
    mind_code: string;
    date: string;
    created_at: string;
    updated_at: string;
  }>;
}

const AllQueue: React.FC = () => {
  const [data, setData] = useState<ApiResponse["data"]>([]);
  const [cookies] = useCookies(["auth_token"]);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // Move useNavigate to the top level

  const fetchData = async () => {
    try {
      const response = (await post("/api/viewAllQueue", {
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

  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleQueueInformation = (qid: number) => {
    navigate(`/admin-queue/details?queue_id=${qid}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <Box
              key={item.qid}
              sx={{
                p: 2,
                border: "2px solid black",
                borderRadius: 2,
                width: "100%",
                maxWidth: "800px",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Queue ID: {item.qid || "N/A"}</Typography>
                <Typography>Case ID: {item.case_id || "N/A"}</Typography>
                <Typography>Mind Code: {item.mind_code || "N/A"}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleQueueInformation(item.qid)}
                >
                  View Queue
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography color="error" textAlign="center">No cases available</Typography>
        )}
      </Box>
      {data.length > itemsPerPage && (
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
};

export default AllQueue;