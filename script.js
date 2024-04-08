const recipes = [];
let favorites = [];
let shoppingList = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    recipes.push(...data);
  });

function displayRandomRecipes() {
  // ...
}

function handleSearch() {
  // ...
}

function showRecipeDetails(recipeId) {
}

// Page des favoris
document.getElementById("go-back").addEventListener("click", () => {
  window.location.href = "index.html";
});

function displayFavorites() {
  // ...
}

function removeFromFavorites(recipeId) {
  // ...
}

// Page de recette
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");

document.getElementById("go-back").addEventListener("click", () => {
  window.location.href = "index.html";
});

function displayRecipeDetails() {
  // ...
}

function addToFavorites() {
  // ...
}

function addIngredientsToShoppingList() {
  // ...
}

// Page de liste d'achat
document.getElementById("go-back").addEventListener("click", () => {
  window.location.href = "index.html";
});

function displayShoppingList() {
  // ...
}

function removeFromShoppingList(ingredient) {
  // ...
}

function generateShoppingListFile() {
  // ...
}
