import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BasicButton from "../components/BasicButton";
import UserService from "../services/UserService";

const Title = styled.div`
  text-align: center;
  font-size: 48px;
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

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const user = await UserService.getUser();
        setName(user.displayName);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>
      <NavBar loggedIn />
      <Title>Welcome back {name}!</Title>
      <Footer />
    </>
  ) : (
    <>
      <NavBar loggedIn={false} />
      <Title>Welcome to Nibble!</Title>
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
