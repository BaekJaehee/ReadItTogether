import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState({ status: "loggedOut" });
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/members/verify-access`,
          { accessToken: `Bearer ${accessToken}` },
          { withCredentials: true }
        );
        console.log(response);
        setUserState({ status: "loggedIn" });
      } catch (err) {
        console.error(err);
        setUserState({ status: "loggedOut" });
      }
    };

    // accessToken이 존재하는 경우에만 API 호출
    if (accessToken) {
      verifyAccessToken();
    } else {
      setUserState({ status: "loggedOut" });
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
