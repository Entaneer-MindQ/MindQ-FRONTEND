import React, { createContext, useState, ReactNode } from "react";
import { Dayjs } from "dayjs";

type StringOrNull = string | "";

// Define the shape of the context
interface PatientContextProps {
  prefix: StringOrNull;
  setPrefix: (prefix: StringOrNull) => void;
  name: StringOrNull;
  setName: (name: StringOrNull) => void;
  surname: StringOrNull;
  setSurname: (surname: StringOrNull) => void;
  id: StringOrNull;
  setId: (id: StringOrNull) => void;
  nationality: StringOrNull;
  setNationality: (nationality: StringOrNull) => void;
  ethnicity: StringOrNull;
  setEthnicity: (ethnicity: StringOrNull) => void;
  religion: StringOrNull;
  setReligion: (religion: StringOrNull) => void;
  education: StringOrNull;
  setEducation: (education: StringOrNull) => void;
  marriage: StringOrNull;
  setMarriage: (marriage: StringOrNull) => void;
  birthdate: Dayjs | null;
  setBirthdate: (birthdate: Dayjs | null) => void;
  phoneNumber: StringOrNull;
  setPhoneNumber: (phoneNumber: StringOrNull) => void;
  province: StringOrNull;
  setProvince: (province: StringOrNull) => void;
  amphure: StringOrNull;
  setAmphure: (amphure: StringOrNull) => void;
  prefixOptions: { id: number; prefix: string }[];
  setPrefixOptions: (prefixOptions: { id: number; prefix: string }[]) => void;
  marital: { id: number; maritalStatus: string }[];
  setMarital: (marital: { id: number; maritalStatus: string }[]) => void;
  edu: { id: number; education: string }[];
  setEdu: (edu: { id: number; education: string }[]) => void;
  provs: { id: number; province: string }[];
  setProvs: (provs: { id: number; province: string }[]) => void;
  amphs: { id: number; amphure: string }[];
  setAmphs: (amphs: { id: number; amphure: string }[]) => void;
}

// Create the context with default values
const PatientContext = createContext<PatientContextProps>({
  prefix: "",
  setPrefix: () => {},
  name: "",
  setName: () => {},
  surname: "",
  setSurname: () => {},
  id: "",
  setId: () => {},
  nationality: "",
  setNationality: () => {},
  ethnicity: "",
  setEthnicity: () => {},
  religion: "",
  setReligion: () => {},
  education: "",
  setEducation: () => {},
  marriage: "",
  setMarriage: () => {},
  birthdate: null,
  setBirthdate: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  province: "",
  setProvince: () => {},
  amphure: "",
  setAmphure: () => {},
  prefixOptions: [],
  setPrefixOptions: () => {},
  marital: [],
  setMarital: () => {},
  edu: [],
  setEdu: () => {},
  provs: [],
  setProvs: () => {},
  amphs: [],
  setAmphs: () => {},
});

interface PatientProviderProps {
  children: ReactNode;
}

// Create a provider component
export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  // Initialize state with the value from sessionStorage
  const [prefix, setPrefix] = useState<StringOrNull>(""); // set patient's prefix
  const [name, setName] = useState<StringOrNull>(""); // set patient's name
  const [surname, setSurname] = useState<StringOrNull>(""); // set patient's surname
  const [id, setId] = useState<StringOrNull>(""); // set patient's nickname
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [ethnicity, setEthnicity] = useState<StringOrNull>(""); // set patient's ethnicity
  const [nationality, setNationality] = useState<StringOrNull>(""); // set patient's nationality
  const [religion, setReligion] = useState<StringOrNull>(""); // set patient's religion
  const [marriage, setMarriage] = useState<StringOrNull>(""); // set patient's marriage
  const [education, setEducation] = useState<StringOrNull>(""); // set patient's education
  const [phoneNumber, setPhoneNumber] = useState<StringOrNull>(""); // set patient's phone number
  const [province, setProvince] = useState<StringOrNull>(""); // set patient's province
  const [amphure, setAmphure] = useState<StringOrNull>(""); // set patient's amphures
  const [prefixOptions, setPrefixOptions] = useState<
    { id: number; prefix: string }[]
  >([]);
  const [marital, setMarital] = useState<
    { id: number; maritalStatus: string }[]
  >([]);
  const [edu, setEdu] = useState<{ id: number; education: string }[]>([]);
  const [provs, setProvs] = useState<{ id: number; province: string }[]>([]);
  const [amphs, setAmphs] = useState<{ id: number; amphure: string }[]>([]);
  return (
    <PatientContext.Provider
      value={{
        prefix,
        setPrefix,
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
        education,
        setEducation,
        phoneNumber,
        setPhoneNumber,
        province,
        setProvince,
        amphure,
        setAmphure,
        prefixOptions,
        setPrefixOptions,
        marital,
        setMarital,
        edu,
        setEdu,
        provs,
        setProvs,
        amphs,
        setAmphs,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
