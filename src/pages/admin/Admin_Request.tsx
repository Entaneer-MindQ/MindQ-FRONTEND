import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Approve } from "./Admin_Request_Controller";

const Admin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ padding: "30px", fontSize: "30px" }}>Request Form</div>
        <Box
          component="section"
          sx={{
            p: 2,
            border: "2px solid black",
            borderRadius: 2,
            width: "1200px",
            position: "relative", // Allow absolute positioning inside
          }}
        >
          <div>Name: John Doe</div>
          <div>Status: </div>
          <div>Topic: </div>
          <div>Description: </div>
          <div style={{ marginTop: "10px", textAlign: "end" }}>
            <Approve></Approve>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D72525",
                color: "white",
                width: "120px",
                height: "40px",
                "&:focus": {
                  outline: "none", // Remove the outline on focus
                },
                "&:active": {
                  outline: "none", // Remove outline when active
                  boxShadow: "none", // Remove any active shadow
                },
              }}
            >
              Disapprove
            </Button>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Admin;
