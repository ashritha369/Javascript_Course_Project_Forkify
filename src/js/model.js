import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
// named export "state"
export const state = {
  recipe: {},
};

// loadRecipe function is responsible for actually fetching the recipe from the API.
// named export "loadRecipe"
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // Creating new object from data(for our convenience)
    // let recipe = data.data.recipe; recipe on both sides, so using object destructuring
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    //Temporary error handling
    console.error(`${err} :::::: `);
  }
};
