import React, { createContext, useState, ReactNode } from "react";
import { Dayjs } from "dayjs";

type StringOrNull = string | null;

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
  setEducation: (id: StringOrNull) => void;
  marriage: StringOrNull;
  setMarriage: (marriage: StringOrNull) => void;
  birthdate: Dayjs | null;
  setBirthdate: (birthdate: Dayjs | null) => void;
  phoneNumber: StringOrNull;
  setPhoneNumber: (phoneNumber: StringOrNull) => void;
  province: StringOrNull;
  setProvince: (province: StringOrNull) => void;
  prefixOptions: { id: number; prefix: string }[];
  setPrefixOptions: (prefixOptions: { id: number; prefix: string }[]) => void;
  marital: { id: number; maritalStatus: string }[];
  setMarital: (marital: { id: number; maritalStatus: string }[]) => void;
  edu: { id: number; education: string }[];
  setEdu: (edu: { id: number; education: string }[]) => void;
  provs: { id: number; province: string }[];
  setProvs: (edu: { id: number; province: string }[]) => void;
}

// Create the context with default values
const PatientContext = createContext<PatientContextProps>({
  prefix: null,
  setPrefix: () => {},
  name: null,
  setName: () => {},
  surname: null,
  setSurname: () => {},
  id: null,
  setId: () => {},
  nationality: null,
  setNationality: () => {},
  ethnicity: null,
  setEthnicity: () => {},
  religion: null,
  setReligion: () => {},
  education: null,
  setEducation: () => {},
  marriage: null,
  setMarriage: () => {},
  birthdate: null,
  setBirthdate: () => {},
  phoneNumber: null,
  setPhoneNumber: () => {},
  province: null,
  setProvince: () => {},
  prefixOptions: [],
  setPrefixOptions: () => {},
  marital: [],
  setMarital: () => {},
  edu: [],
  setEdu: () => {},
  provs: [],
  setProvs: () => {},
});

interface PatientProviderProps {
  children: ReactNode;
}

// Create a provider component
export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  // Initialize state with the value from sessionStorage
  const [prefix, setPrefix] = useState<StringOrNull>(null); // set patient's prefix
  const [name, setName] = useState<StringOrNull>(null); // set patient's name
  const [surname, setSurname] = useState<StringOrNull>(null); // set patient's surname
  const [id, setId] = useState<StringOrNull>(null); // set patient's nickname
  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);
  const [ethnicity, setEthnicity] = useState<StringOrNull>(null); // set patient's ethnicity
  const [nationality, setNationality] = useState<StringOrNull>(null); // set patient's nationality
  const [religion, setReligion] = useState<StringOrNull>(null); // set patient's religion
  const [marriage, setMarriage] = useState<StringOrNull>(null); // set patient's marriage
  const [education, setEducation] = useState<StringOrNull>(null); // set patient's education
  const [phoneNumber, setPhoneNumber] = useState<StringOrNull>(null); // set patient's phone number
  const [province, setProvince] = useState<StringOrNull>(null); // set patient's phone number
  const [prefixOptions, setPrefixOptions] = useState<
    { id: number; prefix: string }[]
  >([]);
  const [marital, setMarital] = useState<
    { id: number; maritalStatus: string }[]
  >([]);
  const [edu, setEdu] = useState<{ id: number; education: string }[]>([]);
  const [provs, setProvs] = useState<{ id: number; province: string }[]>([]);
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
        prefixOptions,
        setPrefixOptions,
        marital,
        setMarital,
        edu,
        setEdu,
        provs,
        setProvs,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
