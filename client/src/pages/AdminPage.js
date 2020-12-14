import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RecipeService from "../services/RecipeService";
import SearchResult from "../components/SearchResult";

const Title = styled.div`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
`;

const RecipeListContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
`;

const AdminPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allRecipes = await RecipeService.findAllRecipes();
      setRecipes(allRecipes);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar loggedIn />
      <Title>All Recipes:</Title>
      <RecipeListContainer>
        {recipes.map((recipe) => (
          <SearchResult key={recipe.id} recipe={recipe} />
        ))}
      </RecipeListContainer>
      <Footer />
    </>
  );
};

export default AdminPage;
