import { getProducts } from "./fetchProducts.js";
import { updateCartCount } from "./updateCartCount.js";
// import { addedToCart } from "./shop.js";
// import { addToCartIcon } from "./shop.js";

// Variables

// Check if there is products in cart already or if it's empty intiate an empty array
if (localStorage.getItem("cart")) {
  var cart = JSON.parse(localStorage.getItem("cart"));
} else {
  var cart = [];
}

// Function to check which product is being added to the cart and push to the cart array
export async function addToCart(theID) {
  let productsJSON = await getProducts(); // Products JSON
  let modifiedProductsList = [];
  productsJSON.products.forEach(function (item) {
    modifiedProductsList.push({
      ...item,
      numberOfUnits: 0,
    });
  });

  modifiedProductsList.forEach(function (theItem) {
    if (theItem.id == theID) {
      if (cart.some((cartItem) => cartItem.id == theID)) {
        cart.some((cartItem) => {
          if (cartItem.id == theID) {
            cartItem.numberOfUnits++;
          }
        });
      } else {
        cart.push({ ...theItem, numberOfUnits: 1 });
      }
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  console.log("cart updated");
}
