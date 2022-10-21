// we want to import everything as model ,so used *model
import * as model from "./model.js";
import icons from "url:../img/icons.svg"; //parcel 2
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///RENDER SPINNER
const renderSpinner = function (parentEl) {
  const markup = ` <div class="spinner">
                      <svg>
                        <use href="${icons}#icon-loader"></use>
                      </svg>
                  </div> `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

// SHOW RECIPE
const showRecipe = async function () {
  try {
    // HASH CHANGE
    const id = window.location.hash.slice(1);
    console.log(id);

    // guard class:if there is no id, then return
    if (!id) return;
    ///////////////////
    renderSpinner(recipeContainer);
    //1)LOADING RECIPE: loadRecipe func is async so it will return a promise. so we are awaiting it before we move on to next step. Here loadRecipe will not return anything so we are not storing it in any variable, instead here we can access state.recipe of model.js
    await model.loadRecipe(id);
    // we now have access to below
    // const recipe = model.state.recipe;
    // destructuring above line as below:
    const { recipe } = model.state;

    // 2)RENDERING RECIPE
    const markup = `   
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map((ing) => {
            return `
        <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
        </li>`;
          })
          .join("")}
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};
// 1. hashchange.addEventlistener("hashchange", showRecipe)
// 2. load.addEventlistener("load", showRecipe)
// In short we wrote as below:
["hashchange", "load"].forEach((eventItem) =>
  window.addEventListener(eventItem, showRecipe)
);
