import React, { useContext, useState } from "react";
import { GoalContext } from "../context/GoalContext";
import goalService from "../service/goal-service";
import { toast } from "react-toastify";

function Modal({ goalId }) {
  const { setModal, dispatch } = useContext(GoalContext);
  const [isLoading, setIsLoading] = useState(false);

  const removeGoal = async (id) => {
    try {
      setIsLoading(true);
      const data = await goalService.deleteGoal(id);
      dispatch({ type: "DELETE_GOAL", payload: data });
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    } finally {
      setIsLoading(false);
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
            {isLoading ? "Deleting..." : "Confirm"}
          </button>
        </span>
      </div>
    </section>
  );
}

export default Modal;
