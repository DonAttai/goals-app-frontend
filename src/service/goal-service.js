import axios from "../api/axios";
import authHeader from "./auth-header";

const addGoal = async (goal) => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.post("/goals", goal, config);
  return data;
};
const getGoals = async () => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.get("/goals", config);
  return data;
};

const deleteGoal = async (id) => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.delete(`/goals/${id}`, config);
  return data;
};

const goalService = { getGoals, addGoal, deleteGoal };

export default goalService;
