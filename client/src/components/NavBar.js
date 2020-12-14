import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserService from "../services/UserService";

const Container = styled.div`
  height: 80px;
  border-bottom: 2px solid black;
`;

const Logo = styled.a`
  margin-left: 16px;
  line-height: 80px;
  font-size: 48px;
  text-decoration: none;
  color: black;
`;

const FirstLetter = styled.span`
  font-weight: bold;
  color: darkorchid;
`;

const Pages = styled.div`
  float: right;
  line-height: 80px;
  font-size: 32px;
`;

const PageLink = styled.a`
  margin-right: 32px;
  text-decoration: none;
  color: black;

  :hover {
    transition: all 100ms ease;
    border-bottom: 2px solid darkorchid;
  }
`;

const HighlightedPageLink = styled.a`
  margin-right: 32px;
  text-decoration: none;
  color: darkorchid;

  :hover {
    transition: all 100ms ease;
    border-bottom: 2px solid darkorchid;
  }
`;

const NavBar = ({ selectedTab, loggedIn = false }) => {
  const [username, setUsername] = useState("Profile");

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        const user = await UserService.getUser();
        setUsername(user.username);
      }
    };
    fetchData();
  }, [loggedIn]);

  return (
    <Container>
      <Logo href="/home">
        <FirstLetter>N</FirstLetter>ibble
      </Logo>
      <Pages>
        {loggedIn ? (
          <>
            {selectedTab === "search" ? (
              <HighlightedPageLink href="/search">Search</HighlightedPageLink>
            ) : (
              <PageLink href="/search">Search</PageLink>
            )}
            {selectedTab === "create" ? (
              <HighlightedPageLink href="/create">Create</HighlightedPageLink>
            ) : (
              <PageLink href="/create">Create</PageLink>
            )}
            {selectedTab === "profile" ? (
              <HighlightedPageLink href="/profile">
                {username}
              </HighlightedPageLink>
            ) : (
              <PageLink href="/profile">{username}</PageLink>
            )}
          </>
        ) : (
          <>
            {selectedTab === "register" ? (
              <HighlightedPageLink href="/register">
                Register
              </HighlightedPageLink>
            ) : (
              <PageLink href="/register">Register</PageLink>
            )}
            {selectedTab === "login" ? (
              <HighlightedPageLink href="/login">Log In</HighlightedPageLink>
            ) : (
              <PageLink href="/login">Log In</PageLink>
            )}
          </>
        )}
      </Pages>
    </Container>
  );
};

export default NavBar;
