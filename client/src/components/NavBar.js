import React from "react";
import styled from "styled-components";

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
    border-bottom: 2px solid black;
  }
`;

const NavBar = () => {
  return (
    <Container>
      <Logo href="/home">
        <FirstLetter>N</FirstLetter>ibble
      </Logo>
      <Pages>
        <PageLink href="/search">Search</PageLink>
        <PageLink href="/create">Create</PageLink>
        <PageLink href="/profile">Profile</PageLink>
      </Pages>
    </Container>
  );
};

export default NavBar;
