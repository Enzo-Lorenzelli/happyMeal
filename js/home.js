const elemMainContainer = document.querySelector('#mainContainer');

/**
 * @param {HTMLElement} parent
 * @param {string[]} recipeSteps
 */
function createStepsList(parent, recipeSteps) {
  const ul = document.createElement('ul');

  recipeSteps.forEach((recipeStep) => {
    const li = document.createElement('li');
    li.innerText = recipeStep;
    ul.appendChild(li);
  });

  parent.appendChild(ul);
}

/**
 * @param {HTMLElement} parent
 * @param {object[]} recipeIngredients
 */
function createIngredientsTable(parent, recipeIngredients) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  thead.innerHTML = `
    <tr>
      <th>Nom de l'ingrédient</th>
      <th>Quantité</th>
    </tr>
  `.trim();

  recipeIngredients.forEach((recipeIngredient) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${recipeIngredient.nom}</td>
      <td>${recipeIngredient.quantite}</td>
    `.trim();
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  parent.appendChild(table);
}

/**
 * @param {HTMLElement} parent
 * @param {string} recipeName
 * @param {string} recipeCategory
 * @param {string} recipePreparationTime
 * @param {object[]} recipeIngredients
 * @param {string[]} recipeSteps
 */
function createRecipeCard(
  parent,
  recipeName,
  recipeCategory,
  recipePreparationTime,
  recipeIngredients,
  recipeSteps
) {
  const card = document.createElement('div');
  const basicInfo = document.createElement('div');

  basicInfo.innerHTML = `
    <div>
      <p>Nom: ${recipeName}</p>
      <p>Catégorie: ${recipeCategory}</p>
      <p>Temps de préparation: ${recipePreparationTime}</p>
    </div>
  `.trim();

  card.appendChild(basicInfo);
  createIngredientsTable(card, recipeIngredients);
  createStepsList(card, recipeSteps);

  parent.appendChild(card);
}

if (elemMainContainer) {
  getRecipes().then((data) => {
    let recipes = data.recettes;

    let randomIndex = Math.floor(Math.random() * recipes.length);
    let randomRecipe = recipes[randomIndex];
    createRecipeCard(
      elemMainContainer,
      randomRecipe.nom,
      randomRecipe.categorie,
      randomRecipe.temps_preparation,
      randomRecipe.ingredients,
      randomRecipe.etapes
    );
  });
}
