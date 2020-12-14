import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styled from "styled-components";
import BasicButton from "../components/BasicButton";
import RecipeService from "../services/RecipeService";

const CreateContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  margin-bottom: 80px;
`;

const FieldContainer = styled.div`
  font-size: 24px;
  margin-left: 50px;
  text-align: left;
`;

const RecipeFieldInput = styled.input`
  width: 400px;
  margin-right: 20px;
  margin-left: 10px;
  font-size: 24px;
  padding: 4px;
  border: 2px solid black;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`;

const RecipeSelectInput = styled.select`
  width: 100px;
  margin-right: 20px;
  margin-left: 10px;
  font-size: 24px;
  padding: 4px;
  border: 2px solid black;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`;

const RecipeNumberInput = styled.input`
  width: 100px;
  font-size: 24px;
  margin-right: 20px;
  margin-left: 10px;
  padding: 4px;
  border: 2px solid black;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`;

const AddIngredientButton = BasicButton({ hoverColor: "lightblue" });

const HR = styled.hr`
  margin: 5px 0px;
  height: 3px;
  background-color: darkorchid;
  border: none;
  border-radius: 10px;
`;

const CreateButton = BasicButton({ hoverColor: "lightblue" });
const MyCreatedButton = BasicButton({ hoverColor: "lightblue" });
const MySavedButton = styled(BasicButton({ hoverColor: "lightblue" }))`
  margin-left: 30px;
`;

const CreatePage = () => {
  const history = useHistory();
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
      <CreateContainer>
        <FieldContainer>
          <div>
            Name:
            <RecipeFieldInput
              value={recipeName}
              autoFocus
              placeholder="Peach Cobbler"
              onChange={({ target }) => setRecipeName(target.value)}
            />
          </div>
          <br />
          <div>
            Difficulty:
            <RecipeSelectInput
              value={difficulty}
              onChange={({ target }) => setDifficulty(target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </RecipeSelectInput>
          </div>
          <br />
          <div>
            Cooking Method:
            <RecipeFieldInput
              value={cookingMethod}
              placeholder="Oven Bake"
              onChange={({ target }) => setCookingMethod(target.value)}
            />
          </div>
          <br />
          <div>
            Serving Size:
            <RecipeFieldInput
              type="number"
              value={servingSize}
              onChange={({ target }) => setServingSize(target.value)}
            />
          </div>
          <br />
          <div>
            Cuisine:
            <RecipeFieldInput
              value={cuisine}
              placeholder="American"
              onChange={({ target }) => setCuisine(target.value)}
            />
          </div>
          <br />
          <div>
            Minutes to Make:
            <RecipeFieldInput
              type="number"
              value={minutes}
              onChange={({ target }) => setMinutes(target.value)}
            />
          </div>
          {ingredients.map((ingredient, index) => (
            <>
              <br />
              <div key={index}>
                Ingredient Name:{" "}
                <RecipeFieldInput
                  value={ingredient.name}
                  placeholder="Peaches"
                  onChange={({ target }) =>
                    changeIngredientField(target.value, index, "name")
                  }
                />
                Unit:{" "}
                <RecipeNumberInput
                  value={ingredient.measurement.unit}
                  placeholder="Canned"
                  onChange={({ target }) =>
                    changeIngredientField(target.value, index, "unit")
                  }
                />
                Amount:{" "}
                <RecipeNumberInput
                  type="number"
                  value={ingredient.measurement.amount}
                  onChange={({ target }) =>
                    changeIngredientField(target.value, index, "amount")
                  }
                />
              </div>
            </>
          ))}
          <br />
          <div>
            <AddIngredientButton onClick={addIngredient}>
              Add Ingredient
            </AddIngredientButton>
          </div>
        </FieldContainer>
        <br />
        <CreateButton onClick={onCreate}>Create</CreateButton>
        <br />
        <br />
        <HR />
        <br />
        <MyCreatedButton onClick={() => history.push("/created")}>
          My Created Recipes
        </MyCreatedButton>
        <MySavedButton onClick={() => history.push("/saved")}>
          My Saved Recipes
        </MySavedButton>
      </CreateContainer>
      <Footer />
    </>
  );
};

export default CreatePage;
