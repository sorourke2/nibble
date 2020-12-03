import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";
import Avatar from "react-avatar";
import { GithubPicker } from "react-color";
import BasicButton from "../components/BasicButton";

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
  const [avatarColor, setAvatarColor] = useState("");
  const [initialsColor, setInitialsColor] = useState("");
  const [editing, setEditing] = useState(false);

  const getUser = async () => {
    const user = await UserService.getUser();
    setUser(user);
    setDisplayName(user.displayName);
    setAvatarColor(user.avatarColor);
    setInitialsColor(user.initialsColor);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

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
        <Container>
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
            </AvatarContainer>
          </LeftColumn>
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
                <EditButton onClick={() => setEditing(true)}>Edit</EditButton>
              )}
              <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
            </FieldContainer>
          </RightColumn>
        </Container>
      ) : (
        <>
          <LoadingBar loading={true} height={10} />
          <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProfilePage;
