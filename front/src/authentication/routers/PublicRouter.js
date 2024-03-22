import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const PublicRoute = () => {
  const { setUserState } = useContext(AuthContext);
  const memberId = localStorage.getItem("memberId");

  return setUserState.status === "loggedOut" ? <Outlet /> : <Navigate to={`/${memberId}`} />;
};

export default PublicRoute;
