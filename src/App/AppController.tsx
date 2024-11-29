import { useState } from "react";

const useAppController = () => {
  const [prefix, setPrefix] = useState(""); // set patient's prefix
  const [name, setName] = useState(""); // set patient's name
  const [surname, setSurname] = useState(""); // set patient's surname
  const [id, setId] = useState(""); // set patient's nickname
  const [ethnicity, setEthnicty] = useState(""); // set patient's ethnicity
  const [nationality, setNationality] = useState(""); // set patient's nationality
  const [religion, setReligion] = useState(""); // set patient's religion
  const [marriage, setMarriage] = useState(""); // set patient's marriage
  const [education, setEducation] = useState(""); // set patient's education
  const [caseDate, setCaseDate] = useState(""); // set case date
  const [HN, setHN] = useState(""); // set hospital's number
  const [illness, setIllness] = useState(""); // set patient's illness
  const [privilege, setPrivilege] = useState(""); // set hospital's number

  return {
    prefix,
    setPrefix,
    name,
    setName,
    surname,
    setSurname,
    id,
    setId,
    ethnicity,
    setEthnicty,
    nationality,
    setNationality,
    religion,
    setReligion,
    marriage,
    setMarriage,
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
  };
};

export { useAppController };
