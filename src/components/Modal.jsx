import React from "react";
import { useGoalContext } from "../context/GoalContext";
import goalService from "../service/goal-service";
import { toast } from "react-toastify";

function Modal({ _id, setIsModalOpen }) {
  const { dispatch, state, setLoading } = useGoalContext();

  const removeGoal = async () => {
    try {
      setLoading();
      const data = await goalService.deleteGoal(_id);
      dispatch({ type: "DELETE_GOAL", payload: data });
      toast.success(`successful!`, { type: "success" });
    } catch (error) {
      toast(error.response?.data.message, { type: "error" });
    } finally {
      setLoading();
      setIsModalOpen((prev) => !prev);
    }
  };

  return (
    <section className="delete-modal">
      <div className="card card-body">
        <h3>Delete Goal</h3>
        <hr className="text-dark" />
        <p>Are you sure?</p>
        <hr />
        <span className="d-flex gap-2 ">
          <button
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="px-2 py-1 btn btn-sm btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => removeGoal()}
            className="btn btn-sm btn-danger px-2 py-1"
            disabled={state.isLoading}
          >
            {state.isLoading ? "Wait..." : "Confirm"}
          </button>
        </span>
      </div>
    </section>
  );
}

export default Modal;
