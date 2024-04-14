document.addEventListener("DOMContentLoaded", () =>  {
  const tableau = document.getElementById("favoriteRecipes");
  let recipes =
    JSON.parse(localStorage.getItem("favoriteRecipes")) || [];    

        function favoriteEntry(){
        let nouvelleLigne = document.createElement('tr');
    
        // index pour avoir uniquement les entrées
        const entrees = recipes.filter(
        (recettes) => recettes.categorie === "Entrée"
        );
        const indexEntrees = entrees.map((recettes) => recettes.nom);
        console.log(indexEntrees); 

        // nombre de cellule a remplir
        const nbrCellule = 7;

        // création des cellules avec des recettes aléatoires
        for (let i = 0; i < nbrCellule; i++) {
            let cellule1 = document.createElement('td');
            // pour mettre les noms des recettes dans le select
            const selectEntree = document.createElement('select');
            selectEntree.innerHTML = `<select><option value="accept"> entrée </option>`;
            indexEntrees.forEach((nom) => {
                selectEntree.innerHTML += `<option value="${nom}">${nom}</option>`;
                selectEntree.classList.add("container");
            }) 
            cellule1.appendChild(selectEntree);
            nouvelleLigne.appendChild(cellule1);
        }
        tableau.appendChild(nouvelleLigne);
        
              
}

        function favoritePlat(){
        let nouvelleLigne = document.createElement('tr');
    
        // index pour avoir uniquement les entrées
        const entrees = recipes.filter(
        (recettes) => recettes.categorie === "Plat principal"
        );
        const indexEntrees = entrees.map((recettes) => recettes.nom);
        console.log(indexEntrees); 

        // nombre de cellule a remplir
        const nbrCellule = 7;

        // création des cellules avec des recettes aléatoires
        for (let i = 0; i < nbrCellule; i++) {
            let cellule2 = document.createElement('td');
            // pour mettre les noms des recettes dans le select
            const selectEntree = document.createElement('select');
            selectEntree.innerHTML = `<select><option value="accept"> plats </option>`;
            indexEntrees.forEach((nom) => {
                selectEntree.innerHTML += `<option value="${nom}">${nom}</option>`;
                selectEntree.classList.add("container");
            }) 
            cellule2.appendChild(selectEntree);
            nouvelleLigne.appendChild(cellule2);
        }
        tableau.appendChild(nouvelleLigne);      
}

        function favoriteDessert(){
        let nouvelleLigne = document.createElement('tr');
    
        // index pour avoir uniquement les entrées
        const entrees = recipes.filter(
        (recettes) => recettes.categorie === "Dessert"
        );
        const indexEntrees = entrees.map((recettes) => recettes.nom);
        console.log(indexEntrees); 

        // nombre de cellule a remplir
        const nbrCellule = 7;

        // création des cellules avec des recettes aléatoires
        for (let i = 0; i < nbrCellule; i++) {
            let cellule3 = document.createElement('td');
            // pour mettre les noms des recettes dans le select
            const selectEntree = document.createElement('select');
            selectEntree.innerHTML = `<select><option value="accept"> desserts </option>`;
            indexEntrees.forEach((nom) => {
                selectEntree.innerHTML += `<option value="${nom}">${nom}</option>`;
                selectEntree.classList.add("container")
            }) 
            cellule3.appendChild(selectEntree);
            nouvelleLigne.appendChild(cellule3);
        }
        tableau.appendChild(nouvelleLigne);      
}


favoriteEntry();
favoritePlat();
favoriteDessert();



}); // ceci termine ma fonction de fetch