//import { renderSubtotal } from "./cart.js";
import { getProducts } from "./fetchProducts.js";
import { updateCartCount } from "./updateCartCount.js";

// Check if there is products in cart or if empty intiate an empty array
if (localStorage.getItem("cart")) {
  var cart = JSON.parse(localStorage.getItem("cart"));
} else {
  var cart = [];
}

// Function to check which product is being added to the cart and push to the cart array
export async function addToCart(theID) {
  let productsJSON = await getProducts(); // Products JSON

  productsJSON.products.forEach(function (item) {
    if (item.id == theID) {
      let clickedProduct = item;
      if (cart.some((item) => item.id == theID)) {
        alert("Product already in the cart.");
      } else {
        cart.push({
          ...clickedProduct,
          numberOfUnits: 1,
        });
      }
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  console.log("cart updated");
}
