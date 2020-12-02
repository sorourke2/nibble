import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const LogoutButton = styled.button``;

const ProfilePage = () => {
  const history = useHistory();
  const onLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <NavBar selectedTab="profile" loggedIn={true} />
      <div>Profile</div>
      <LogoutButton onClick={onLogout}>Log Out</LogoutButton>
      <Footer />
    </>
  );
};

export default ProfilePage;
