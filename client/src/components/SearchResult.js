import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 50%;
  margin-left: 25%;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 18px;
`;

const Header = styled.div`
  height: 40px;
  border-bottom: 1px solid black;
`;

const Title = styled.div`
  display: inline-block;
  width: 50%;
  text-align: left;
`;

const Time = styled.div`
  display: inline-block;
  width: 50%;
  text-align: right;
`;

const formatRecipeDuration = (time, timeUnit) => {
  let unit;
  switch (timeUnit) {
    case "m":
      unit = time > 1 ? "minutes" : "minute";
      break;
    case "h":
      unit = time > 1 ? "hours" : "hour";
      break;
    default:
      return "UNKNOWN";
  }

  return `${time} ${unit}`;
};

const SearchResult = ({
  recipe: { id, name, time, timeUnit, ingredients },
}) => {
  return (
    <CardContainer>
      <Header>
        <Title>{name}</Title>
        <Time>{formatRecipeDuration(time, timeUnit)}</Time>
      </Header>
    </CardContainer>
  );
};

export default SearchResult;
