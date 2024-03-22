import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState({ status: "loggedOut" });
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      axios
        .post(
          `${API_BASE_URL}/members/verify-token`,
          {
            token: accessToken,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          setUserState({ status: "loggedIn" });
        })
        .catch((err) => {
          console.log(err);
          setUserState({ status: "loggedOut" });
        });
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
