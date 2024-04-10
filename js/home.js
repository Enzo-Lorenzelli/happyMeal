const elemMainContainer = document.querySelector('#mainContainer');
const elemFormSearchBar = document.querySelector('#formSearchBar');
const elemSearchBar = document.querySelector('#searchBar');
const elemSearchDataList = document.querySelector('#searchDataList');

/**
 * @param {string[]} recipeSteps
 */
// function getStepsList(recipeSteps) {
//   const tempContainer = document.createElement('template');
//   tempContainer.innerHTML = `<div class="card"></div>`;

//   const tempTitle = document.createElement('template');
//   tempTitle.innerHTML = `<div class="card-header">Étapes</div>`;

//   const tempUl = document.createElement('template');
//   tempUl.innerHTML = `<ul class="list-group list-group-flush"></ul>`;

//   const elemContainer = tempContainer.content.firstElementChild;
//   const elemTitle = tempTitle.content.firstElementChild;
//   const elemUl = tempUl.content.firstElementChild;

//   recipeSteps.forEach((recipeStep) => {
//     const tempLi = document.createElement('template');
//     tempLi.innerHTML = `<li class="list-group-item">${recipeStep}</li>`;
//     elemUl.appendChild(tempLi.content.firstElementChild);
//   });

//   elemContainer.appendChild(elemTitle);
//   elemContainer.appendChild(elemUl);

//   return elemContainer;
// }

/**
 * @param {object[]} recipeIngredients
 */
// function getIngredientsTable(recipeIngredients) {
//   const tempTable = document.createElement('template');
//   tempTable.innerHTML = `<table class="table"></table>`;

//   const tempTHead = document.createElement('template');
//   tempTHead.innerHTML = `
//     <tr>
//       <th>Nom de l'ingrédient</th>
//       <th>Quantité</th>
//     </tr>
//   `;

//   const tempTBody = document.createElement('template');
//   tempTBody.innerHTML = `<tbody></tbody>`;

//   const elemTable = tempTable.content.firstElementChild;
//   const elemTHead = tempTHead.content.firstElementChild;
//   const elemTBody = tempTBody.content.firstElementChild;

//   recipeIngredients.forEach((recipeIngredient) => {
//     const tempTr = document.createElement('template');
//     tempTr.innerHTML = `
//       <tr>
//         <td>${recipeIngredient.nom}</td>
//         <td>${recipeIngredient.quantite}</td>
//       </tr>
//     `;
//     elemTBody.appendChild(tempTr.content.firstElementChild);
//   });

//   elemTable.appendChild(elemTHead);
//   elemTable.appendChild(elemTBody);
//   return elemTable;
// }

/**
 * @param {HTMLElement} parent
 * @param {string} recipeName
 * @param {string} recipeCategory
 * @param {string} recipePreparationTime
 * @param {object[]} recipeIngredients
 * @param {string[]} recipeSteps
 */
// function displayRecipeCard(
//   parent,
//   recipeName,
//   recipeCategory,
//   recipePreparationTime,
//   recipeIngredients,
//   recipeSteps
// ) {
//   const tempCard = document.createElement('template');
//   tempCard.innerHTML = `<div class="card"></div>`;

//   const tempBody = document.createElement('template');
//   tempBody.innerHTML = `<div class="card-body"></div>`;

//   const tempBasicInfo = document.createElement('template');
//   tempBasicInfo.innerHTML = `
//     <div class="d-flex flex-row mb-3">
//       <span class="card-text w-100 text-start">${recipeName}</span>
//       <span class="card-text w-100 text-center">${recipeCategory}</span>
//       <span class="card-text w-100 text-end">${recipePreparationTime}</span>
//     </div>
//   `;

//   const elemCard = tempCard.content.firstElementChild;
//   const elemBody = tempBody.content.firstElementChild;
//   const elemBasicInfos = tempBasicInfo.content.firstElementChild;
//   const elemIngredientsTable = getIngredientsTable(recipeIngredients);
//   const elemStepsList = getStepsList(recipeSteps);

//   elemBody.appendChild(elemBasicInfos);
//   elemBody.appendChild(elemIngredientsTable);
//   elemBody.appendChild(elemStepsList);

//   elemCard.appendChild(elemBody);
//   parent.appendChild(elemCard);
// }

function getRandomElements(array, n) {
  if (n > array.length) {
    throw new Error('The number of elements requested is greater than the length of the array.');
  }

  const copy = array.slice();
  const output = [];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    output.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }

  return output;
}

/**
 * @param {SubmitEvent} e
 */
function onSubmit_elemFormSearchBar(e) {
  e.preventDefault();
  const redirectPage = '/index.html';
  let searchValue = elemSearchBar.value;

  if (searchValue === '') {
    console.log('Not found');
    return;
  }

  if (window.localStorage.getItem('searchValue') !== null) {
    console.log('setting');
    window.localStorage.setItem('searchValue', searchValue);
    redirect(redirectPage);
    return;
  }

  console.log('adding');
  window.localStorage.setItem('searchValue', searchValue);
  redirect(redirectPage);
}

function redirect(path) {
  window.location.url = window.location.origin + path;
}

if (elemMainContainer) {
  getRecipes().then((data) => {
    let recipes = data.recettes;

    recipes.forEach((recipe) => {
      const elemOption = document.createElement('option');
      elemOption.value = recipe.nom;
      elemOption.innerText = recipe.nom;
      elemSearchDataList.appendChild(elemOption);
    });

    let randomSelections = getRandomElements(recipes, 6);

    randomSelections.forEach((randomSelection) => {
      const elemCol = document.createElement('div');
      elemCol.classList.add('col');

      elemCol.innerHTML = `
        <div class="card h-100 shadow" style="border-color: #ff3333">
          <img src="${randomSelection.image}" class="card-img-top" style="height: 250px; background-size: cover" alt="...">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-between">
              <h5 class="card-title fw-bold" style="color: #ff3333">${randomSelection.nom}</h5>
              <span class="card-text">${randomSelection.categorie}</span>
            </div>
            <p class="card-text">Temps: ${randomSelection.temps_preparation}</p>
            <a href="#" class="btn btn-primary border-0 custom-button custom-hover-button text-black" style="width: fit-content">Voir les détails</a>
          </div>
        </div>
      `;

      elemMainContainer.appendChild(elemCol);
    });

    elemFormSearchBar.addEventListener('submit', onSubmit_elemFormSearchBar);
  });
}
