import React, { createContext, useReducer, useEffect } from "react";
import { authReducer } from "./authReducer";
import authService from "../service/auth-service";
import axios from "axios";

// const user = JSON.parse(localStorage.getItem("user"));
const user = authService.getCurrentUser();
const initialState = {
  user: user ? user : null,
  isLoading: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const logOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
    // authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        isLoading: state.isLoading,
        dispatch,
        logOut,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
