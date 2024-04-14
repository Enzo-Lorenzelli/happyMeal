document.addEventListener("DOMContentLoaded", () => {
  const favoriteRecipesContainer = document.getElementById("favoriteRecipes");
  let favoriteRecipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    // Vérifier si favoriteRecipes est un tableau
    if (!Array.isArray(favoriteRecipes)) {
    favoriteRecipes = [];
    }

  
  // Function to check if a recipe is already favorited
  function isFavorited(recipe) {
    return favoriteRecipes.some((fav) => fav.nom === recipe.nom);
  }



  console.log(favoriteRecipes)
  console.log(typeof favoriteRecipes)
  // fonction pour récupérer les éléments d'un tableau mais j'ai pas de tableau avant cette fonction
  favoriteRecipes.forEach((recette, index) => {
    const card = createRecipeCard(recette, index);
    favoriteRecipesContainer.appendChild(card);
  });

  // Function to create a recipe card
  function createRecipeCard(recette, index) {
    const card = document.createElement("div");
    card.classList.add("card", "m-2", "pt-2", "pb-2", "shadow");

    // Create card content
    const image = document.createElement("img");
    image.classList.add("card-img-top", "object-fit-cover", "rounded");
    image.src = recette.image;
    image.width = 100;
    image.height = 200;

    const nom = document.createElement("h4");
    nom.textContent = recette.nom;
    nom.classList.add("bg-danger", "rounded", "text-center");

    const categorie = document.createElement("p");
    categorie.textContent = `Catégorie : ${recette.categorie}`;
    categorie.classList.add("text-left");

    const tempsPreparation = document.createElement("p");
    tempsPreparation.textContent = `Temps de préparation : ${recette.temps_preparation}`;
    tempsPreparation.classList.add("text-left");

    const ingredients = document.createElement("ul");
    ingredients.classList.add("ingredients", "text-left");

    recette.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient.nom} : ${ingredient.quantite}`;
      ingredients.appendChild(ingredientItem);

      // Create and append add to cart button for each ingredient
      const addIngredientToCartButton = document.createElement("button");
      addIngredientToCartButton.innerHTML =
        '<i class="bi bi-cart-plus"></i> Add';
      addIngredientToCartButton.classList.add(
        "btn-light",
        "shadow",
        "m-2",
        "text-red",
        "btn-rounded",
        "mx-auto",
        "btn",
        "w-25",
        "add-ingredient-to-cart-btn"
      );

      addIngredientToCartButton.addEventListener("click", () => {
        addToCart(recette, ingredient);
      });

      ingredients.appendChild(addIngredientToCartButton);
    });

    const etapes = document.createElement("ol");
    etapes.classList.add("etapes", "text-left");
    recette.etapes.forEach((etape) => {
      const etapeItem = document.createElement("li");
      etapeItem.textContent = etape;
      etapes.appendChild(etapeItem);
    });

    const favori = document.createElement("button");
    favori.innerHTML = '<i class="bi bi-heart-fill" style="color: red;"></i>';
    favori.classList.add(
      "btn-light",
      "shadow",
      "m-2",
      "text-red",
      "btn-rounded",
      "mx-auto",
      "btn",
      "w-25"
    );

    favori.addEventListener("click", () => {
      if (isFavorited(recette)) {
        // If already favorited, remove from favorites
        favoriteRecipes = favoriteRecipes.filter(
          (fav) => fav.nom !== recette.nom
        );
        favori.innerHTML =
          '<i class="bi bi-heart" style="color: red;"></i> Add to favorites';
      } else {
        // If not favorited, add to favorites
        favoriteRecipes.push(recette);
        favori.innerHTML =
          '<i class="bi bi-heart-fill" style="color: red;"></i> Remove from favorites';
      }
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    });

    // Create and append the add all to cart button
    const addAllToCartButton = document.createElement("button");
    addAllToCartButton.innerHTML =
      '<i class="bi bi-cart-plus"></i> Add All to Cart';
    addAllToCartButton.classList.add(
      "btn-light",
      "shadow",
      "m-2",
      "text-red",
      "btn-rounded",
      "mx-auto",
      "btn",
      "w-25",
      "add-all-to-cart-btn"
    );

    addAllToCartButton.addEventListener("click", () => {
      addAllToCart(recette);
    });

    // Append all elements to the card
    card.appendChild(image);
    card.appendChild(nom);
    card.appendChild(categorie);
    card.appendChild(tempsPreparation);
    card.appendChild(ingredients);
    card.appendChild(etapes);
    card.appendChild(favori);
    card.appendChild(addAllToCartButton);

    return card;
  }

  // Fetch and display all recipes
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      const recettes = data.recettes;
      const container = document.querySelector("#container");
      const itemsPerPage = 9;
      let currentPage = 1;

      function displayRecipes(page) {
        container.innerHTML = "";
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const recipesToShow = recettes.slice(startIndex, endIndex);

        recipesToShow.forEach((recette) => {
          const card = createRecipeCard(recette);
          container.appendChild(card);
        });
      }

      const paginationLinks = document.querySelectorAll(".pagination a");
      paginationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          currentPage = parseInt(event.target.textContent);
          displayRecipes(currentPage);
        });
      });

      displayRecipes(currentPage);
    });
});