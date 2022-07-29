import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

// import authService from "../service/auth-service";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

function Dashboard() {
  const navigate = useNavigate();
  const { user, error, loading } = useContext(AuthContext);
  const [isError, setIsError] = useState(error);

  useEffect(() => {
    if (isError) {
      setIsError(isError);
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, isError]);

  if (loading) {
    return <Loader className="text-dark" />;
  }
  return (
    <div className="dashboard">
      {isError && isError.message}
      <section className="dashboard-head">
        <h2>welcome, {user && user.name}!</h2>
        <GoalForm />
      </section>
      <GoalList />
    </div>
  );
}

export default Dashboard;
