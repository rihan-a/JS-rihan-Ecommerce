import { getProducts } from "./fetchProducts.js";
//import { printProductPage } from "./product.js";

// A function to open a product page and saves that product to local storage
export async function openProduct(theID) {
  let productsJSON = await getProducts();
  productsJSON.products.forEach(function (item) {
    if (item.id == theID) {
      localStorage.setItem("productPage", JSON.stringify(item));
    }
    setTimeout(() => {
      window.location = "product.html";
    }, 200);
  });
  printProductPage();
}
