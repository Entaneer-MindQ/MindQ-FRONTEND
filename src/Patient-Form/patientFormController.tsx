// import { Dayjs } from "dayjs";
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import Check from "@mui/icons-material/Check";
// import StepConnector, {
//   stepConnectorClasses,
// } from "@mui/material/StepConnector";
// import { StepIconProps } from "@mui/material/StepIcon";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/UserContext";

// export const useAppController = () => {
//   const {
//     prefix,
//     name,
//     surname,
//     id,
//     birthdate,
//     ethnicity,
//     nationality,
//     religion,
//     marriage,
//     education,
//     province,
//     phoneNumber,
//     setPrefixOptions,
//     setMarital,
//     setEdu,
//     setProvs,
//   } = useContext(PatientContext);
//   const [caseDate, setCaseDate] = useState<Dayjs | null>(null); // set case date
//   const [HN, setHN] = useState(""); // set hospital's number
//   const [illness, setIllness] = useState(""); // set patient's illness
//   const [privilege, setPrivilege] = useState(""); // set hospital's number
//   const [privilegeAvailable, setPrivilegeAvailable] =
//     useState<boolean>(Boolean); // check if the privilege is still available

//   const [infoErrors, setInfoErrors] = useState({
//     name: false,
//     surname: false,
//     id: false,
//     nationality: false,
//     ethnicity: false,
//     religion: false,
//     education: false,
//     prefix: false,
//     marriage: false,
//     birthdate: false,
//     phoneNumber: false,
//   });

//   const handlePersonalInfoSubmit = () => {
//     const newinfoErrors = {
//       name: !name,
//       surname: !surname,
//       id: !id,
//       nationality: !nationality,
//       ethnicity: !ethnicity,
//       religion: !religion,
//       education: !education,
//       prefix: !prefix,
//       marriage: !marriage,
//       birthdate: birthdate === null, // Check if birthdate is null
//       phoneNumber: !phoneNumber,
//     };
//     setInfoErrors(newinfoErrors);
//     if (!Object.values(newinfoErrors).some((error) => error)) {
//       navigate("/patient-form/2");
//     }
//   };

//   const [addressErrors, setAddressErrors] = useState({
//     province: false,
//   });

//   const handleAddressInfoSubmit = () => {
//     const newAddressErrors = {
//       province: !province,
//     };
//     setAddressErrors(newAddressErrors);
//     if (!Object.values(newAddressErrors).some((error) => error)) {
//       navigate("/patient-form/2");
//     }
//   };

//   const navigate = useNavigate();

//   const sharedStyles = (error: any, value: any) => ({
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: error
//           ? "red" // If there is an error, set border color to red
//           : value
//           ? "#784af4" // If value is filled, set border color to #784af4
//           : "#787878", // If value is unfilled and not focused, set to #787878
//         borderWidth: "2px",
//       },
//       "& .MuiInputBase-input": {
//         color: error ? "red" : "#784af4", // Set text color to #784af4 when filled
//       },
//       "&:hover fieldset": {
//         borderColor: error
//           ? "red" // Hover state with error
//           : value
//           ? "#784af4" // If value is filled, set border color to #784af4
//           : "#787878", // Hover state with empty input
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: error ? "red" : "#784af4", // Focused border color
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: error
//         ? "red" // Label color in error state
//         : value
//         ? "#784af4" // Label color when filled
//         : "#787878", // Label color if unfilled and not focused
//       "&.Mui-focused": {
//         color: error ? "red" : "#784af4", // Focused label color
//       },
//     },
//   });

//   const handleBirthdateChange = (
//     field: keyof typeof infoErrors,
//     value: any
//   ) => {
//     // Validate non-DatePicker fields
//     if (field === "birthdate") {
//       setInfoErrors((prev) => ({
//         ...prev,
//         [field]: value === null, // Check if birthdate is null
//       }));
//     } else {
//       setInfoErrors((prev) => ({
//         ...prev,
//         [field]: !value || value.toString().trim() === "", // Check if value is empty or blank
//       }));
//     }
//   };

//   const QontoConnector = styled(StepConnector)(({ theme }) => ({
//     [`&.${stepConnectorClasses.alternativeLabel}`]: {
//       top: 10,
//       left: "calc(-50% + 16px)",
//       right: "calc(50% + 16px)",
//     },
//     [`&.${stepConnectorClasses.active}`]: {
//       [`& .${stepConnectorClasses.line}`]: {
//         borderColor: "#784af4",
//       },
//     },
//     [`&.${stepConnectorClasses.completed}`]: {
//       [`& .${stepConnectorClasses.line}`]: {
//         borderColor: "#784af4",
//       },
//     },
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: "#eaeaf0",
//       borderTopWidth: 3,
//       borderRadius: 1,
//       ...theme.applyStyles("dark", {
//         borderColor: theme.palette.grey[800],
//       }),
//     },
//   }));

//   const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
//     ({ theme }) => ({
//       color: "#eaeaf0",
//       display: "flex",
//       height: 22,
//       alignItems: "center",
//       "& .QontoStepIcon-completedIcon": {
//         color: "#784af4",
//         zIndex: 1,
//         fontSize: 18,
//       },
//       "& .QontoStepIcon-circle": {
//         width: 8,
//         height: 8,
//         borderRadius: "50%",
//         backgroundColor: "currentColor",
//       },
//       ...theme.applyStyles("dark", {
//         color: theme.palette.grey[700],
//       }),
//       variants: [
//         {
//           props: ({ ownerState }) => ownerState.active,
//           style: {
//             color: "#784af4",
//           },
//         },
//       ],
//     })
//   );

//   function QontoStepIcon(props: StepIconProps) {
//     const { active, completed, className } = props;

//     return (
//       <QontoStepIconRoot ownerState={{ active }} className={className}>
//         {completed ? (
//           <Check className="QontoStepIcon-completedIcon" />
//         ) : (
//           <div className="QontoStepIcon-circle" />
//         )}
//       </QontoStepIconRoot>
//     );
//   }

//   const steps = [
//     "ข้อมูลส่วนตัวผู้ป่วย",
//     "ข้อมูลที่อยู่ผู้ป่วย",
//     "รายละเอียดเคส",
//     "การประเมินปัญหา",
//   ];

//   useEffect(() => {
//     const fetchPrefixes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/prefixes"); // Adjust endpoint if necessary
//         // console.log("API Response:", response.data); // Debugging step
//         setPrefixOptions(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching prefixes:", error);
//         setPrefixOptions([]); // Fallback to an empty array
//       }
//     };

//     const fetchMaritals = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/maritals"); // Adjust endpoint if necessary
//         // console.log("API Response:", response.data); // Debugging step
//         setMarital(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching maritals:", error);
//         setMarital([]); // Fallback to an empty array
//       }
//     };

//     const fetchEducations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/educations"
//         ); // Adjust endpoint if necessary
//         // console.log("API Response:", response.data); // Debugging step
//         setEdu(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching educations:", error);
//         setEdu([]); // Fallback to an empty array
//       }
//     };

//     const fetchProvinces = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/provinces"); // Adjust endpoint if necessary
//         // console.log("API Response:", response.data); // Debugging step
//         setProvs(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching provinces:", error);
//         setProvs([]); // Fallback to an empty array
//       }
//     };

//     // Example usage: fetch amphures when province changes
//     fetchPrefixes();
//     fetchMaritals();
//     fetchEducations();
//     fetchProvinces();
//   }, []);

//   return {
//     caseDate,
//     setCaseDate,
//     HN,
//     setHN,
//     illness,
//     setIllness,
//     privilege,
//     setPrivilege,
//     privilegeAvailable,
//     setPrivilegeAvailable,
//     QontoConnector,
//     QontoStepIcon,
//     steps,
//     infoErrors,
//     setInfoErrors,
//     addressErrors,
//     setAddressErrors,
//     sharedStyles,
//     handleBirthdateChange,
//     handlePersonalInfoSubmit,
//     handleAddressInfoSubmit,
//   };
// };
// import { useState } from "react";
// import axios from "axios";
// import { TextField, Button, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export const useLoginController = () => {
//   const [username, setUsername] = useState(""); // Stores the entered username
//   const [password, setPassword] = useState(""); // Stores the entered password
//   const [errors, setErrors] = useState({
//     username: false,
//     password: false,
//   });
//   const [loginError, setLoginError] = useState(""); // For displaying login-specific errors

//   const navigate = useNavigate();

//   const sharedStyles = (error: any) => ({
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: error ? "red" : "#787878",
//       },
//       "&:hover fieldset": {
//         borderColor: error ? "red" : "#784af4",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: error ? "red" : "#784af4",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: error ? "red" : "#787878",
//       "&.Mui-focused": {
//         color: error ? "red" : "#784af4",
//       },
//     },
//   });

//   const handleLogin = async () => {
//     // Validate the inputs
//     const newErrors = {
//       username: !username.trim(),
//       password: !password.trim(),
//     };
//     setErrors(newErrors);

//     // If any field is invalid, don't proceed
//     if (Object.values(newErrors).some((error) => error)) return;

//     try {
//       const response = await axios.post("http://localhost:3000/api/login", {
//         username,
//         password,
//       });

//       // If login is successful, redirect to the dashboard or home page
//       if (response.status === 200) {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       // Handle login errors (e.g., incorrect credentials)
//       setLoginError("Invalid username or password. Please try again.");
//     }
//   };

//   return {
//     username,
//     setUsername,
//     password,
//     setPassword,
//     errors,
//     loginError,
//     handleLogin,
//     sharedStyles,
//   };
// };

// const LoginPage = () => {
//   const {
//     username,
//     setUsername,
//     password,
//     setPassword,
//     errors,
//     loginError,
//     handleLogin,
//     sharedStyles,
//   } = useLoginController();

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         padding: 4,
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>

//       {loginError && (
//         <Typography color="error" sx={{ marginBottom: 2 }}>
//           {loginError}
//         </Typography>
//       )}

//       <TextField
//         label="Username"
//         variant="outlined"
//         fullWidth
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         sx={{ marginBottom: 2, ...sharedStyles(errors.username) }}
//         error={errors.username}
//         helperText={errors.username && "Username is required."}
//       />

//       <TextField
//         label="Password"
//         type="password"
//         variant="outlined"
//         fullWidth
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         sx={{ marginBottom: 2, ...sharedStyles(errors.password) }}
//         error={errors.password}
//         helperText={errors.password && "Password is required."}
//       />

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleLogin}
//         fullWidth
//         sx={{ padding: 1.5 }}
//       >
//         Login
//       </Button>
//     </Box>
//   );
// };

// export default LoginPage;
