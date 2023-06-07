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

const logout = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default authService;
