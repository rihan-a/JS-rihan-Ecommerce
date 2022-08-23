// Imports
import { getProducts } from "./fetchProducts.js";
import { openProduct } from "./openProduct.js";
import { addToCart } from "./addToCart.js";

// Variables
let featuredProductsContainer = document.querySelector(
  ".featured-pro-container"
);

// Function to inject featured products into the homepage
async function printFeaturedProducts() {
  let allProducts = await getProducts();
  if (allProducts.products) {
    for (let i = 2; i < 6; i++) {
      featuredProductsContainer.innerHTML += `<div class="pro"  >
      <div class="img-container" onclick="openProductPage(${allProducts.products[i].id})">
        <img src="${allProducts.products[i].images[0].src}" alt="${allProducts.products[i].title}"   class="product-img" productID="${allProducts.products[i].id}"/>
      </div> 
      <div class="desc">
        <span class="desc-brand">Homewares</span>
        <h4 class="product-title" productID="${allProducts.products[i].id}">${allProducts.products[i].title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="desc-price">
          <h5>EGP ${allProducts.products[i].variants[0].price}</h5>
          <a id="${allProducts.products[i].id}" class="add-to-cart" productID="${allProducts.products[i].id}" > + </a>
        </div>
      </div>
      </div>`;
    }
  } else {
    alert("No data available.");
  }
}

printFeaturedProducts();

featuredProductsContainer.addEventListener("click", openProductPage);
featuredProductsContainer.addEventListener("click", addProductToCart);

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
