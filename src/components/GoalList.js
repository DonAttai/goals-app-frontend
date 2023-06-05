import React, { useEffect, useContext } from "react";
import { GoalContext } from "../context/GoalContext";

import Goal from "./Goal";
function GoalList() {
  const { goals, getGoals, isLoading } = useContext(GoalContext);

  useEffect(() => {
    getGoals();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {goals.length > 0 ? (
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
