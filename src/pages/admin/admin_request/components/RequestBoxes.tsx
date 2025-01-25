import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { post } from "../../../../services/api";
import { useCookies } from "react-cookie";
import { Approve } from "./Modal";

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

const CaseBox: React.FC = () => {
  const [data, setData] = useState<ApiResponse["data"] | null>(null);
  const [cookies] = useCookies(["auth_token"]);

  const fetchData = async () => {
    try {
      const response = (await post("/api/viewAllWaitingCase", {
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

  const handleDisapprove = async (cid: number) => {
    try {
      const response = await post("/api/caseDenied", {
        cid,
        token: cookies["auth_token"],
      });

      if (response) {
        console.log(`Case ${cid} disapproved successfully`);
        window.location.reload();
      } else {
        console.error("Failed to disapprove case");
      }
    } catch (error) {
      console.error("Error disapproving case:", error);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <Box
            key={item.cid}
            sx={{
              p: 2,
              border: "2px solid black",
              borderRadius: 2,
              width: "1200px",
              position: "relative",
            }}
          >
            <div>Name: {item.name || "N/A"}</div>
            <div>Topic: {item.topic.join(", ") || "N/A"}</div>
            <div>Description: {item.description || "N/A"}</div>
            <div style={{ marginTop: "10px", textAlign: "end" }}>
              <Approve cid={item.cid} /> {/* Pass the cid to Approve */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#D72525",
                  color: "white",
                  width: "120px",
                  height: "40px",
                  "&:focus": {
                    outline: "none",
                  },
                  "&:active": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
                onClick={() => handleDisapprove(item.cid)}
              >
                Disapprove
              </Button>
            </div>
          </Box>
        ))
      ) : (
        <div style={{ color: "red", textAlign: "center" }}>No case</div>
      )}
    </Box>
  );
};

export default CaseBox;
