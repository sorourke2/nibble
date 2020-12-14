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

const Container = styled.div`
  display: flex;
  margin-bottom: 80px;
`;

const LeftColumn = styled.div`
  flex: 1;
  font-size: 24px;
  border-right: 1px solid black;
`;

const RightColumn = styled.div`
  flex: 3;
  margin-left: 3em;
  font-size: 24px;
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

const AvatarContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 4px;

  :hover {
    border: 4px solid orchid;
    border-radius: 4px;
    margin: 0px;
  }
`;

const RecipePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loggedIn] = useState(localStorage.getItem("token") !== null);
  const [recipe, setRecipe] = useState(null);
  const [savedBy, setSavedBy] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const recipeInfo = await RecipeService.findRecipeById(id);
      const users = await RecipeService.findUsersWhoHaveSaved(id);
      if (loggedIn) {
        const userSavedRecipes = await UserService.findSavedRecipes();
        let hasSaved = false;
        userSavedRecipes.forEach((savedRecipe) => {
          if (savedRecipe.id === parseInt(id)) hasSaved = true;
        });
        const isAuthor = await RecipeService.isAuthor(id);
        setCanDelete(isAuthor);
        setSaved(hasSaved);
      }
      setRecipe(recipeInfo);
      setSavedBy(users);
    };
    fetchData();
  }, [id, loggedIn]);

  const onSave = async () => {
    setLoadingSave(true);
    await UserService.saveRecipe(id);
    const users = await RecipeService.findUsersWhoHaveSaved(id);
    setSavedBy(users);
    setSaved(true);
    setLoadingSave(false);
  };

  const onUnsave = async () => {
    setLoadingSave(true);
    await UserService.unsaveRecipe(id);
    const users = await RecipeService.findUsersWhoHaveSaved(id);
    setSavedBy(users);
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
        <Container>
          <LeftColumn>
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
            {loggedIn && (
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
            )}
            <br />
            <div>
              <AvatarContainer
                onClick={() => history.push(`/profile/${recipe.author.id}`)}
              >
                <Avatar
                  name={recipe.author.displayName}
                  color={recipe.author.avatarColor}
                  fgColor={recipe.author.initialsColor}
                  size={60}
                />
              </AvatarContainer>
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
          </LeftColumn>
          <RightColumn>
            <div>This recipe has been saved by:</div>
            {savedBy && (
              <div>
                {savedBy.map((user) => (
                  <AvatarContainer
                    onClick={() => history.push(`/profile/${user.id}`)}
                  >
                    <Avatar
                      name={user.displayName}
                      color={user.avatarColor}
                      fgColor={user.initialsColor}
                      size={60}
                    />
                  </AvatarContainer>
                ))}
              </div>
            )}
          </RightColumn>
        </Container>
      ) : (
        <LoadingBar loading={true} height={10} />
      )}
      <Footer />
    </>
  );
};

export default RecipePage;
