// we want to import everything as model ,so used *model
import * as model from "./model.js";
//importing recipe view
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

// SHOW RECIPE
const controlRecipes = async function () {
  try {
    // HASH CHANGE
    const id = window.location.hash.slice(1);
    console.log(id);

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
    // render() method will take that data and will store that data as this. #data in recipeView.js
  } catch (err) {
    alert(err);
  }
};
// 1. hashchange.addEventlistener("hashchange", controlRecipes)
// 2. load.addEventlistener("load", controlRecipes)
// In short we wrote as below:
["hashchange", "load"].forEach((eventItem) =>
  window.addEventListener(eventItem, controlRecipes)
);
