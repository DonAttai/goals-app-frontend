import React from "react";
import { useGoalContext } from "../context/GoalContext";
import Modal from "./Modal";

function Goal({ _id, text, createdAt }) {
  const { setModal, isModalOpen } = useGoalContext();
  return (
    <>
      {isModalOpen && <Modal goalId={_id} />}
      <div className="card">
        <p className="text">{text}</p>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
        <button onClick={() => setModal()}>x</button>
      </div>
    </>
  );
}

export default Goal;
