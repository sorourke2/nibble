import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import RecipeService from "../services/RecipeService";
import BasicButton from "../components/BasicButton";
import SearchResult from "../components/SearchResult";

const Title = styled.div`
  text-align: center;
  font-size: 48px;
  margin-top: 50px;
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
`;

const Featured = styled.div`
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
`;

const ButtonContainer = styled.div`
  margin-top: 60px;
  text-align: center;
`;

const LoginButton = BasicButton({ hoverColor: "lightblue" });
const RegisterButton = BasicButton({ hoverColor: "lightblue" });
const GuestButton = BasicButton({ hoverColor: "lightblue" });

const HomePage = () => {
  const history = useHistory();
  const [isAuthenticated] = useState(localStorage.getItem("token") !== null);
  const [name, setName] = useState("");
  const [featuredRecipe, setfeaturedRecipe] = useState(null);
  const [createdRecipe, setcreatedRecipe] = useState(null);
  const [recipeCount, setRecipeCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await RecipeService.searchRecipes("");
      if (isAuthenticated) {
        const user = await UserService.getUser();
        setName(user.displayName);
        setRecipeCount(recipes.length);
        setfeaturedRecipe(recipes[recipes.length - 1]);
        const createdRecipes = await UserService.findCreatedRecipes();
        setcreatedRecipe(createdRecipes[createdRecipes.length - 1]);
      }
      setRecipeCount(recipes.length);
    };
    fetchData();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <NavBar loggedIn />
      <Title>Welcome back {name}!</Title>
      <Featured>Check out this latest recipe from our community:</Featured>
      {featuredRecipe && (
        <SearchResult key={featuredRecipe.id} recipe={featuredRecipe} />
      )}
      {createdRecipe && (
        <div>
          <Featured>Or look at your most recent creation:</Featured>
          <SearchResult key={createdRecipe.id} recipe={createdRecipe} />
        </div>
      )}
      <Footer />
    </>
  ) : (
    <>
      <NavBar loggedIn={false} />
      <Title>Welcome to Nibble!</Title>
      {recipeCount && (
        <SubTitle>
          Continue to access our current selection of {recipeCount} recipes{" "}
          <br></br>
          created by our community!
        </SubTitle>
      )}
      <ButtonContainer>
        <div>
          <LoginButton onClick={() => history.push("/login")}>
            Login
          </LoginButton>
        </div>
        <br />
        <br />
        <div>
          <RegisterButton onClick={() => history.push("/register")}>
            Register
          </RegisterButton>
        </div>
        <br />
        <br />
        <div>
          <GuestButton onClick={() => history.push("/search")}>
            Continue as Guest
          </GuestButton>
        </div>
      </ButtonContainer>
      <Footer />
    </>
  );
};

export default HomePage;
