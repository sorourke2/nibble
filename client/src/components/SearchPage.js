import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import SearchResult from "./SearchResult";

const tempResults = [
  {
    id: 1,
    name: "Apple Pie",
    time: 90,
    timeUnit: "m",
    ingredients: [
      "1 recipe pastry for a 9 inch double crust pie",
      "1/2 cup unsalted butter",
      "3 tablespoons all-purpose flour",
      "1/4 cup water",
      "1/2 cup white sugar",
      "1/2 cup packed brown sugar",
      "8 Granny Smith apples - peeled, cored, and sliced",
    ],
  },
  {
    id: 2,
    name: "Apple Crisp",
    time: 1,
    timeUnit: "h",
    ingredients: [
      "2 1/2 cups apples - peeled, cored, and sliced",
      "1 cup sifted all-purpose flour",
      "1 cup white sugar",
      "1/2 teaspoon ground cinnamon",
      "1/4 teaspoon salt",
      "1/2 cup butter, softened",
    ],
  },
  {
    id: 3,
    name: "Homemade Apple Cider",
    time: 3,
    timeUnit: "h",
    ingredients: [
      "10 large apples, quartered",
      "1/2 orange, halved",
      "4 cinnamon sticks",
      "1 tsp. cloves",
      "1 tsp. whole allspice",
      "1 whole nutmeg",
      "1/2 c. packed brown sugar",
    ],
  },
];

const SearchContainer = styled.div`
  text-align: center;
`;

const Prompt = styled.div`
  margin: 60px;
  font-size: 36px;
`;

const SearchBar = styled.input`
  font-size: 28px;
  width: 400px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 120px;
  font-size: 28px;
  padding: 10px;
  margin-left: 20px;
  background: lightgray;
  border: none;
  cursor: pointer;

  :hover {
    background: lightblue;
    transition: all 200ms ease;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 60px;
`;

const SearchPage = () => {
  const [clicked, setClicked] = useState(false);

  const onSearchChange = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    setClicked(true);
  };

  return (
    <>
      <NavBar />
      <SearchContainer>
        <Prompt>What are you looking for?</Prompt>
        <SearchBar
          autoFocus
          placeholder="Apple Pie"
          onKeyDown={onSearchChange}
        />
        <SearchButton onClick={onSearch}>Search</SearchButton>
        {clicked && (
          <ResultsContainer>
            {tempResults.map((result) => (
              <SearchResult key={result.id} recipe={result} />
            ))}
          </ResultsContainer>
        )}
      </SearchContainer>
    </>
  );
};

export default SearchPage;
