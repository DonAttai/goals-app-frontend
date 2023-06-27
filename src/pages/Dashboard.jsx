import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <section className="dashboard-head">
        <h2>welcome, {user && user.name}!</h2>
        <GoalForm />
      </section>
      {user && <GoalList />}
    </div>
  );
}

export default Dashboard;
