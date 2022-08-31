// Imports
import { changeNumberOfUnits } from "./changeNumber.js";
import { updateCartCount } from "./updateCartCount.js";

// Variables
let productContainer = document.querySelector(".single-product");
let allProducts = JSON.parse(localStorage.getItem("allProducts"));
let productID = localStorage.getItem("productID");

function printProductPage() {
  productID = localStorage.getItem("productID");
  allProducts = JSON.parse(localStorage.getItem("allProducts"));

  if (allProducts) {
    allProducts.forEach((product) => {
      if (product.id == productID) {
        productContainer.innerHTML = `
    <div class="img-container">
    <img src="${product.images[0].src}" alt="${product.title}" />
  </div>
  <div class="desc">
    <h4>${product.title}</h4>
    <div class="star">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </div>
    
  <div class="price-cart-container" >
    <div class="desc-price">
      <h5>EGP ${product.variants[0].price}</h5>
    </div>

       <div class="add-to-cart-container">
               <button class="pro-minus" type="button" > <a class="product-minus" productID="${product.id}"> - </a> </button>
           <span class="pc${product.id} pro-count"> ${product.numberOfUnits} </span>
          <button class="pro-plus"  type="button" > <a class="product-plus" productID="${product.id}" > + </a> </button>
     </div>
   </div>

  <div class="product-info">
  ${product.body_html}
  </div>
  </div>`;
      }
    });
  }
}

printProductPage();

productContainer.addEventListener("click", changeProduct);

//Function to change a product count added to cart

function changeProduct(e) {
  // plus btn pressed
  if (e.target.classList.contains("product-plus")) {
    let id = e.target.getAttribute("productID");
    changeNumberOfUnits("plus", id);
    productContainer.innerHTML = "";
    printProductPage();
    updateCartCount();

    // minus btn pressed
  } else if (e.target.classList.contains("product-minus")) {
    changeNumberOfUnits("minus", id);
    productContainer.innerHTML = "";
    printProductPage();
    updateCartCount();
  }
}
