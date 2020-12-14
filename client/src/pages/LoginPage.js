import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserService from "../services/UserService";
import LoadingBar from "../components/LoadingBar";

const LoginContainer = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 80px;
`;

const Prompt = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
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

const ErrorPrompt = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
  color: red;
`;

const LoadingContainer = styled.div`
  margin-left: 40%;
  margin-top: 20px;
  width: 20%;
  background-color: orchid;
`;

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onKeyDown = (event) => {
    if (event.key === "Enter") loginUser();
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const user = await UserService.loginUser(username, password);
      localStorage.setItem("token", user.token);
      setLoading(false);
      history.push("/home");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <NavBar selectedTab="login" />
      <LoginContainer>
        <Prompt>Log in to continue</Prompt>
        <div>
          <Username
            autoFocus
            placeholder="username"
            onKeyDown={onKeyDown}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Password
            type="password"
            placeholder="password"
            onKeyDown={onKeyDown}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        {errorMessage && <ErrorPrompt>{errorMessage}</ErrorPrompt>}
        <LoginButton onClick={loginUser}>Log In</LoginButton>
        <LoadingContainer>
          <LoadingBar loading={loading} />
        </LoadingContainer>
      </LoginContainer>
      <Footer />
    </>
  );
};

export default LoginPage;
