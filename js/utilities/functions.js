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
    'Temps de préparation: ' + recipeData.temps_preparation;

  modalDetailsRecipeContent.innerHTML = `
    <h5 class="fw-bold" style="color: #ff3333">Ingrédients</h5>
    <table class="table">
      <tbody id="detailsRecipeIngredients"></tbody>
    </table>
    <h5 class="fw-bold" style="color: #ff3333">Étapes</h5>
    <ol
      class="list-group list-group-numbered list-group-flush"
      id="detailsRecipeSteps"
    ></ol>
  `;

  // Generates the table of ingredients.
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

  // Generates the list of steps.
  const modalDetailsRecipeSteps = modalDetailsRecipeContent.querySelector('#detailsRecipeSteps');
  recipeData.etapes.forEach((step) => {
    const row = document.createElement('li');
    row.classList.add('list-group-item');
    row.innerText = step;
    modalDetailsRecipeSteps.appendChild(row);
  });
}

getRecipes().then((data) => {
  data.recettes.forEach((recipe) => {
    const option = document.createElement('option');
    option.value = recipe.nom;
    option.innerText = recipe.nom;
    searchDataList.appendChild(option);
  });

  searchButton.addEventListener('click', () => {
    clearModalDetailsRecipe();

    if (searchBar.value === '') {
      showErrorModalDetailsRecipe('La recherche est vide !');
      return;
    }

    const find = data.recettes.filter((recipe) => recipe.nom === searchBar.value);
    if (find.length === 0) {
      showErrorModalDetailsRecipe('Le résultat introuvable !');
      return;
    }

    showModalDetailsRecipe(find[0]);
  });
});
