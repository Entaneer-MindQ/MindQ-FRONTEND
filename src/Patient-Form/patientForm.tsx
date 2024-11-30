import React, { useState } from "react";
import "./patientForm.css";
import { useAppController } from "./patientFormController";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SendIcon from "@mui/icons-material/Send";

const App: React.FC = () => {
  const {
    prefix,
    setPrefix,
    prefixOptions,
    name,
    setName,
    surname,
    setSurname,
    id,
    setId,
    birthdate,
    setBirthdate,
    ethnicity,
    setEthnicity,
    nationality,
    setNationality,
    religion,
    setReligion,
    marriage,
    setMarriage,
    marital,
    QontoConnector,
    QontoStepIcon,
    steps,
    errors,
    setErrors,
    handleChange,
  } = useAppController();

  const handleSubmit = () => {
    const newErrors = {
      name: !name,
      surname: !surname,
      id: !id,
      nationality: !nationality,
      ethnicity: !ethnicity,
      religion: !religion,
      prefix: !prefix,
      marriage: !marriage,
      birthdate: birthdate === null, // Check if birthdate is null
    };
    setErrors(newErrors);

    // Check if there are no errors before submitting
    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Form submitted!");
    }
  };

  return (
    <>
      <h1>ส่งแบบฟอร์ม</h1>
      <div className="mt-10 mb-10">
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={0}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
      <div className="flex gap-4">
        <FormControl
          sx={{
            minWidth: 155,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.prefix
                  ? "red" // If there is an error, set border color to red
                  : prefix // If prefix is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If prefix is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.prefix ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.prefix
                  ? "red" // Hover state with error
                  : prefix // If prefix is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.prefix
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.prefix
                ? "red" // Label color in error state
                : prefix // If prefix is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.prefix ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
        >
          <InputLabel
            id="marital-select-label"
            sx={{
              color: errors.prefix
                ? "red" // Error label color
                : prefix
                ? "#784af4" // Filled label color
                : "#8c8c8c", // Unfilled label color
              "&.Mui-focused": {
                color: errors.prefix ? "red" : "#784af4", // Focused label color when filled or error state
              },
            }}
          >
            คำนำหน้า
          </InputLabel>
          <Select
            labelId="marital-select-label"
            id="marital-select"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            autoWidth
            label="สถานภาพ *"
            onBlur={() => handleChange("prefix", prefix)}
            sx={{
              // Apply border color and focus/hover states
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.prefix
                    ? "red" // Error state
                    : prefix
                    ? "#784af4" // Filled state (if prefix has a value)
                    : "#8c8c8c", // Default state (unfilled and not focused)
                  borderWidth: "2px",
                },
                // Focus: border color stays #784af4 when filled, or red if error
                "&.Mui-focused fieldset": {
                  borderColor: errors.prefix
                    ? "red" // Hover in error state
                    : prefix
                    ? "#784af4" // Hover when filled
                    : "#8c8c8c", // Hover when unfilled
                },
                // Hover: border color should not change if filled
                "&:hover fieldset": {
                  borderColor: errors.prefix
                    ? "red" // Hover in error state
                    : prefix
                    ? "#784af4" // Hover when filled
                    : "#8c8c8c", // Hover when unfilled
                },
              },
            }}
          >
            {Array.isArray(prefixOptions) && prefixOptions.length > 0 ? (
              prefixOptions.map((option) => (
                <MenuItem key={option.id} value={option.prefix}>
                  {option.prefix}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                ไม่มีข้อมูล
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="ชื่อ"
          variant="outlined"
          sx={{
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.name
                  ? "red" // If there is an error, set border color to red
                  : name // If name is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If name is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.name ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.name
                  ? "red" // Hover state with error
                  : name // If name is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.name
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.name
                ? "red" // Label color in error state
                : name // If name is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.name ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleChange("name", name)}
          required
        />

        <TextField
          id="outlined-basic"
          label="นามสกุล"
          variant="outlined"
          sx={{
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.surname
                  ? "red" // If there is an error, set border color to red
                  : surname // If surname is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If surname is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.surname ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.surname
                  ? "red" // Hover state with error
                  : surname // If surname is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.surname
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.surname
                ? "red" // Label color in error state
                : surname // If surname is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.surname ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          onBlur={() => handleChange("surname", surname)}
          required
        />
        <TextField
          id="outlined-basic"
          label="เลขที่บัตรประชาชน"
          variant="outlined"
          sx={{
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.id
                  ? "red" // If there is an error, set border color to red
                  : id // If id is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If id is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.id ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.id
                  ? "red" // Hover state with error
                  : id // If id is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.id
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.id
                ? "red" // Label color in error state
                : id // If id is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.id ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          onBlur={() => handleChange("id", id)}
          required
        />
      </div>
      <div className="mt-4 flex gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-1/5"
            label="วัน/เดือน/ปี เกิด"
            value={birthdate}
            sx={{
              maxWidth: 160,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.birthdate
                    ? "red" // If there's an error, set border color to red
                    : birthdate != null // If birthdate is filled, set border color to #784af4, else #787878
                    ? "#784af4"
                    : "#787878", // If birthdate is unfilled and not focused, set to #787878
                  borderWidth: "2px",
                },
                "& .MuiInputBase-input": {
                  color: errors.birthdate ? "red" : "#784af4", // Set text color to #784af4 when filled
                },
                "&:hover fieldset": {
                  borderColor: errors.birthdate
                    ? "red" // Hover state with error
                    : birthdate != null // If birthdate is filled, set border color to #784af4
                    ? "#784af4"
                    : "#787878", // Hover state with empty input
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.birthdate
                    ? "red" // If there's an error, keep red on focus
                    : "#784af4", // Focused border color when filled
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.birthdate
                  ? "red" // Label color in error state
                  : birthdate != null // If birthdate is filled, label color will be #784af4
                  ? "#784af4"
                  : "#787878", // Label color if unfilled and not focused (#787878)
                "&.Mui-focused": {
                  color: errors.birthdate ? "red" : "#784af4", // Focused label color when filled or error state
                },
              },
            }}
            onChange={(e) => {
              setBirthdate(e);
              handleChange("birthdate", e); // Perform validation directly on change
            }}
          />
        </LocalizationProvider>

        <TextField
          id="outlined-basic"
          label="สัญชาติ"
          variant="outlined"
          sx={{
            maxWidth: 155,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.nationality
                  ? "red" // If there is an error, set border color to red
                  : nationality // If nationality is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If nationality is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.nationality ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.nationality
                  ? "red" // Hover state with error
                  : nationality // If nationality is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.nationality
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.nationality
                ? "red" // Label color in error state
                : nationality // If nationality is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.nationality ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          onBlur={() => handleChange("nationality", nationality)}
          required
        />
        <TextField
          id="outlined-basic"
          label="เชื้อชาติ"
          variant="outlined"
          sx={{
            maxWidth: 155,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.ethnicity
                  ? "red" // If there is an error, set border color to red
                  : ethnicity // If ethnicity is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If ethnicity is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.ethnicity ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.ethnicity
                  ? "red" // Hover state with error
                  : ethnicity // If ethnicity is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.ethnicity
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.ethnicity
                ? "red" // Label color in error state
                : ethnicity // If ethnicity is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.ethnicity ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={ethnicity}
          onChange={(e) => setEthnicity(e.target.value)}
          onBlur={() => handleChange("ethnicity", ethnicity)}
          required
        />
        <TextField
          id="outlined-basic"
          label="ศาสนา"
          variant="outlined"
          sx={{
            maxWidth: 155,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.religion
                  ? "red" // If there is an error, set border color to red
                  : religion // If religion is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If religion is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.religion ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.religion
                  ? "red" // Hover state with error
                  : religion // If religion is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.religion
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.religion
                ? "red" // Label color in error state
                : religion // If religion is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.religion ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          onBlur={() => handleChange("religion", religion)}
          required
        />
        <FormControl
          sx={{
            minWidth: 155,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.marriage
                  ? "red" // If there is an error, set border color to red
                  : marriage // If marriage is filled, set border color to #784af4, else #787878
                  ? "#784af4"
                  : "#787878", // If marriage is unfilled and not focused, set to #787878
                borderWidth: "2px",
              },
              "& .MuiInputBase-input": {
                color: errors.marriage ? "red" : "#784af4", // Set text color to #784af4 when filled
              },
              "&:hover fieldset": {
                borderColor: errors.marriage
                  ? "red" // Hover state with error
                  : marriage // If marriage is filled, set border color to #784af4
                  ? "#784af4"
                  : "#787878", // Hover state with empty input
              },
              "&.Mui-focused fieldset": {
                borderColor: errors.marriage
                  ? "red" // If there is an error, keep red on focus
                  : "#784af4", // Focused border color when filled
              },
            },
            "& .MuiInputLabel-root": {
              color: errors.marriage
                ? "red" // Label color in error state
                : marriage // If marriage is filled, label color will be #784af4
                ? "#784af4"
                : "#787878", // Label color if unfilled and not focused (#787878)
              "&.Mui-focused": {
                color: errors.marriage ? "red" : "#784af4", // Focused label color when filled or error state
              },
            },
          }}
        >
          <InputLabel
            id="marital-select-label"
            sx={{
              color: errors.marriage
                ? "red" // Error label color
                : marriage
                ? "#784af4" // Filled label color
                : "#8c8c8c", // Unfilled label color
              "&.Mui-focused": {
                color: errors.marriage ? "red" : "#784af4", // Focused label color when filled or error state
              },
            }}
          >
            สถานภาพ
          </InputLabel>
          <Select
            labelId="marital-select-label"
            id="marital-select"
            value={marriage}
            onChange={(e) => setMarriage(e.target.value)}
            autoWidth
            label="สถานภาพ *"
            onBlur={() => handleChange("marriage", marriage)}
            sx={{
              // Apply border color and focus/hover states
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.marriage
                    ? "red" // Error state
                    : marriage
                    ? "#784af4" // Filled state (if marriage has a value)
                    : "#8c8c8c", // Default state (unfilled and not focused)
                  borderWidth: "2px",
                },
                // Focus: border color stays #784af4 when filled, or red if error
                "&.Mui-focused fieldset": {
                  borderColor: errors.marriage
                    ? "red" // Hover in error state
                    : marriage
                    ? "#784af4" // Hover when filled
                    : "#8c8c8c", // Hover when unfilled
                },
                // Hover: border color should not change if filled
                "&:hover fieldset": {
                  borderColor: errors.marriage
                    ? "red" // Hover in error state
                    : marriage
                    ? "#784af4" // Hover when filled
                    : "#8c8c8c", // Hover when unfilled
                },
              },
            }}
          >
            {Array.isArray(marital) && marital.length > 0 ? (
              marital.map((option) => (
                <MenuItem key={option.id} value={option.maritalStatus}>
                  {option.maritalStatus}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                ไม่มีข้อมูล
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      <div className="mt-10">
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: "16px 32px",
            fontSize: "1.25rem",
            minWidth: "150px",
            backgroundColor: "#784af4",
          }}
          onClick={handleSubmit}
          endIcon={<SendIcon />}
        >
          ต่อไป
        </Button>
      </div>
    </>
  );
};

export default App;
