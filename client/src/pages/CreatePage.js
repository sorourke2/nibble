import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import BasicButton from "../components/BasicButton";
import RecipeService from "../services/RecipeService";

const Container = styled.div`
  margin-bottom: 80px;
  margin-top: 30px;
  text-align: center;
`;

const RecipeNameInput = styled.input`
  width: 400px;
  font-size: 24px;
  padding: 4px;
  border: 2px solid black;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`;

const CreateButton = BasicButton({ hoverColor: "lightblue" });

const CreatePage = () => {
  const [recipeName, setRecipeName] = useState("");

  const onCreate = async () => {
    if (recipeName !== "") {
      const recipe = {
        name: recipeName,
      };
      await RecipeService.createRecipe(recipe);
      setRecipeName("");
    }
  };

  return (
    <>
      <NavBar selectedTab="create" loggedIn={true} />
      <Container>
        <div>
          <RecipeNameInput
            value={recipeName}
            autoFocus
            placeholder="New Recipe"
            onChange={({ target }) => setRecipeName(target.value)}
          />
        </div>
        <br />
        <CreateButton onClick={onCreate}>Create</CreateButton>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePage;
