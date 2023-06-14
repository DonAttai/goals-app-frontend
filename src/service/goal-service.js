import axios from "../api/axios";

const addGoal = async (goal) => {
  const { data } = await axios.post("/goals", goal);
  return data;
};
const getGoals = async () => {
  const { data } = await axios.get("/goals");
  return data;
};

const deleteGoal = async (id) => {
  const { data } = await axios.delete(`/goals/${id}`);
  return data;
};

const goalService = { getGoals, addGoal, deleteGoal };

export default goalService;
