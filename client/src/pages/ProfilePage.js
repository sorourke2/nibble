import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";
import Avatar from "react-avatar";
import { GithubPicker } from "react-color";
import BasicButton from "../components/BasicButton";
import SearchResult from "../components/SearchResult";
const Container = styled.div`
  display: flex;
  margin-bottom: 80px;
`;

const LeftColumn = styled.div`
  flex: 1;
  font-size: 24px;
`;

const RightColumn = styled.div`
  flex: 3;
  font-size: 24px;
`;

const FieldContainer = styled.div`
  margin: 30px;
`;

const AvatarContainer = styled.div`
  margin-top: 60px;
  margin-left: 90px;
`;

const UserField = styled.div`
  padding: 6px 0px;
`;

const HR = styled.hr`
  margin: 5px 0px;
  height: 3px;
  background-color: darkorchid;
  border: none;
  border-radius: 10px;
`;

const EditButton = BasicButton({ hoverColor: "lightblue" });

const CancelButton = styled(BasicButton({ hoverColor: "lightblue" }))`
  margin-right: 10px;
`;

const SaveButton = BasicButton({ hoverColor: "lightgreen" });

const LogoutButton = styled(BasicButton({ hoverColor: "lightblue" }))`
  float: right;
`;

const AdminButton = styled(BasicButton({ hoverColor: "orchid" }))`
  float: right;
  margin-right: 20px;
`;

const InputContainer = styled.div`
  border: 2px solid black;
  padding: 4px;
  border-radius: 4px;
`;

const UserFieldInput = styled.input`
  font-size: 24px;
  padding: 0px;
  border: none;
  width: 100%;

  :focus {
    outline: none;
  }
`;
const Title = styled.div`
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
`;

const RecipeListContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
`;
const RecipeListContainerInColumn = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ProfilePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading] = useState(false);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [avatarColor, setAvatarColor] = useState("");
  const [initialsColor, setInitialsColor] = useState("");
  const [editing, setEditing] = useState(false);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [savedCount, setSavedCount] = useState([]);
  const [loggedIn] = useState(localStorage.getItem("token") !== null);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUser = useCallback(async () => {
    let user = null;
    if (id) {
      user = await UserService.getUserById(id);
    } else {
      user = await UserService.getUser();
    }
    setUser(user);
    setDisplayName(user.displayName);
    setAvatarColor(user.avatarColor);
    setInitialsColor(user.initialsColor);
    const createdRecipes = await UserService.findCreatedRecipesByUser(
      id || user.id
    );
    if (loggedIn) {
      const loggedInUserSavedRecipes = await UserService.findSavedRecipes();
      const createdRecipesIds = createdRecipes.map((r) => r.id);
      const sharedRecipes = loggedInUserSavedRecipes.filter((lr) =>
        createdRecipesIds.includes(lr.id)
      );
      const loggedInInUser = await UserService.getUser();
      setIsAdmin(loggedInInUser.is_admin === 1);
      setSavedCount(sharedRecipes.length);
    }
    setCreatedRecipes(createdRecipes);
  }, [id, loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, [getUser]);

  const onCancel = () => {
    setEditing(false);
    getUser();
  };

  const onSave = async () => {
    setUser(null);
    setEditing(false);
    const user = {
      displayName,
      avatarColor,
      initialsColor,
      id: id,
    };
    if (id) {
      await UserService.updateUserById(user);
    } else {
      await UserService.updateUser(user);
    }
    await getUser();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <NavBar selectedTab="profile" loggedIn />
      <div>
        {user ? (
          <Container>
            {!id || isAdmin ? (
              <LeftColumn>
                <AvatarContainer>
                  <Avatar
                    name={displayName}
                    color={avatarColor}
                    fgColor={initialsColor}
                    size={"200px"}
                  />
                  {editing && (
                    <>
                      <br />
                      <br />
                      <GithubPicker
                        triangle="hide"
                        onChange={(color) => setAvatarColor(color.hex)}
                      />
                      <br />
                      <GithubPicker
                        colors={["#FFFFFF", "#000000"]}
                        width="50px"
                        triangle="hide"
                        onChange={(color) => setInitialsColor(color.hex)}
                      />
                    </>
                  )}
                  {loggedIn && (
                    <UserField>
                      <br></br>
                      You've saved <b>{savedCount}</b> of {displayName}'s
                      <br></br> recipes!
                    </UserField>
                  )}
                </AvatarContainer>
              </LeftColumn>
            ) : (
              <AvatarContainer>
                <Avatar
                  name={displayName}
                  color={avatarColor}
                  fgColor={initialsColor}
                  size={"200px"}
                />

                {loggedIn && (
                  <UserField>
                    <br></br>
                    You've saved <b>{savedCount}</b> of {displayName}'s<br></br>{" "}
                    recipes!
                  </UserField>
                )}
              </AvatarContainer>
            )}
            {!id || isAdmin ? (
              <RightColumn>
                <FieldContainer>
                  <UserField>Username:</UserField>
                  <HR />
                  <UserField>{user.username}</UserField>
                  <br />
                  <UserField>Display Name:</UserField>
                  <HR />
                  {editing ? (
                    <InputContainer>
                      <UserFieldInput
                        value={displayName}
                        onChange={({ target }) => setDisplayName(target.value)}
                      />
                    </InputContainer>
                  ) : (
                    <UserField>{displayName}</UserField>
                  )}
                  <br />
                  {editing ? (
                    <>
                      <CancelButton onClick={onCancel}>Cancel</CancelButton>
                      <SaveButton onClick={onSave}>Save</SaveButton>
                    </>
                  ) : (
                    <EditButton onClick={() => setEditing(true)}>
                      Edit
                    </EditButton>
                  )}
                  {(!isAdmin || !id) && (
                    <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
                  )}
                  {user.is_admin === 1 && (
                    <AdminButton onClick={() => history.push("/admin")}>
                      Admin Page
                    </AdminButton>
                  )}
                </FieldContainer>
              </RightColumn>
            ) : (
              <RightColumn>
                <LoadingBar loading={loading} height={10} />
                <Title>{user.displayName}'s Recipes</Title>
                <RecipeListContainerInColumn>
                  {createdRecipes.map((recipe) => (
                    <SearchResult key={recipe.id} recipe={recipe} />
                  ))}
                </RecipeListContainerInColumn>
              </RightColumn>
            )}
          </Container>
        ) : (
          <>
            <LoadingBar loading={true} height={10} />
            <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
          </>
        )}
        {!id && user && !isAdmin && (
          <div>
            <LoadingBar loading={loading} height={10} />
            <Title>{user.displayName}'s Recipes</Title>
            <RecipeListContainer>
              {createdRecipes.map((recipe) => (
                <SearchResult key={recipe.id} recipe={recipe} />
              ))}
            </RecipeListContainer>
          </div>
        )}
        {isAdmin && user && (
          <div>
            <LoadingBar loading={loading} height={10} />
            <Title>{user.displayName}'s Recipes</Title>
            <RecipeListContainer>
              {createdRecipes.map((recipe) => (
                <SearchResult key={recipe.id} recipe={recipe} />
              ))}
            </RecipeListContainer>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
