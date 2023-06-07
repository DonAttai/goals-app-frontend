import React, { createContext, useReducer } from "react";
import { goalReducer } from "./goalReducer";

const initialState = {
  goals: [],
  isLoading: true,
  isModalOpen: false,
};

export const GoalContext = createContext(initialState);

export const GoalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, initialState);

  const setModal = () => {
    dispatch({ type: "SET_MODAL" });
  };
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  return (
    <GoalContext.Provider
      value={{
        goals: state.goals,
        isLoading: state.isLoading,
        isModalOpen: state.isModalOpen,
        setModal,
        dispatch,
        setLoading,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
