import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "./auth-reducer";
import authService from "../service/auth-service";

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
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
