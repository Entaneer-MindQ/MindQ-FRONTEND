import { useState } from "react";

const useAppController = () => {
  const [prefix, setPrefix] = useState(""); // set patient's prefix
  const [name, setName] = useState(""); // set patient's name
  const [surname, setSurname] = useState(""); // set patient's surname
  const [nickname, setNickname] = useState(""); // set patient's nickname
  return {
    prefix,
    setPrefix,
    name,
    setName,
    surname,
    setSurname,
    nickname,
    setNickname,
  };
};

export { useAppController };
