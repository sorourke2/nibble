import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";

const LogoutButton = styled.button``;

const ProfileContainer = styled.div`
  margin-left: 35%;
  width: 30%;
  min-width: 400px;
  margin-top: 50px;
  font-size: 24px;
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

const EditButton = styled.button``;
const SaveButton = styled.button``;

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

const ProfilePage = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState(false);

  const getUser = async () => {
    const user = await UserService.getUser();
    setUser(user);
    setDisplayName(user.displayName || "");
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

  const onSave = async () => {
    setUser(null);
    setEditing(false);
    const user = {
      displayName,
    };
    await UserService.updateUser(user);
    await getUser();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <NavBar selectedTab="profile" loggedIn={true} />
      {user ? (
        <ProfileContainer>
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
            <SaveButton onClick={onSave}>Save</SaveButton>
          ) : (
            <EditButton onClick={() => setEditing(true)}>Edit</EditButton>
          )}
        </ProfileContainer>
      ) : (
        <LoadingBar loading={true} height={10} />
      )}
      <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
      <Footer />
    </>
  );
};

export default ProfilePage;
