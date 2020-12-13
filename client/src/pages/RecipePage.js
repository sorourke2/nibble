import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RecipeService from "../services/RecipeService";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";
import Avatar from "react-avatar";
import BasicButton from "../components/BasicButton";

const RecipeContainer = styled.div`
  margin: 50px;
  font-size: 20px;
`;

const SaveButton = BasicButton({ hoverColor: "lightblue" });
const UnsaveButton = BasicButton({ hoverColor: "lightblue" });
const DeleteButton = BasicButton({ hoverColor: "salmon" });
const ConfirmDeleteButton = BasicButton({ hoverColor: "red" });
const CancelDeleteButton = styled(BasicButton({ hoverColor: "lightblue" }))`
  margin-left: 20px;
`;

const LoadingContainer = styled.div`
  width: 200px;
`;

const RecipePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipeInfo = await RecipeService.findRecipeById(id);
      const userSavedRecipes = await UserService.findSavedRecipes();
      let hasSaved = false;
      userSavedRecipes.forEach((savedRecipe) => {
        if (savedRecipe.id === parseInt(id)) hasSaved = true;
      });
      const isAuthor = await RecipeService.isAuthor(id);
      setCanDelete(isAuthor);
      setSaved(hasSaved);
      setRecipe(recipeInfo);
    };
    fetchData();
  }, [id]);

  const onSave = async () => {
    setLoadingSave(true);
    await UserService.saveRecipe(id);
    setSaved(true);
    setLoadingSave(false);
  };

  const onUnsave = async () => {
    setLoadingSave(true);
    await UserService.unsaveRecipe(id);
    setSaved(false);
    setLoadingSave(false);
  };

  const onDelete = async () => {
    await RecipeService.deleteRecipe(id);
    history.push("/create");
  };

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
            {loadingSave ? (
              <LoadingContainer>
                <LoadingBar loading={true} />
              </LoadingContainer>
            ) : saved ? (
              <UnsaveButton onClick={onUnsave}>Unsave</UnsaveButton>
            ) : (
              <SaveButton onClick={onSave}>Save</SaveButton>
            )}
          </div>
          <br />
          <div>
            <Avatar
              name={recipe.author.displayName}
              color={recipe.author.avatarColor}
              fgColor={recipe.author.initialsColor}
              size={60}
            />
            {canDelete && (
              <>
                <br />
                <br />
                <div>
                  <DeleteButton onClick={() => setDeleteClicked(true)}>
                    Delete
                  </DeleteButton>
                </div>
              </>
            )}
            {deleteClicked && (
              <>
                <br />
                <div>Are you sure you want to delete this recipe?</div>
                <br />
                <div>
                  <ConfirmDeleteButton onClick={onDelete}>
                    Yes
                  </ConfirmDeleteButton>
                  <CancelDeleteButton onClick={() => setDeleteClicked(false)}>
                    No
                  </CancelDeleteButton>
                </div>
              </>
            )}
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
