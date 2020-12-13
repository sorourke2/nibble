import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";
import SearchResult from "../components/SearchResult";

const Title = styled.div`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
`;

const RecipeListContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
`;

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = await UserService.getUserById(id);
      setUser(user);
      const userRecipes = await UserService.findCreatedRecipesByUser(id);
      setCreatedRecipes(userRecipes);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <NavBar loggedIn />
      <LoadingBar loading={loading} height={10} />
      {user && <Title>{user.displayName}'s Recipes</Title>}
      <RecipeListContainer>
        {createdRecipes.map((recipe) => (
          <SearchResult key={recipe.id} recipe={recipe} />
        ))}
      </RecipeListContainer>
      <Footer />
    </>
  );
};

export default UserPage;
