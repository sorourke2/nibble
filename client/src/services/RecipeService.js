import getToken from "../utils/Token";
const axios = require("axios").default;
const url = `${process.env.REACT_APP_SERVER_URL}/api/recipes`;

const RecipeService = {
  findAllRecipes: async () => {
    const token = getToken();
    const response = await axios.get(`${url}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  searchRecipes: async (searchTerm) => {
    const token = getToken();
    const response = await axios.post(
      `${url}/search`,
      { searchTerm },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  },

  createRecipe: async (recipe) => {
    const token = getToken();
    const response = await axios.post(`${url}`, recipe, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  findRecipeById: async (id) => {
    const token = getToken();
    const response = await axios.get(`${url}/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  findUsersWhoHaveSaved: async (rid) => {
    const token = getToken();
    const response = await axios.get(`${url}/${rid}/saved-by`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  isAuthor: async (recipeId) => {
    const token = getToken();
    const response = await axios.get(`${url}/author/${recipeId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  updateRecipe: async (recipeId, recipe) => {
    const token = getToken();
    const response = await axios.put(`${url}/${recipeId}`, recipe, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  deleteRecipe: async (recipeId) => {
    const token = getToken();
    const response = await axios.delete(`${url}/${recipeId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },
};

export default RecipeService;
