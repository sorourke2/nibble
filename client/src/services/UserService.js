const axios = require("axios").default;
const url = "http://localhost:4000/api/user";

const UserService = {
  loginUser: (username, password) =>
    axios.post(`${url}/login`, { username, password }),
};

export default UserService;
