import React from "react";
import { useGoalContext } from "../context/GoalContext";
import { useForm } from "react-hook-form";
import goalService from "../service/goal-service";
import { toast } from "react-toastify";

function GoalForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  getValues();
  const { dispatch, setLoading, state } = useGoalContext();

  const onSubmit = async (data) => {
    const { text } = data;
    try {
      setLoading();
      const goal = await goalService.addGoal({ text });
      dispatch({ type: "ADD_GOAL", payload: goal });
      toast.success("A new goal was added!", { type: "success" });
      reset();
    } catch (error) {
      toast(error.response?.data.message, { type: "error" });
    } finally {
      setLoading();
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
      <button type="submit" disabled={state.isLoading} className="submit-btn">
        {state.isLoading ? "Pls, Wait" : "Submit"}
      </button>
    </form>
  );
}

export default GoalForm;
