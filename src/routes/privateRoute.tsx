import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const { token } = useUser();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

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

  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
