// Imports
import { getProducts } from "./fetchProducts.js";
import { openProduct } from "./openProduct.js";
import { addToCart } from "./addToCart.js";

// Variables
let productsContainer = document.querySelector(".pro-container");
let loading = document.querySelector(".loading-page");

// Function to inject products into the shop page
async function printProducts() {
  let items = await getProducts();

  if (items.products) {
    loading.style.display = "none";
    items.products.forEach(function (item) {
      if (item.vendor === "rihan.") {
        productsContainer.innerHTML += `<div class="pro" >
      <div class ="img-container"   >
        <img src="${item.images[0].src}" alt="${item.title}"   class="product-img" productID="${item.id}"/>
      </div> 
      <div class="desc"  >
        <span class="desc-brand"> Backdrops</span>
        <h4  class="product-title" productID="${item.id}"  >${item.title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="desc-price">
          <h5>EGP ${item.variants[0].price}</h5>
          <a id="${item.id}" class="add-to-cart" productID="${item.id}" > + </a>
        </div>
      </div>
      </div>`;
      }
    });
  } else {
    alert("no data available.");
  }
}
printProducts();

productsContainer.addEventListener("click", openProductPage);
productsContainer.addEventListener("click", addProductToCart);

//Function to target the clicked product and opens the product page
function openProductPage(e) {
  if (
    e.target.classList.contains("product-title") ||
    e.target.classList.contains("product-img")
  ) {
    let id = e.target.getAttribute("productID");
    openProduct(id);
  }
}
//Function to target the clicked product and calls the add to cart function
function addProductToCart(e) {
  if (e.target.classList.contains("add-to-cart")) {
    let id = e.target.getAttribute("productID");
    addToCart(id);
  }
}
