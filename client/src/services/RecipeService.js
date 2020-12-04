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

  createRecipe: async (recipe) => {
    const token = getToken();
    const response = await axios.post(`${url}`, recipe, {
      headers: { Authorization: token },
    });
    return response.data;
  },
};

export default RecipeService;
