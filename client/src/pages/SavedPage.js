import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchResult from "../components/SearchResult";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";

const RecipeListContainer = styled.div`
  margin-bottom: 80px;
`;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  margin: 30px;
`;

const LoadingContainer = styled.div`
  margin-left: 40%;
  width: 20%;
`;

const SavedPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const createdRecipes = await UserService.findSavedRecipes();
      setRecipes(createdRecipes);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar loggedIn />
      <Title>Saved Recipes</Title>
      <RecipeListContainer>
        {recipes.length === 0 && (
          <LoadingContainer>
            <LoadingBar loading={true} />
          </LoadingContainer>
        )}
        {recipes.map((recipe) => (
          <SearchResult key={recipe.id} recipe={recipe} />
        ))}
      </RecipeListContainer>
      <Footer />
    </>
  );
};

export default SavedPage;
