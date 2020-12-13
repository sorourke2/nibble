import getToken from "../utils/Token";
const axios = require("axios").default;
const url = `${process.env.REACT_APP_SERVER_URL}/api/user`;

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

  findCreatedRecipes: async () => {
    const token = getToken();
    const response = await axios.get(`${url}/created-recipes`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  findSavedRecipes: async () => {
    const token = getToken();
    const response = await axios.get(`${url}/saved-recipes`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  saveRecipe: async (recipeId) => {
    const token = getToken();
    const response = await axios.post(
      `${url}/saved-recipes`,
      { id: recipeId },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  unsaveRecipe: async (recipeId) => {
    const token = getToken();
    const response = await axios.delete(`${url}/saved-recipes/${recipeId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },
};

export default UserService;
