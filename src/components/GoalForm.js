import React, { useContext, useState } from "react";
import { GoalContext } from "../context/GoalContext";
import { useForm } from "react-hook-form";
import goalService from "../service/goal-service";
import { toast } from "react-toastify";

function GoalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { dispatch } = useContext(GoalContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { text } = data;
    try {
      setIsLoading(true);
      const goal = await goalService.addGoal({ text });
      dispatch({ type: "ADD_GOAL", payload: goal });
      reset();
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="goal-form">
      <input
        {...register("text", {
          required: "You have not entered a goal",
        })}
        placeholder="Add a goal..."
        autoComplete="off"
      />
      {errors.text && <p className="text-danger">{errors.text.message}</p>}
      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? "Pls, Wait" : "Submit"}
      </button>
    </form>
  );
}

export default GoalForm;
