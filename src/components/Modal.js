import React, { useContext } from "react";
import { GoalContext } from "../context/GoalContext";

function Modal({ goalId }) {
  const { setModal, deleteGoal } = useContext(GoalContext);
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
            onClick={() => deleteGoal(goalId)}
            className="btn btn-sm btn-danger px-2 py-1"
          >
            Delete
          </button>
        </span>
      </div>
    </section>
  );
}

export default Modal;
