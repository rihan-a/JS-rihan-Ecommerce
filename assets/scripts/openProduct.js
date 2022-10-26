import { printProductPage } from "./product.js";

// A function to open a product page and saves that product to local storage
function openProduct(id) {
  setTimeout(() => {
    window.location = "product.html";
  }, 100);
  printProductPage(id);
  console.log(id);
  localStorage.setItem("productID", id);
}
