import React, { useState } from "react";
import Modal from "./Modal";

function Goal({ goal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal
          {...goal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="card">
        <p className="text">{goal.text}</p>
        <small>{new Date(goal.createdAt).toLocaleDateString()}</small>
        <button onClick={() => setIsModalOpen((prev) => !prev)}>x</button>
      </div>
    </>
  );
}

export default Goal;
