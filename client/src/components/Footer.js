import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-top: 1px solid black;
  padding-left: 20px;
  text-align: center;
  background-color: lightsteelblue;
`;

const AuthorLink = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <Container>
      Created by{" "}
      <AuthorLink href="https://github.com/sorourke2" target="_blank">
        Shea O'Rourke
      </AuthorLink>{" "}
      and{" "}
      <AuthorLink href="https://github.com/dillonhammer" target="_blank">
        Dillon Hammer
      </AuthorLink>
    </Container>
  );
};

export default Footer;
