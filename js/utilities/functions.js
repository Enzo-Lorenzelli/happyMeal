getRecipes().then((data) => window.localStorage.setItem('recipes', JSON.stringify(data.recettes)));
const RECIPES = JSON.parse(window.localStorage.getItem('recipes'));

// Elements of the modal for the details of the recipe
const modalDetailsRecipe = document.querySelector('#detailsRecipe');
const modalDetailsRecipeName = modalDetailsRecipe.querySelector('#detailsRecipeName');
const modalDetailsRecipeCategory = modalDetailsRecipe.querySelector('#detailsRecipeCategory');
const modalDetailsRecipePreparationTime = modalDetailsRecipe.querySelector(
  '#detailsRecipePreparationTime'
);
const modalDetailsRecipeContent = modalDetailsRecipe.querySelector('#detailsRecipeContent');

// Elements for the search bar
const searchBar = document.querySelector('#searchBar');
const searchDataList = document.querySelector('#searchDataList');
const searchButton = document.querySelector('#searchButton');

/**
 * Returns an array with n elements from an input array. This function avoids duplicates.
 * @param {any[]} input An input array of values that will be used to generate the random output array.
 * @param {number} n Number of random elements inside the array.
 */
function getRandomElements(input, n) {
  if (n > input.length) {
    throw new Error('The number of elements requested is greater than the length of the array.');
  }

  const copy = input.slice();
  const output = [];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    output.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }

  return output;
}

/**
 * Clear all information of the recipe modal.
 */
function clearModalDetailsRecipe() {
  modalDetailsRecipeName.innerText = '';
  modalDetailsRecipeCategory.innerText = '';
  modalDetailsRecipePreparationTime.innerText = '';
  modalDetailsRecipeContent.textContent = '';
}

/**
 * Shows an error in the recipe modal.
 * @param {string} message The error message.
 */
function showErrorModalDetailsRecipe(message) {
  modalDetailsRecipeName.innerText = 'Error';
  modalDetailsRecipeCategory.innerText = '';
  modalDetailsRecipePreparationTime.innerText = '';
  modalDetailsRecipeContent.innerHTML = `<p style="color: #ff3333">${message}<p>`;
}

/**
 * Shows all information of a recipe in the recipe modal.
 * @param {object} recipeData The current recipe.
 */
function showModalDetailsRecipe(recipeData) {
  modalDetailsRecipeName.innerText = recipeData.nom;
  modalDetailsRecipeCategory.innerText = recipeData.categorie;
  modalDetailsRecipePreparationTime.innerText =
    'Temps de préparation - ' + recipeData.temps_preparation;

  modalDetailsRecipeContent.innerHTML = `
    <h5 class="fw-bold" style="color: #ff3333">Ingrédients</h5>
  `;

  // Generates ingredients of the recipe.
  // If the array of ingredients is an array of objects, generates a table.
  // If the array of ingredients is an array of strings, generates a list.
  if (recipeData.ingredients.some((ingredient) => ingredient instanceof Object)) {
    modalDetailsRecipeContent.innerHTML += `
      <table class="table">
        <tbody id="detailsRecipeIngredients"></tbody>
      </table>
    `;

    const modalDetailsRecipeIngredients = modalDetailsRecipeContent.querySelector(
      '#detailsRecipeIngredients'
    );
    recipeData.ingredients.forEach((ingredient) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ingredient.nom}</td>
        <td>${ingredient.quantite}</td>
      `;
      modalDetailsRecipeIngredients.appendChild(row);
    });
  } else {
    modalDetailsRecipeContent.innerHTML += `
    <ul
      class="list-group list-group-flush"
      id="detailsRecipeIngredients"
    ></ul>
    `;

    const modalDetailsRecipeIngredients = modalDetailsRecipeContent.querySelector(
      '#detailsRecipeIngredients'
    );
    recipeData.ingredients.forEach((ingredient) => {
      const row = document.createElement('li');
      row.classList.add('list-group-item');
      row.innerText = ingredient;
      modalDetailsRecipeIngredients.appendChild(row);
    });
  }

  modalDetailsRecipeContent.innerHTML += `
    <h5 class="fw-bold" style="color: #ff3333">Étapes</h5>
    <ol
      class="list-group list-group-numbered list-group-flush"
      id="detailsRecipeSteps"
    ></ol>
  `;

  // Generates the list of steps.
  const modalDetailsRecipeSteps = modalDetailsRecipeContent.querySelector('#detailsRecipeSteps');
  recipeData.etapes.forEach((step) => {
    const row = document.createElement('li');
    row.classList.add('list-group-item');
    row.innerText = step;
    modalDetailsRecipeSteps.appendChild(row);
  });
}

// Generates all options of the search bar to make auto-completion
RECIPES.forEach((recipe) => {
  const option = document.createElement('option');
  option.value = recipe.nom;
  option.innerText = recipe.nom;
  searchDataList.appendChild(option);
});

// When the search button is clicked, show details of a recipe in a modal of the current value of the search bar.
searchButton.addEventListener('click', () => {
  clearModalDetailsRecipe();

  // Shows a error in the modal if the value of the search bar is empty.
  if (searchBar.value === '') {
    showErrorModalDetailsRecipe('La recherche est vide !');
    return;
  }

  const find = RECIPES.filter((recipe) => recipe.nom === searchBar.value);

  // Shows a error in the modal if the value of the search bar gives no result.
  if (find.length === 0) {
    showErrorModalDetailsRecipe('Le résultat introuvable !');
    return;
  }

  // Shows the details of the recipe in a modal.
  showModalDetailsRecipe(find[0]);
});
