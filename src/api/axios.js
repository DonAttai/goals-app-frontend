import axios from "axios";

const API_URL = () => {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    return process.env.REACT_APP_GOALSETTER_API;
  }
  return process.env.REACT_APP_GOALSETTER_BACKEND;
};

const API = API_URL();

const axiosInstance = axios.create({
  baseURL: `${API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    // const originalConfig = error.config;
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   !originalConfig._retry
    // ) {
    //   originalConfig._retry = true;
    //   try {
    //     const newAccessToken = await axiosInstance.post("/api/users/refresh", {
    //       refreshToken: user.refreshToken,
    //     });
    //     const { accessToken } = newAccessToken.data;
    //     user.acessToken = accessToken;
    //     localStorage.setItem("user", JSON.stringify(user));
    //     originalConfig.headers.Authorization = `Bearer ${accessToken}`;
    //     return axiosInstance(originalConfig);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    return Promise.reject(error);
  }
);

export const getTransactions = async (goals) => {
  const res = await axiosInstance.get("/goals");
  return res.data.data;
};
export const addTransactions = async (goals, body) => {
  const res = await axiosInstance.post("/goals", body);
  return res.data.data;
};
export const removeTransactions = async (transactions) => {
  const res = await axiosInstance.get("/transactions");
  return res.data.data;
};

export default axiosInstance;
