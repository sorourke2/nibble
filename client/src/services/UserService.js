const axios = require("axios").default;
const url = "http://localhost:4000/api/user";

const UserService = {
  loginUser: async (username, password) => {
    const response = await axios.post(`${url}/login`, { username, password });
    return response.data;
  },
};

export default UserService;
