import React, { createContext, useContext, useMemo, useReducer } from "react";
import { goalReducer } from "./goal-reducer";

const initialState = {
  goals: [],
  isLoading: false,
};

const GoalContext = createContext(initialState);

export const GoalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalReducer, initialState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const contextvalue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GoalContext.Provider
      value={{
        ...contextvalue,
        setLoading,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = () => useContext(GoalContext);
