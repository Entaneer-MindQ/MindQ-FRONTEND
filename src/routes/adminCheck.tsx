// import { Outlet, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import NotFound from "./Notfound404";

const AdminCheck = () => {
  const { token } = useUser();
  // const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    // Check for token in cookie
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    setHasToken(!!cookieToken || !!token);
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (!hasToken || !isAdmin) {
    return <NotFound/>
  }

  return <Outlet />;
};

export default AdminCheck;
