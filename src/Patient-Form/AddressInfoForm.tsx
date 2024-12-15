// import React, { useContext } from "react";
// import "./patientForm.css";
// import { useAppController } from "./patientFormController";
// import {
//   TextField,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
//   Button,
//   Stack,
//   Stepper,
//   Step,
//   StepLabel,
//   Autocomplete,
// } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIos";
// import PatientContext from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const AddressForm: React.FC = () => {
//   const {
//     QontoConnector,
//     QontoStepIcon,
//     steps,
//     addressErrors,
//     setAddressErrors,
//     sharedStyles,
//     handlePersonalInfoSubmit,
//   } = useAppController();

//   const { province, setProvince, provs } = useContext(PatientContext);

//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="fixed-stepper">
//         <h1 className="mb-5">ส่งแบบฟอร์ม</h1>
//         <Stack sx={{ width: "100%" }} spacing={4}>
//           <Stepper
//             alternativeLabel
//             activeStep={1}
//             connector={<QontoConnector />}
//           >
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel
//                   StepIconComponent={QontoStepIcon}
//                   sx={{
//                     "& .MuiStepLabel-label": {
//                       // fontFamily: "Noto Serif Thai",
//                       fontSize: 17,
//                     },
//                   }}
//                 >
//                   {label}
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Stack>
//       </div>
//       <div className="flex gap-4">
//         <FormControl
//           sx={{
//             minWidth: 200,
//             ...sharedStyles(addressErrors.province, province),
//           }}
//         >
//           <Autocomplete
//             id="province-autocomplete"
//             options={provs.map((option) => option.province)} // Array of options
//             value={province} // Current selected value
//             onChange={(e, newValue) => {
//               setProvince(newValue || ""); // Update name state
//               if (addressErrors.province) {
//                 setAddressErrors({ ...addressErrors, province: false }); // Clear the error as the user starts typing
//               }
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="จังหวัด *"
//                 error={!!addressErrors.province} // Display error state
//                 helperText={addressErrors.province ? "กรุณาเลือกจังหวัด" : ""}
//               />
//             )}
//             noOptionsText="ไม่มีข้อมูล" // Display when no options are available
//           />
//         </FormControl>
//       </div>
//       <div className="fixed-bottom-bar">
//         <Button
//           variant="contained"
//           size="large"
//           sx={{
//             padding: "16px 32px",
//             fontSize: "1.25rem",
//             minWidth: "150px",
//             backgroundColor: "#784af4",
//             "&:focus": {
//               outline: "none",
//             },
//           }}
//           onClick={() => navigate("/patient-form/")}
//           startIcon={<ArrowBackIosNewIcon />}
//         >
//           กลับ
//         </Button>
//         <Button
//           variant="contained"
//           size="large"
//           sx={{
//             padding: "16px 32px",
//             fontSize: "1.25rem",
//             minWidth: "150px",
//             backgroundColor: "#784af4",
//             "&:focus": {
//               outline: "none",
//             },
//           }}
//           onClick={handlePersonalInfoSubmit}
//           endIcon={<ArrowForwardIosIcon />}
//         >
//           ต่อไป
//         </Button>
//       </div>
//     </>
//   );
// };

// export default AddressForm;
