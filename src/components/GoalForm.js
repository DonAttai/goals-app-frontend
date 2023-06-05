import React, { useContext } from "react";
import { GoalContext } from "../context/GoalContext";
import { useForm } from "react-hook-form";
function GoalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { addGoal } = useContext(GoalContext);

  const onSubmit = async (data) => {
    const { text } = data;
    try {
      await addGoal({ text });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="goal-form">
      <input
        {...register("text", {
          required: "You have not entered a goal",
          // pattern: { value: /^[A-Za-z]+$/, message: "Only text are allowed" },
        })}
        placeholder="Add a goal..."
        autoComplete="off"
      />
      {errors.text && <p className="text-danger">{errors.text.message}</p>}
      <button type="submit">submit</button>
    </form>
  );
}

export default GoalForm;
