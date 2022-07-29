import { useContext } from "react";
import { GoalContext } from "../context/GoalContext";

function Goal({ _id, text, createdAt }) {
  const { deleteGoal } = useContext(GoalContext);

  return (
    <section className="card">
      <p className="text">{text}</p>
      <small>{new Date(createdAt).toLocaleDateString()}</small>
      <button onClick={() => deleteGoal(_id)}>x</button>
    </section>
  );
}

export default Goal;
