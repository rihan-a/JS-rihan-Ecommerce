// Imports

import { openProduct } from "./openProduct.js";
import { changeNumberOfUnits } from "./changeNumber.js";
import { updateCartCount } from "./updateCartCount.js";
import { saveProductsToLocal } from "./fetchProducts.js";

// Variables
let featuredProductsContainer = document.querySelector(
  ".featured-pro-container"
);
saveProductsToLocal();
setTimeout(() => {
  printFeaturedProducts();
}, 1000);

let allProducts = JSON.parse(localStorage.getItem("allProducts"));
// Function to inject featured products into the homepage
function printFeaturedProducts() {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  if (allProducts) {
    for (let i = 0; i < 4; i++) {
      featuredProductsContainer.innerHTML += `<div class="pro" >
      <div class ="img-container"   >
        <img src="${allProducts[i].images[0].src}" alt="${allProducts[i].title}"   class="product-img" productID="${allProducts[i].id}"/>
      </div> 
      <div class="desc"  >
        <span class="desc-brand"> Stoneware</span>
        <h4  class="product-title" productID="${allProducts[i].id}"  >${allProducts[i].title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="desc-price">
          <h5>EGP ${allProducts[i].variants[0].price}</h5>
        </div>
          <div class="add-to-cart-container">
             <span class="pro-minus" > <a class="product-minus" productID="${allProducts[i].id}"> - </a> </span>
         <span class="pc${allProducts[i].id} pro-count"> ${allProducts[i].numberOfUnits} </span>
        <span class="pro-plus"> <a class="product-plus" productID="${allProducts[i].id}" > + </a> </span>
        </div>
      </div>
      </div>`;
    }
  }
  // else {
  //   alert("No data available.");
  // }
}

featuredProductsContainer.addEventListener("click", openProductPage);

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

featuredProductsContainer.addEventListener("click", changeProduct);

//Function to change a product count added to cart
function changeProduct(e) {
  // plus btn pressed
  if (e.target.classList.contains("product-plus")) {
    let id = e.target.getAttribute("productID");
    //addToCart(id);
    changeNumberOfUnits("plus", id);
    featuredProductsContainer.innerHTML = "";
    printFeaturedProducts();
    updateCartCount();

    // minus btn pressed
  } else if (e.target.classList.contains("product-minus")) {
    let id = e.target.getAttribute("productID");
    //removeFromCart(id);
    changeNumberOfUnits("minus", id);
    featuredProductsContainer.innerHTML = "";
    printFeaturedProducts();
    updateCartCount();
  }
}
