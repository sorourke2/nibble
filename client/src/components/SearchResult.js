import React from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import { useHistory } from "react-router-dom";

const CardContainer = styled.div`
  width: 50%;
  margin-left: 25%;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 24px;

  cursor: pointer;
  :hover {
    background-color: orchid;
  }
`;

const Header = styled.div`
  height: 40px;
`;

const Title = styled.div`
  float: left;
`;

const AvatarContainer = styled.div`
  float: right;
`;

const HR = styled.hr`
  margin: 5px 0px;
  height: 3px;
  background-color: darkorchid;
  border: none;
  border-radius: 10px;
`;

const SearchResult = ({
  recipe: {
    id,
    name,
    time,
    timeUnit,
    ingredients,
    author: { displayName, avatarColor, initialsColor },
  },
}) => {
  const history = useHistory();

  return (
    <CardContainer onClick={() => history.push(`/recipe/${id}`)}>
      <Header>
        <Title>{name}</Title>
        <AvatarContainer>
          <Avatar
            name={displayName}
            color={avatarColor}
            fgColor={initialsColor}
            size={60}
          />
        </AvatarContainer>
      </Header>
      <br />
      <HR />
    </CardContainer>
  );
};

export default SearchResult;
