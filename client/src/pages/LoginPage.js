import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";

const LoginContainer = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 80px;
`;

const Username = styled.input`
  width: 400px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;

  :focus {
    outline: none;
  }
`;

const Password = styled.input`
  width: 400px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;

  :focus {
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 200px;
  padding: 10px;
  font-size: 18px;
  border-radius: 6px;
  background: lightgray;
  border: none;
  cursor: pointer;

  :hover {
    background: lightblue;
    transition: all 200ms ease;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onKeyDown = (event) => {
    if (event.key === "Enter") loginUser();
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginUser = () => {
    UserService.loginUser(username, password)
      .then((response) => console.log(response))
      .catch((error) =>
        console.log(JSON.stringify(error.response.data.message))
      );
  };

  return (
    <>
      <NavBar selectedTab="login" />
      <LoginContainer>
        <div>
          <Username
            autoFocus
            placeholder="username"
            onKeyDown={onKeyDown}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          <Password
            type="password"
            placeholder="password"
            onKeyDown={onKeyDown}
            onChange={onPasswordChange}
          />
        </div>
        <LoginButton onClick={loginUser}>Log In</LoginButton>
      </LoginContainer>
      <Footer />
    </>
  );
};

export default LoginPage;
