// Imports
import { changeNumberOfUnits } from "./changeNumber.js";
import { updateCartCount } from "./updateCartCount.js";
import { saveProductsToLocal } from "./fetchProducts.js";

// Variables
let productsContainer = document.querySelector(".pro-container");
let loading = document.querySelector(".loading-page");

// Function to inject products into the shop page
saveProductsToLocal();
let modifiedProductsList = JSON.parse(localStorage.getItem("allProducts"));

setTimeout(() => {
    printProducts();
}, 100);

function printProducts() {
    modifiedProductsList = JSON.parse(localStorage.getItem("allProducts"));
    if (modifiedProductsList) {
        loading.style.display = "none";
        modifiedProductsList.forEach(function (item) {
            productsContainer.innerHTML += `<div class="pro" >
      <div class ="img-container"   >
        <img src="${item.images[0].src}" alt="${item.title}"   class="product-img" productID="${item.id}"/>
      </div> 
      <div class="desc"  >
        <span class="desc-brand"> Stoneware</span>
        <h4  class="product-title" productID="${item.id}"  >${item.title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>

<div class="price-cart-container" >
        <div class="desc-price">
          <h5>EGP ${item.variants[0].price}</h5>
        </div>

          <div class="add-to-cart-container">
             <button class="pro-minus" type="button" > <a class="product-minus" productID="${item.id}"> - </a> </button>
         <span class="pc${item.id} pro-count"> ${item.numberOfUnits} </span>
        <button class="pro-plus" type="button"> <a class="product-plus" productID="${item.id}" > + </a> </button>
        </div>
 </div>
      </div>
      </div>`;
        });
    }
}

productsContainer.addEventListener("click", openProductPage);

//Function to target the clicked product and opens the product page
function openProductPage(e) {
    if (
        e.target.classList.contains("product-title") ||
        e.target.classList.contains("product-img")
    ) {
        let id = e.target.getAttribute("productID");
        //openProduct(id);
        setTimeout(() => {
            window.location = "product.html";
        }, 100);
        // printProductPage(id);
        console.log(id);
        localStorage.setItem("productID", id);
    }
}

// Changing number of products added to cart in the shop page
productsContainer.addEventListener("click", changeProduct);

//Function to change a product count added to cart
function changeProduct(e) {
    // plus btn pressed
    if (e.target.classList.contains("product-plus")) {
        let id = e.target.getAttribute("productID");
        changeNumberOfUnits("plus", id);
        productsContainer.innerHTML = "";
        printProducts();
        updateCartCount();

        // minus btn pressed
    } else if (e.target.classList.contains("product-minus")) {
        let id = e.target.getAttribute("productID");
        changeNumberOfUnits("minus", id);
        productsContainer.innerHTML = "";
        printProducts();
        updateCartCount();
    }
}
