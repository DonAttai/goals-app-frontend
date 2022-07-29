import { useState, useContext } from "react";
import { GoalContext } from "../context/GoalContext";

function GoalForm() {
  const [text, setText] = useState("");
  const { addGoal } = useContext(GoalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      addGoal({ text });
    }
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a goal..."
        autoComplete="off"
      />
      <button type="submit">submit</button>
    </form>
  );
}

export default GoalForm;
