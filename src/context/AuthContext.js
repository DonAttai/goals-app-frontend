import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "./authReducer";

const API_URL = process.env.REACT_APP_USERS;

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  //ACTION
  const login = async (userData) => {
    try {
      const { data } = await axios.post(API_URL + "/login", userData);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        return data;
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.response.data });
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axios.post(API_URL + "/register", userData);
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "REGISTER_ERROR",
        payload: error.response.data,
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        setLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
