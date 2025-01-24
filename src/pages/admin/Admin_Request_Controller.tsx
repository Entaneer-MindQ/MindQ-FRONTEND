import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal, TextField } from "@mui/material";
import { Button } from "@mui/material";

export function Approve() {
  const [MindCode, setMindCode] = useState<string | "">("");
  const [MindCodeError, setMindCodeError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setMindCode("");
    setMindCodeError(false);
    setOpen(false);
  };
  const handleSubmit = () => {
    if (MindCode !== "") setOpen(false);
    else setMindCodeError(true);
    setMindCode(""); // if push mind code to database successfully then reset the mind code dummy
  };
  //   const handleSubmit = () => {
  //     const MindCode = {
  //         province: !province,
  //         amphure: !amphure,
  //         tambon: !tambon,
  //         zipCode: !zipCode,
  //       };
  //       setAddressErrors(newAddressErrors);
  //       if (!Object.values(newAddressErrors).some((error) => error)) {
  //         navigate("/patient-form/2");
  //       }
  //   };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#29A723",
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
          marginRight: "10px", // Add spacing between buttons
        }}
        onClick={handleOpen}
      >
        Approve
      </Button>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <div
            style={{ fontSize: "30px" }}
            id="parent-modal-title"
            className="modal-title"
          >
            Approve
          </div>
          <TextField
            required
            label="Mind Code"
            error={!!MindCodeError}
            value={MindCode}
            onChange={(e) => {
              setMindCode(e.target.value);
              if (MindCode === "") setMindCodeError(true);
              else setMindCodeError(false);
            }}
          />
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#29A723",
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
                marginRight: "10px", // Add spacing between buttons
              }}
              onClick={handleSubmit}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                width: "120px",
                height: "40px",
                "&:focus": {
                  outline: "none", // Remove the outline on focus
                },
                "&:active": {
                  outline: "none", // Remove outline when active
                  boxShadow: "none", // Remove any active shadow
                },
                "&:hover": {
                  borderColor: "red",
                },
                marginRight: "10px", // Add spacing between buttons
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
