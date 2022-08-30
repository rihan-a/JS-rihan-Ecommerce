// Imports
import { changeNumberOfUnits } from "./changeNumber.js";
import { updateCartCount } from "./updateCartCount.js";

// Variables
let cartContainer = document.querySelector(".cart-products-container");
let cartSubtotal = document.querySelector(".cart-total-amout");
let cartCount = document.querySelector(".cart-btn");
let cartCount2 = document.querySelector(".cart-btn2");
let clearCartBtn = document.querySelector(".clear-cart");

// parse products from LocalStorage
let allProducts = JSON.parse(localStorage.getItem("allProducts"));

function addToCart() {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  allProducts.forEach((item) => {
    if (item.numberOfUnits > 0) {
      cartContainer.innerHTML += `
  <div class="cart-product" >
     <div class="img-container">
        <img src="${item.images[0].src}" alt="${item.title}" />
      </div>
     <div class="cart-desc">
        <span class="remove-pro"><a class="remove-product" productID="${
          item.id
        }" >X</a></span>

        <div class="pro-name">
         <span class="pro-brand"> Stoneware</span>
         <h4>${item.title}</h4>
         <span class="pro-minus" > <a class="product-minus" productID="${
           item.id
         }"> - </a> </span>
         <span class="pro-count"> ${item.numberOfUnits} </span>
        <span class="pro-plus"> <a class="product-plus" productID="${
          item.id
        }" >  + </a> </span>
      </div>

      <div class="pro-price">
        <h5>EGP ${item.variants[0].price * item.numberOfUnits} </h5>
      </div>
  </div>
</div>
`;
    }
  });
  renderSubtotal();
}

addToCart();

// Function to clear the cart from products
function clearCart() {
  let modifiedProductsList = [];
  allProducts.forEach(function (item) {
    modifiedProductsList.push({
      ...item,
      numberOfUnits: 0,
    });
  });
  localStorage.setItem("allProducts", JSON.stringify(modifiedProductsList));

  allProducts = JSON.parse(localStorage.getItem("allProducts"));

  cartContainer.innerHTML = "";
  cartSubtotal.innerHTML = "EGP 0";
  cartCount.innerHTML = `Cart(0)`;
  cartCount2.innerHTML = `Cart(0)`;
  renderSubtotal();
  updateCartCount();
}

clearCartBtn.addEventListener("click", clearCart);

//Function to render the subtoal value
export function renderSubtotal() {
  let subTotal = 0;
  //let cartProducts = JSON.parse(localStorage.getItem("cart"));
  allProducts.forEach((item) => {
    subTotal += item.variants[0].price * item.numberOfUnits;
  });
  cartSubtotal.innerHTML = `EGP ${subTotal}`;
}

//Function to target the remove product btn and run the removeItem function
cartContainer.addEventListener("click", changeProduct);
function changeProduct(e) {
  if (e.target.classList.contains("product-plus")) {
    let id = e.target.getAttribute("productID");
    changeNumberOfUnits("plus", id);
    cartContainer.innerHTML = "";
    addToCart();
    updateCartCount();
  } else if (e.target.classList.contains("product-minus")) {
    let id = e.target.getAttribute("productID");
    changeNumberOfUnits("minus", id);
    cartContainer.innerHTML = "";
    addToCart();
    updateCartCount();
  }
}

//Function to target the remove product btn and run the removeItem function
function removeProduct(e) {
  if (e.target.classList.contains("remove-product")) {
    let id = e.target.getAttribute("productID");
    removeItem(id);
  }
}
cartContainer.addEventListener("click", removeProduct);

// function to remove items from cart
function removeItem(ID) {
  let updatedCartProducts = allProducts.map((item) => {
    let updatedNumberOfUnits = item.numberOfUnits;
    if (item.id == ID) {
      updatedNumberOfUnits = 0;
    }
    return {
      ...item,
      numberOfUnits: updatedNumberOfUnits,
    };
  });

  localStorage.setItem("allProducts", JSON.stringify(updatedCartProducts));
  cartContainer.innerHTML = "";
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  addToCart();
  updateCartCount();
}
