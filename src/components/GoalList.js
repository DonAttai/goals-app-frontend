import { useEffect, useContext } from "react";
import { GoalContext } from "../context/GoalContext";

import Goal from "./Goal";
function GoalList() {
  const { goals, getGoals } = useContext(GoalContext);

  useEffect(() => {
    getGoals();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (goals.length < 1) {
    return <h3 className="no-goals">You have not set any goal</h3>;
  }

  return (
    <section className="goals">
      {goals.map((goal) => {
        return <Goal key={goal._id} {...goal} />;
      })}
    </section>
  );
}

export default GoalList;
