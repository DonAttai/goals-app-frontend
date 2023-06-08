import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// import authService from "../service/auth-service";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
