// we want to import everything as model ,so used *model
import * as model from "./model.js";
//importing recipe view
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// import { async } from "regeneration-runtime";

// below lines are from parcel
if (module.hot) {
  module.hot.accept();
}

// SHOW RECIPE
const controlRecipes = async function () {
  try {
    // HASH CHANGE
    const id = window.location.hash.slice(1);

    // guard class:if there is no id, then return
    if (!id) return;
    /////////////////// renderSpinner() will render the spinner on the recipeView
    recipeView.renderSpinner();

    //1)LOADING RECIPE
    //loadRecipe func is async so it will return a promise. so we are awaiting it before we move on to next step. Here loadRecipe will not return anything so we are not storing it in any variable, instead here we can access state.recipe of model.js
    await model.loadRecipe(id);

    // 2)RENDERING RECIPE
    //  model.state.recipe 's data is passed to render () method as shown below:
    recipeView.render(model.state.recipe);
    console.log("model.state.recipe:", model.state.recipe);

    // render() method will take that data and will store that data as this. #data in recipeView.js
  } catch (err) {
    recipeView.renderError();
  }
};
// SEARCH RECIPE
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1)GET SEARCH QUERY , here query can be anything like 'pizza';
    const query = searchView.getQuery();
    // if there is no query then return immediately : using guard class we write it as below
    if (!query) return;
    // model.loadSearchResults("pizza"); returns nothing so we won't store it we will just awaits it

    //2) LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3)RENDER RESULTS
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  // console.log("controlrecipes", controlRecipes);
  searchView.addhandlerSearch(controlSearchResults);
};

init();
