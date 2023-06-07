import React, { useContext } from "react";
import { GoalContext } from "../context/GoalContext";
import goalService from "../service/goal-service";
import { toast } from "react-toastify";

function Modal({ goalId }) {
  const { setModal, isLoading, dispatch } = useContext(GoalContext);

  const removeGoal = async (id) => {
    try {
      const data = await goalService.deleteGoal(id);
      dispatch({ type: "DELETE_GOAL", payload: data });
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  };
  return (
    <section className="delete-modal">
      <div className="card card-body">
        <p>Are you sure you want to delete?</p>

        <span className="d-flex gap-2 ">
          <button
            onClick={() => setModal()}
            className="px-2 py-1 btn btn-sm btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => removeGoal(goalId)}
            className="btn btn-sm btn-danger px-2 py-1"
            disabled={isLoading}
          >
            Confirm
          </button>
        </span>
      </div>
    </section>
  );
}

export default Modal;
