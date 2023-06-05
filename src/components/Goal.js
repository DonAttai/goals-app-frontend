import React, { useContext } from "react";
import { GoalContext } from "../context/GoalContext";
import Modal from "./Modal";

function Goal({ _id, text, createdAt }) {
  const { setModal, isModalOpen } = useContext(GoalContext);
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
