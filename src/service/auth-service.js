import axios from "../api/axios";

const register = async (userData) => {
  const { data } = await axios.post("/users/register", userData);
  return data;
};

const login = async (userData) => {
  const { data } = await axios.post("/users/login", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const logOut = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const authService = {
  register,
  login,
  logOut,
  getCurrentUser,
};
export default authService;
