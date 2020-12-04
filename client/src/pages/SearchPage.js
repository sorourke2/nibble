import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import SearchResult from "../components/SearchResult";
import Footer from "../components/Footer";
import RecipeService from "../services/RecipeService";

const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Prompt = styled.div`
  margin-top: 60px;
  font-size: 24px;
`;

const SearchBar = styled.input`
  margin-top: 40px;
  font-size: 18px;
  width: 400px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 10px;

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 100px;
  font-size: 20px;
  padding: 10px;
  margin-left: 20px;
  background: lightgray;
  border: none;
  cursor: pointer;
  border-radius: 6px;

  :hover {
    background: lightblue;
    transition: all 200ms ease;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 40px;
`;

const ResultsCount = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

const SearchPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [paramsString] = useState(location.search);
  const [clicked, setClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [oldSearchTerm, setOldSearchTerm] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(paramsString);
      const searchQuery = searchParams.get("q");
      if (searchQuery) {
        setClicked(true);
        setSearchTerm(searchQuery);
        setOldSearchTerm(searchQuery);
        // TODO: Refactor to service
        const recipes = await fetch(
          "http://localhost:4000/api/recipes"
        ).then((response) => response.json());
        setResults(recipes);
      }
    };
    fetchData();
  }, [paramsString]);

  const onSearchKeyDown = (event) => {
    if (event.key === "Enter") onSearch();
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onSearch = async () => {
    history.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    setClicked(true);
    setOldSearchTerm(searchTerm);
    const recipes = await RecipeService.findAllRecipes();
    setResults(recipes);
  };

  return (
    <>
      <NavBar selectedTab="search" loggedIn={true} />
      <SearchContainer>
        {!clicked && <Prompt>What are you looking for?</Prompt>}
        <SearchBar
          autoFocus
          placeholder="Apple Pie"
          value={searchTerm}
          onKeyDown={onSearchKeyDown}
          onChange={onSearchChange}
        />
        <SearchButton onClick={onSearch}>Search</SearchButton>
        {results && (
          <>
            <ResultsCount>
              {results.length} results for "{oldSearchTerm}"
            </ResultsCount>
            <ResultsContainer>
              {results.map((result) => (
                <SearchResult key={result.id} recipe={result} />
              ))}
            </ResultsContainer>
          </>
        )}
      </SearchContainer>
      <Footer />
    </>
  );
};

export default SearchPage;
