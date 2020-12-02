import React from "react";
import styled from "styled-components";
import { BarLoader } from "react-spinners";

const Container = styled.div`
  width: 100%;
  background-color: orchid;
`;

const LoadingBar = ({ loading }) => (
  <Container>
    <BarLoader loading={loading} width={"100%"} color={"darkorchid"} />
  </Container>
);

export default LoadingBar;
