import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const PrivateRoute = () => {
  const { setUserState } = useContext(AuthContext);

  return setUserState.status === "loggedIn" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
