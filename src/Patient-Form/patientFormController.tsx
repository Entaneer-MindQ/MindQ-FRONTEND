import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

export const useAppController = () => {
  const [prefix, setPrefix] = useState(""); // set patient's prefix
  const [prefixOptions, setPrefixOptions] = useState<
    { id: number; prefix: string }[]
  >([]);
  const [name, setName] = useState(""); // set patient's name
  const [surname, setSurname] = useState(""); // set patient's surname
  const [id, setId] = useState(""); // set patient's nickname
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [ethnicity, setEthnicity] = useState(""); // set patient's ethnicity
  const [nationality, setNationality] = useState(""); // set patient's nationality
  const [religion, setReligion] = useState(""); // set patient's religion
  const [marriage, setMarriage] = useState(""); // set patient's marriage
  const [marital, setMarital] = useState<
    { id: number; maritalStatus: string }[]
  >([]);
  const [education, setEducation] = useState(""); // set patient's education
  const [caseDate, setCaseDate] = useState<Dayjs | null>(null); // set case date
  const [HN, setHN] = useState(""); // set hospital's number
  const [illness, setIllness] = useState(""); // set patient's illness
  const [privilege, setPrivilege] = useState(""); // set hospital's number
  const [privilegeAvailable, setPrivilegeAvailable] =
    useState<boolean>(Boolean); // check if the privilege is still available
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    id: false,
    nationality: false,
    ethnicity: false,
    religion: false,
    prefix: false,
    marriage: false,
    birthdate: false,
  });

  const handleChange = (field: keyof typeof errors, value: any) => {
    // Validate non-DatePicker fields
    if (field === "birthdate") {
      setErrors((prev) => ({
        ...prev,
        [field]: value === null, // Check if birthdate is null
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: !value || value.toString().trim() === "", // Check if value is empty or blank
      }));
    }
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        borderColor: theme.palette.grey[800],
      }),
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme }) => ({
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
      "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[700],
      }),
      variants: [
        {
          props: ({ ownerState }) => ownerState.active,
          style: {
            color: "#784af4",
          },
        },
      ],
    })
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const steps = ["", "", ""];

  useEffect(() => {
    const fetchPrefixes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/prefixes"); // Adjust endpoint if necessary
        // console.log("API Response:", response.data); // Debugging step
        setPrefixOptions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching prefixes:", error);
        setPrefixOptions([]); // Fallback to an empty array
      }
    };

    const fetchMaritals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/maritals"); // Adjust endpoint if necessary
        // console.log("API Response:", response.data); // Debugging step
        setMarital(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching maritals:", error);
        setMarital([]); // Fallback to an empty array
      }
    };
    fetchPrefixes();
    fetchMaritals();
  }, []);

  return {
    prefix,
    setPrefix,
    prefixOptions,
    setPrefixOptions,
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
    setMarital,
    education,
    setEducation,
    caseDate,
    setCaseDate,
    HN,
    setHN,
    illness,
    setIllness,
    privilege,
    setPrivilege,
    privilegeAvailable,
    setPrivilegeAvailable,
    QontoConnector,
    QontoStepIcon,
    steps,
    errors,
    setErrors,
    handleChange,
  };
};
