import React from "react";
import styled from "styled-components";
import Avatar from "react-avatar";

const CardContainer = styled.div`
  width: 50%;
  margin-left: 25%;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 24px;
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
    user: { displayName, avatarColor, initialsColor },
  },
}) => {
  return (
    <CardContainer>
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
