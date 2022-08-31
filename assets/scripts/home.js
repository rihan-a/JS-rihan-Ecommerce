// Imports

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
<div class="price-cart-container" >
        <div class="desc-price">
          <h5>EGP ${allProducts[i].variants[0].price}</h5>
        </div>
          <div class="add-to-cart-container">
             <button class="pro-minus" type="button" > <a class="product-minus" productID="${allProducts[i].id}"> - </a> </button>
         <span class="pc${allProducts[i].id} pro-count"> ${allProducts[i].numberOfUnits} </span>
        <button class="pro-plus" type="button"> <a class="product-plus" productID="${allProducts[i].id}" > + </a> </button>
        </div>
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
    setTimeout(() => {
      window.location = "product.html";
    }, 100);
    console.log(id);
    localStorage.setItem("productID", id);
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

// Touch event for + / - styling
// featuredProductsContainer.addEventListener("touchstart", (e) => {
//   if (
//     e.target.classList.contains("product-plus") ||
//     e.target.classList.contains("product-minus")
//   ) {
//     e.target.style.backgroundColor = "black";
//     e.target.style.color = "white";
//   }
//   console.log("touch press");
// });
