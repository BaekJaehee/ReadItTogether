import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PublicRoute = () => {
  const { authState } = useAuth();

  return authState.status === "loggedOut" ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
