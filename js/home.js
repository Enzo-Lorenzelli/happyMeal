const mainContainer = document.querySelector('#mainContainer');

/**
 * Adds a recipe card inside a parent element.
 * @param {HTMLElement} parent The parent element to add the recipe card.
 * @param {object} recipeData The data of the recipe.
 * @param {number} index A looping index.
 */
function addRecipeCard(parent, recipeData, index) {
  const btnShowDetailsId = `btnShowDetails${index}`;
  const column = document.createElement('div');

  column.classList.add('col');
  column.innerHTML = `
    <div class="card h-100 shadow" style="border-color: #ff3333">
      <img src="${recipeData.image}" class="card-img-top" style="height: 250px; background-size: cover" alt="...">
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold" style="color: #ff3333">${recipeData.nom}</h5>
          <span class="card-text">${recipeData.categorie}</span>
        </div>
        <p class="card-text">Temps de préparation: ${recipeData.temps_preparation}</p>
        <a id="${btnShowDetailsId}" href="#" data-bs-toggle="modal" data-bs-target="#detailsRecipe" class="btn btn-primary border-0 custom-button custom-hover-button text-black" style="width: fit-content">Voir les détails</a>
      </div>
    </div>
  `;

  parent.appendChild(column);
  const btnShowDetails = document.querySelector(`#${btnShowDetailsId}`);

  btnShowDetails.addEventListener('click', () => {
    clearModalDetailsRecipe();
    showModalDetailsRecipe(recipeData);
  });
}

const randomRecipes = getRandomElements(RECIPES, 6);
randomRecipes.forEach((recipe, i) => {
  addRecipeCard(mainContainer, recipe, i);
});
