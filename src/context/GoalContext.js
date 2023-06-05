import React, { createContext, useReducer } from "react";
import axios from "axios";
import { goalReducer } from "./goalReducer";
import authHeader from "../service/auth-header";
// import { AuthContext } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_GOALS;
const initialState = {
  goals: [],
  isLoading: true,
  isModalOpen: false,
  error: null,
};

export const GoalContext = createContext(initialState);

export const GoalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, initialState);

  //ACTION
  const addGoal = async (goal) => {
    const config = {
      headers: authHeader(),
    };
    try {
      const { data } = await axios.post(API_URL, goal, config);
      dispatch({ type: "ADD_GOAL", payload: data });
    } catch (error) {
      // dispatch({ type: "GOAL_ERROR", payload: error.response.data.message });
      console.log(error);
    }
  };
  const getGoals = async () => {
    const config = {
      headers: authHeader(),
    };
    try {
      const { data } = await axios.get(API_URL, config);
      dispatch({ type: "GET_GOALS", payload: data });
    } catch (error) {
      // dispatch({ type: "GOAL_ERROR", payload: error.response.data.message });
      console.log(error);
    }
  };
  const deleteGoal = async (id) => {
    const config = {
      headers: authHeader(),
    };
    try {
      const { data } = await axios.delete(API_URL + `/${id}`, config);
      dispatch({ type: "DELETE_GOAL", payload: data });
    } catch (error) {
      // dispatch({ type: "GOAL_ERROR", payload: error.response.data.message });
      console.log(error);
    }
  };

  const setModal = () => {
    dispatch({ type: "SET_MODAL" });
  };

  return (
    <GoalContext.Provider
      value={{
        goals: state.goals,
        isLoading: state.isLoading,
        error: state.error,
        isModalOpen: state.isModalOpen,
        setModal,
        addGoal,
        getGoals,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
