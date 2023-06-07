import axios from "axios";

const API_URL = () => {
  if (process.env.REACT_APP_NODE_ENV === "development") {
    return process.env.REACT_APP_GOALSETTER_API;
  }
  return process.env.REACT_APP_GOALSETTER_API;
};

export default axios.create({
  baseURL: API_URL(),
});
