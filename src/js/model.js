import { async } from "regenerator-runtime";
// named export "state"
export const state = {
  recipe: {},
};

// loadRecipe function is responsible for actually fetching the recipe from the API.
// named export "loadRecipe"
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // converting result back to json and storing it in data
    const data = await res.json();
    // if res.ok===false then custom error should be thrown as
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    //////////////////
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
    alert(err);
  }
};
