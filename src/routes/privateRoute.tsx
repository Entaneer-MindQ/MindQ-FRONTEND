import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Ensure you have a UserContext

const PrivateRoute = () => {
  const { token } = useUser();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
