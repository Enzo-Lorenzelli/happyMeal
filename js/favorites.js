// Gets all favorites in the persistent way.
const favorites = JSON.parse(window.localStorage.getItem('favoriteRecipes'));

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
      <img src="../${recipeData.image}" class="card-img-top" style="height: 250px; background-size: cover" alt="...">
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

// Shows each favorite in the array or shows a message that tells the array of favorites is empty.
const container = document.querySelector('#mainContainer');
if (favorites.length === 0) {
  const div = document.createElement('div');
  div.innerText = 'Il y pas de favoris';
  container.appendChild(div);
} else {
  favorites.forEach((favorite) => {
    addRecipeCard(container, favorite);
  });
}
