import axios from "axios";

const API_URL = process.env.REACT_APP_USERS;

const register = async (userData) => {
  const { data } = await axios.post(`${API_URL / register}`, userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const login = async (userData) => {
  const { data } = await axios.post(`${API_URL / login}`, userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const logout = () => {
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
