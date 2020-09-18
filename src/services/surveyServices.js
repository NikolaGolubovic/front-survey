import axios from "axios";

const baseUrl = "/api/survey";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getToken = () => {
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getSingle = async (id) => {
  const response = await axios.get(
    `http://localhost:3005/api/survey/single/${id}`
  );
  return response.data;
};

const getResults = async (id) => {
  const response = await axios.get(`${baseUrl}/results/${id}`);
  return response.data;
};

const create = async (surveyObj) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(`${baseUrl}/create`, surveyObj, config);
  return response.data;
};

const updateVotes = async (updatedObj) => {
  const response = await axios.post(`${baseUrl}/updateVotes`, updatedObj);
  return response.data;
};

export default {
  setToken,
  getToken,
  getAll,
  getSingle,
  getResults,
  create,
  updateVotes,
};
