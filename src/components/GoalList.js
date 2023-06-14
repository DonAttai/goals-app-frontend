import React, { useEffect, useContext } from "react";
import { GoalContext } from "../context/GoalContext";
import Goal from "./Goal";

import goalService from "../service/goal-service";
import { toast } from "react-toastify";
import Loader from "./Loader";

function GoalList() {
  const { goals, dispatch, isLoading } = useContext(GoalContext);

  useEffect(() => {
    const getUserGoals = async () => {
      try {
        const userGoals = await goalService.getGoals();
        dispatch({ type: "GET_GOALS", payload: userGoals });
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    };

    getUserGoals();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {goals.length ? (
        <section className="goals">
          {goals.map((goal) => {
            return <Goal key={goal._id} {...goal} />;
          })}
        </section>
      ) : (
        <h3 className="no-goals">You have not set any goal</h3>
      )}
    </>
  );
}

export default GoalList;
