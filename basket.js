class Basket {
  constructor() {
    this.loadBasketFromLocalStorage();
  }

  loadBasketFromLocalStorage() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      this.basket = [];
    } else {
      this.basket = JSON.parse(basket);
    }
  }

  save() {
    localStorage.setItem("basket", JSON.stringify(this.basket));
  }

  add(product) {
    let foundProduct = this.basket.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity++;
    } else {
      product.quantity = 1;
      this.basket.push(product);
    }
    this.save();
  }

  removeFromBasket(product) {
    this.basket = this.basket.filter((p) => p.id != product.id);
    this.save();
  }

  changeQuantity(product, quantity) {
    let foundProduct = this.basket.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct.quantity <= 0) {
        this.removeFromBasket(foundProduct);
      } else {
        this.save();
      }
    }
  }

  getNumberProduct() {
    let number = 0;
    for (let product of this.basket) {
      number += product.quantity;
    }
    return number;
  }

  getTotalPrice() {
    let total = 0;
    for (let product of this.basket) {
      total += product.quantity * product.price;
    }
    return total;
  }

  generateShoppingListPreview() {
    const shoppingList = this.generateShoppingList();
    let previewParagraph = "<p><strong>Shopping List:</strong></p>";

    if (Object.keys(shoppingList).length === 0) {
      previewParagraph += "<p>Your shopping list is empty.</p>";
    } else {
      previewParagraph += "<ul>";
      for (const ingredient in shoppingList) {
        previewParagraph += `<li>${ingredient}: ${shoppingList[ingredient]}</li>`;
      }
      previewParagraph += "</ul>";
    }

    document.getElementById("preview").innerHTML = previewParagraph;
  }

  generateShoppingList() {
    let shoppingList = {};
    for (let product of this.basket) {
      if (product.ingredients && Array.isArray(product.ingredients)) {
        // Check if ingredients property exists and is an array
        for (let ingredient of product.ingredients) {
          if (!shoppingList[ingredient]) {
            shoppingList[ingredient] = 0;
          }
          shoppingList[ingredient] += ingredient.quantity * product.quantity;
        }
      }
    }
    return shoppingList;
  }
}

const basket = new Basket();
basket.generateShoppingListPreview();

const buttonAdd = document.getElementById("buttonAdd");
const buttonRemove = document.getElementById("buttonRemove");
const buttonAddFavorite = document.getElementById("buttonAddFavorite");

buttonAdd.addEventListener("click", function () {
  basket.add(product);
});

buttonRemove.addEventListener("click", function () {
  basket.removeFromBasket(product);
});

buttonAddFavorite.addEventListener("click", function () {
  addFavorite(recipe);
});

buttonAdd.classList.add("btn", "btn-primary");
buttonRemove.classList.add("btn", "btn-danger");
buttonAddFavorite.classList.add("btn", "btn-success");

function addFavorite(recipe) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(recipe);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  console.log("Recipe added to favorites!");
}

document.addEventListener("DOMContentLoaded", function () {
  const recipeListContainer = document.getElementById("recipeList");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.recettes.forEach((recipe) => {
        const recipeName = recipe.nom;
        const listItem = document.createElement("li");
        listItem.textContent = recipeName;

        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.classList.add("add-button");
        addButton.addEventListener("click", function () {
          addRecipeToShoppingList(recipeName);
          console.log("Recipe added to shopping list: " + recipeName);
        });
        listItem.appendChild(addButton);

        const addFavoriteButton = document.createElement("button");
        addFavoriteButton.textContent = "Add to Favorites";
        addFavoriteButton.classList.add("add-favorite-button");
        addFavoriteButton.addEventListener("click", function () {
          addFavorite(recipe);
          console.log(
            "Add to Favorites button clicked for recipe: " + recipeName
          );
        });
        listItem.appendChild(addFavoriteButton);

        recipeListContainer.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
});

const shoppingList = [];

function updateShoppingListPreview() {
  const shoppingListPreview = document.getElementById("shoppingListPreview");
  shoppingListPreview.innerHTML = "";

  shoppingList.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.quantity} x ${item.name}`;
    shoppingListPreview.appendChild(listItem);
  });
}

function addRecipeToShoppingList(recipeName) {
  // Vérifier si la recette est déjà dans la liste de courses
  const existingRecipeIndex = shoppingList.findIndex(
    (item) => item.name === recipeName
  );

  if (existingRecipeIndex !== -1) {
    // Si la recette existe déjà, augmenter la quantité
    shoppingList[existingRecipeIndex].quantity++;
  } else {
    // Sinon, ajouter une nouvelle entrée
    shoppingList.push({ name: recipeName, quantity: 1 });
  }

  updateShoppingListPreview();
}

document.addEventListener("DOMContentLoaded", function () {
  const recipeListContainer = document.getElementById("recipeList");
  recettes.forEach((recipe) => {
    const recipeName = recipe.nom;
    const listItem = document.createElement("li");
    listItem.textContent = recipeName;

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.classList.add("add-button");
    addButton.addEventListener("click", function () {
      addRecipeToShoppingList(recipeName);
      console.log("Recipe added to shopping list: " + recipeName);
    });

    listItem.appendChild(addButton);
    recipeListContainer.appendChild(listItem);
  });
});

//add favorite :
// Déclaration de la variable favoriteRecipes comme un tableau vide
// Déclaration de la variable favoriteRecipes comme un tableau vide
const favoriteRecipes = [];

// Fonction pour mettre à jour l'affichage de la liste des favoris
function updateFavoriteRecipes() {
  favoriteRecipesContainer.innerHTML = "";
  favoriteRecipes.forEach((recipe) => {
    const listItem = document.createElement("li");
    listItem.textContent = recipe.nom;
    favoriteRecipesContainer.appendChild(listItem);
  });
}

// Fonction pour ajouter une recette aux favoris
function addFavorite(recipe) {
  // Vérifier si la recette est déjà dans les favoris
  const existingRecipeIndex = favoriteRecipes.findIndex(
    (item) => item.nom === recipe.nom
  );

  if (existingRecipeIndex === -1) {
    // Si la recette n'est pas déjà dans les favoris, l'ajouter
    favoriteRecipes.push(recipe);
    updateFavoriteRecipes(); // Mettre à jour l'affichage des favoris
    console.log("Recipe added to favorites!");
  } else {
    console.log("Recipe is already in favorites!");
  }
}

const favoriteRecipesContainer = document.getElementById("favoriteRecipes");

function updateFavoriteRecipes() {
  favoriteRecipesContainer.innerHTML = "";
  favoriteRecipes.forEach((recipe) => {
    const listItem = document.createElement("li");
    listItem.textContent = recipe.nom;
    favoriteRecipesContainer.appendChild(listItem);
  });
}

updateFavoriteRecipes(); // Met à jour l'affichage de la liste des favoris
