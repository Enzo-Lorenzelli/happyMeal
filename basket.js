class Basket {
  constructor() {
    this.loadBasketFromLocalStorage();
  }

  loadBasketFromLocalStorage() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      this.basket = [];
    } else {
      this.basket = JSON.parse(basket);
    }
  }

  save() {
    localStorage.setItem("basket", JSON.stringify(this.basket));
  }

  add(product) {
    let foundProduct = this.basket.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity++;
    } else {
      product.quantity = 1;
      this.basket.push(product);
    }
    this.save();
  }

  removeFromBasket(product) {
    this.basket = this.basket.filter((p) => p.id != product.id);
    this.save();
  }

  changeQuantity(product, quantity) {
    let foundProduct = this.basket.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct.quantity <= 0) {
        this.removeFromBasket(foundProduct);
      } else {
        this.save();
      }
    }
  }

  getNumberProduct() {
    let number = 0;
    for (let product of this.basket) {
      number += product.quantity;
    }
    return number;
  }

  getTotalPrice() {
    let total = 0;
    for (let product of this.basket) {
      total += product.quantity * product.price;
    }
    return total;
  }

  generateShoppingListPreview() {
    const shoppingList = this.generateShoppingList();
    let previewParagraph = "<p><strong>Shopping List:</strong></p>";

    if (Object.keys(shoppingList).length === 0) {
      previewParagraph += "<p>Your shopping list is empty.</p>";
    } else {
      previewParagraph += "<ul>";
      for (const ingredient in shoppingList) {
        previewParagraph += `<li>${ingredient}: ${shoppingList[ingredient]}</li>`;
      }
      previewParagraph += "</ul>";
    }

    document.getElementById("preview").innerHTML = previewParagraph;
  }

  generateShoppingList() {
    let shoppingList = {};
    for (let product of this.basket) {
      if (product.ingredients && Array.isArray(product.ingredients)) {
        // Check if ingredients property exists and is an array
        for (let ingredient of product.ingredients) {
          if (!shoppingList[ingredient]) {
            shoppingList[ingredient] = 0;
          }
          shoppingList[ingredient] += ingredient.quantity * product.quantity;
        }
      }
    }
    return shoppingList;
  }
}

// Instantiate the Basket class
const basket = new Basket();

// Call the function to generate and display the shopping list preview
basket.generateShoppingListPreview();

//Button :
// Get the buttons by their ID
const buttonAdd = document.getElementById("buttonAdd");
const buttonRemove = document.getElementById("buttonRemove");
const buttonAddFavorite = document.getElementById("buttonAddFavorite");

// Add a click event handler for the "Add" button
buttonAdd.addEventListener("click", function () {
  // Call the add(product) function when the button is clicked
  add(product);
});

// Add a click event handler for the "Remove" button
buttonRemove.addEventListener("click", function () {
  // Call the removeFromBasket(product) function when the button is clicked
  removeFromBasket(product);
});

// Add a click event handler for the "Add to Favorites" button
buttonAddFavorite.addEventListener("click", function () {
  // Call the addFavorite(product) function when the button is clicked
  addFavorite(product);
});
// Add Bootstrap classes to the buttons
buttonAdd.classList.add("btn", "btn-primary");
buttonRemove.classList.add("btn", "btn-danger");
buttonAddFavorite.classList.add("btn", "btn-success");

//ajouter une difference entre recette et ingrediant.