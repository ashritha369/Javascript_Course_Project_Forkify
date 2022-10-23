import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
// named export "state"
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

// loadRecipe function is responsible for actually fetching the recipe from the API.
// named export "loadRecipe"
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

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
    // we will throw the err like below, so this error will propagate to controller.js and then to recipeview via renderError()
    throw err;
  }
};
// Working on search results

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    // now lets map over each recipe(rec) with the data.data.recipes
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} :::::: `);
    // we will throw the err like below, so this error will propagate to controller.js and then to recipeview via renderError()
    throw err;
  }
};

//we need to call loadSearchResults in controller
