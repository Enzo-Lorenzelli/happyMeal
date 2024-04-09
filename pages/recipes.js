fetch("data.json")
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
        const card = document.createElement("div");
        card.classList.add("card", "m-2", "pt-2", "pb-2", "shadow");
        const image = document.createElement("img");
        image.classList.add(
          "card-img-top",
          "object-fit-cover",
              "rounded"
        );
    image.src = recette.image; // Utilise la propriété image de la recette
    image.width = 100; // Définit la largeur de l'image à 200 pixels
    image.height = 200; // Définit la hauteur de l'image à 150 pixels
    const nom = document.createElement("h4");
    nom.textContent = recette.nom;
    nom.classList.add("bg-danger", "rounded", "text-center");

    const categorie = document.createElement("p");
    categorie.textContent = `Catégorie : ${recette.categorie}`;
    categorie.classList.add("text-left");

    const tempsPreparation = document.createElement("p");
    tempsPreparation.textContent = `Temps de préparation : ${recette.temps_preparation}`;
    tempsPreparation.classList.add("text-left");

    const ingredients = document.createElement("p");
    ingredients.classList.add("ingredients", "text-left");

    const favoris = document.createElement("button");
    favoris.innerHTML =
        '<i class="bi bi-heart-fill" style="color: red;"></i>'; // Ajoute une icône de cœur à l'élément
    favoris.classList.add(
        "btn-light",
        "shadow",
        "m-2",
        "text-red",
        "btn-rounded",
        "mx-auto",
        "btn",
        "w-25"
    );

    recette.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = `${ingredient.nom} : ${ingredient.quantite}`;
        ingredients.appendChild(ingredientItem);
        });

    const etapes = document.createElement("ol");
    etapes.classList.add("etapes");
    etapes.classList.add("text-left");
    recette.etapes.forEach((etape) => {
        const etapeItem = document.createElement("li");
        etapeItem.textContent = etape;
        etapes.appendChild(etapeItem);
    });

    card.appendChild(image); // Add img to the card
    card.appendChild(nom);
    card.appendChild(categorie);
    card.appendChild(tempsPreparation);
    card.appendChild(ingredients);
    card.appendChild(etapes);
    card.appendChild(favoris);
    container.appendChild(card);
        });
    }

    const paginationLinks = document.querySelectorAll(".pagination a");
    paginationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        currentPage = parseInt(event.target.textContent); // Get number of page by click
            displayRecipes(currentPage);
            });
        });

    // Show recipes on the first page uploading
    displayRecipes(currentPage);
    });