import axios from "axios";

const baseUrl = "/api/users";

const register = async (newObj) => {
  try {
    const response = await axios.post(baseUrl, newObj);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const login = async (loginObj) => {
  const response = await axios.post("/api/login", loginObj);
  return response.data;
};

export default {
  register,
  login,
};
