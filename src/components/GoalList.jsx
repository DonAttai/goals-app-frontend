import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import Goal from "./Goal";

import goalService from "../service/goal-service";
import { toast } from "react-toastify";
import Loader from "./Loader";

function GoalList() {
  const { dispatch, state } = useGoalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserGoals = async () => {
      try {
        const userGoals = await goalService.getGoals();
        dispatch({ type: "GET_GOALS", payload: userGoals });
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      } finally {
        setIsLoading();
      }
    };

    getUserGoals();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {state.goals.length ? (
        <section className="goals">
          {state.goals.map((goal) => {
            return <Goal key={goal._id} goal={goal} />;
          })}
        </section>
      ) : (
        <h3 className="no-goals">You have not set any goal</h3>
      )}
    </>
  );
}

export default GoalList;
