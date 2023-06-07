import axios from "../api/axios";
import authHeader from "./auth-header";

const addGoal = async (goal) => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.post("/api/goals", goal, config);
  return data;
};
const getGoals = async () => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.get("/api/goals", config);
  return data;
};

const deleteGoal = async (id) => {
  const config = {
    headers: authHeader(),
  };
  const { data } = await axios.delete(`/api//goals/${id}`, config);
  return data;
};

const goalService = { getGoals, addGoal, deleteGoal };

export default goalService;
