// traitement des données JSON pour avoir un tableau de menu sur une semaine
fetch('../data.json')
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recettes;
    const tableau = document.getElementById('bodyBoard');

    function displayRecipes() {
      tableau.innerHTML = '';
      const recipesToShow = recettes.slice();
    }

    function entree() {
      let nouvelleLigne = document.createElement('tr');
      const cellule = document.createElement('td');
      cellule.textContent = 'Entrée';
      cellule.classList.add('bg-dark', 'text-white', 'pt-5', 'pb-5');
      nouvelleLigne.appendChild(cellule);

      // index pour avoir uniquement les entrées
      const entrees = recipes.filter((recettes) => recettes.categorie === 'Entrée');
      const indexEntrees = entrees.map((recettes) => recettes.nom);
      console.log(indexEntrees);

      // Nombre de cellules à remplir avec des recettes aléatoires
      const nombreDeCellules = 7;

      // Création des cellules avec des recettes aléatoires
      for (let i = 0; i < nombreDeCellules; i++) {
        // Génération d'un index aléatoire pour une recette
        const randomIndex = Math.floor(Math.random() * entrees.length);
        const randomRecipe = entrees[randomIndex];

        // Création d'une nouvelle cellule
        const cellule = document.createElement('td');
        cellule.textContent = randomRecipe.nom;
        nouvelleLigne.appendChild(cellule);
      }
      // ajout de nouvelles cellules
      tableau.appendChild(nouvelleLigne);
      nouvelleLigne.classList.add('text-center', 'align-middle');
    }

    function plat() {
      let nouvelleLigne = document.createElement('tr');
      const cellule = document.createElement('td');
      cellule.textContent = 'Plat principal';
      cellule.classList.add('bg-dark', 'text-white', 'pt-5', 'pb-5');
      nouvelleLigne.appendChild(cellule);

      // index pour avoir uniquement les entrées
      const plat = recipes.filter((recettes) => recettes.categorie === 'Plat principal');
      const indexPlat = plat.map((recettes) => recettes.nom);
      console.log(indexPlat);

      // Nombre de cellules à remplir avec des recettes aléatoires
      const nombreDeCellules = 7;

      // Création des cellules avec des recettes aléatoires
      for (let i = 0; i < nombreDeCellules; i++) {
        // Génération d'un index aléatoire pour une recette
        const randomIndex = Math.floor(Math.random() * plat.length);
        const randomRecipe = plat[randomIndex];

        // Création d'une nouvelle cellule
        const cellule = document.createElement('td');
        cellule.textContent = randomRecipe.nom;
        nouvelleLigne.appendChild(cellule);
      }
      // ajout de nouvelles cellules
      tableau.appendChild(nouvelleLigne);
      nouvelleLigne.classList.add('text-center', 'align-middle');
    }

    function dessert() {
      let nouvelleLigne = document.createElement('tr');
      const cellule = document.createElement('td');
      cellule.textContent = 'Desserts';
      cellule.classList.add('bg-dark', 'text-white', 'pt-5', 'pb-5');
      nouvelleLigne.appendChild(cellule);

      // index pour avoir uniquement les entrées
      const dessert = recipes.filter((recettes) => recettes.categorie === 'Dessert');
      const indexDessert = dessert.map((recettes) => recettes.nom);
      console.log(indexDessert);

      // Nombre de cellules à remplir avec des recettes aléatoires
      const nombreDeCellules = 7;

      // Création des cellules avec des recettes aléatoires
      for (let i = 0; i < nombreDeCellules; i++) {
        // Génération d'un index aléatoire pour une recette
        const randomIndex = Math.floor(Math.random() * dessert.length);
        const randomRecipe = dessert[randomIndex];

        // Création d'une nouvelle cellule
        const cellule = document.createElement('td');
        cellule.textContent = randomRecipe.nom;
        nouvelleLigne.appendChild(cellule);
      }
      // ajout de nouvelles cellules
      tableau.appendChild(nouvelleLigne);
      nouvelleLigne.classList.add('text-center', 'align-middle');
    }

    entree();
    plat();
    dessert();
  });

// fonction pour rafraichir la page et permettre d'avoir un nouveau tableau
document.addEventListener('DOMContentLoaded', function () {
  let resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function () {
    location.reload();
  });
});

let button = document.getElementById('export');
button.onclick = () => {
  localStorage.setItem('Menu de la semaine', bodyBoard.value);
  // on met entre parenthèse la clé (ici = nom) et la valeur qui doit être récupérer (ici = nom.value car on récupére ce qui est entrée dans l'input qui porte l'id nom)
  // le .value permet de récupérer les valeurs
};
