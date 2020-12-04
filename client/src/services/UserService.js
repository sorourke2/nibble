import getToken from "../utils/Token";
const axios = require("axios").default;
const url = "http://localhost:4000/api/user";

const UserService = {
  loginUser: async (username, password) => {
    const response = await axios.post(`${url}/login`, {
      username,
      password,
    });
    return response.data;
  },
  registerUser: async (username, password) => {
    const response = await axios.post(`${url}/register`, {
      username,
      password,
    });
    return response.data;
  },
  getUser: async () => {
    const token = getToken();
    const response = await axios.get(`${url}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },
  updateUser: async ({ displayName, avatarColor, initialsColor }) => {
    const token = getToken();
    const response = await axios.put(
      `${url}`,
      { displayName, avatarColor, initialsColor },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },
};

export default UserService;
