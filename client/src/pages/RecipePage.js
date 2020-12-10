import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RecipeService from "../services/RecipeService";
import LoadingBar from "../components/LoadingBar";
import Avatar from "react-avatar";

const RecipeContainer = styled.div`
  margin: 50px;
  font-size: 20px;
`;

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const recipeInfo = await RecipeService.findRecipeById(id);
      setRecipe(recipeInfo);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <NavBar loggedIn />
      {recipe ? (
        <RecipeContainer>
          <div>Name: {recipe.name}</div>
          <div>Difficulty: {recipe.difficulty}</div>
          <div>Cooking Method: {recipe.cooking_method}</div>
          <div>Serving Size: {recipe.serving_size}</div>
          <div>Cuisine: {recipe.cuisine}</div>
          <div>Cooking Time (minutes): {recipe.minutes_to_make}</div>
          <div>Author: {recipe.author.displayName}</div>
          <div>Ingredients: </div>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <b>- </b>
              {ingredient.measurement.amount} {ingredient.measurement.unit}{" "}
              {ingredient.name}
            </div>
          ))}
          <br />
          <div>
            <button>Save</button>
          </div>
          <br />
          <div>
            <Avatar
              name={recipe.author.displayName}
              color={recipe.author.avatarColor}
              fgColor={recipe.author.initialsColor}
              size={60}
            />
          </div>
        </RecipeContainer>
      ) : (
        <LoadingBar loading={true} height={10} />
      )}
      <Footer />
    </>
  );
};

export default RecipePage;
