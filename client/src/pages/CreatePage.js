import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import BasicButton from "../components/BasicButton";
import RecipeService from "../services/RecipeService";

const Container = styled.div`
  margin-bottom: 80px;
  margin-top: 30px;
  text-align: center;
`;

const RecipeNameInput = styled.input`
  width: 400px;
  font-size: 24px;
  padding: 4px;
  border: 2px solid black;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`;

const CreateButton = BasicButton({ hoverColor: "lightblue" });

const CreatePage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [cookingMethod, setCookingMethod] = useState("");
  const [servingSize, setServingSize] = useState(0);
  const [cuisine, setCuisine] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  const onCreate = async () => {
    if (recipeName !== "") {
      const recipe = {
        name: recipeName,
        difficulty,
        cooking_method: cookingMethod,
        serving_size: servingSize,
        cuisine,
        minutes_to_make: minutes,
        ingredients,
        dietary_types: [],
      };
      await RecipeService.createRecipe(recipe);
      setRecipeName("");
      setDifficulty("Easy");
      setCookingMethod("");
      setServingSize(0);
      setCuisine("");
      setMinutes(0);
      setIngredients([]);
    }
  };

  const addIngredient = () => {
    const tempIngredients = [...ingredients];
    tempIngredients.push({ name: "", measurement: { unit: "", amount: 0 } });
    setIngredients(tempIngredients);
  };

  const changeIngredientField = (value, index, field) => {
    const tempIngredients = [...ingredients];
    switch (field) {
      case "name":
        tempIngredients[index][field] = value;
        break;
      case "unit":
        tempIngredients[index]["measurement"][field] = value;
        break;
      case "amount":
        tempIngredients[index]["measurement"][field] = value;
        break;
      default:
        break;
    }
    setIngredients(tempIngredients);
  };

  return (
    <>
      <NavBar selectedTab="create" loggedIn />
      <Container>
        <div>
          <RecipeNameInput
            value={recipeName}
            autoFocus
            placeholder="New Recipe"
            onChange={({ target }) => setRecipeName(target.value)}
          />
          <div>
            Difficulty:
            <select
              value={difficulty}
              onChange={({ target }) => setDifficulty(target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            Cooking Method:
            <input
              value={cookingMethod}
              onChange={({ target }) => setCookingMethod(target.value)}
            />
          </div>
          <div>
            Serving Size:
            <input
              type="number"
              value={servingSize}
              onChange={({ target }) => setServingSize(target.value)}
            />
          </div>
          <div>
            Cuisine:
            <input
              value={cuisine}
              onChange={({ target }) => setCuisine(target.value)}
            />
          </div>
          <div>
            Minutes to Make:
            <input
              type="number"
              value={minutes}
              onChange={({ target }) => setMinutes(target.value)}
            />
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              Ingredient Name:{" "}
              <input
                value={ingredient.name}
                onChange={({ target }) =>
                  changeIngredientField(target.value, index, "name")
                }
              />
              Unit:{" "}
              <input
                value={ingredient.measurement.unit}
                onChange={({ target }) =>
                  changeIngredientField(target.value, index, "unit")
                }
              />
              Amount:{" "}
              <input
                type="number"
                value={ingredient.measurement.amount}
                onChange={({ target }) =>
                  changeIngredientField(target.value, index, "amount")
                }
              />
            </div>
          ))}
          <div>
            <button onClick={addIngredient}>Add Ingredient</button>
          </div>
        </div>
        <br />
        <CreateButton onClick={onCreate}>Create</CreateButton>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePage;
