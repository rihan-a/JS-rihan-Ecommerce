// Varaibles
let cartContainer = document.querySelector(".cart-products-container");
let cartSubtotal = document.querySelector(".cart-total-amout");
let cartCount = document.querySelector(".cart-btn");
let cartCount2 = document.querySelector(".cart-btn2");
let clearCartBtn = document.querySelector(".clear-cart");

// get products in cart from local storgae
let cartProducts = JSON.parse(localStorage.getItem("cart"));

// Function to render the cart products
function renderCart() {
  // injecting products to the html
  cartProducts.forEach((item) => {
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
  });
  renderSubtotal();
}
renderCart();

//render the subtoal value and update the cart product count
export function renderSubtotal() {
  var cartProductCount = 0;
  let subTotal = 0;
  //let cartProducts = JSON.parse(localStorage.getItem("cart"));
  cartProducts.forEach((item) => {
    subTotal += item.variants[0].price * item.numberOfUnits;
    cartProductCount += item.numberOfUnits;
  });
  cartSubtotal.innerHTML = `EGP ${subTotal}`;

  localStorage.setItem("cartCounter", cartProductCount);
  cartCount.innerHTML = `Cart(${localStorage.getItem("cartCounter")})`;
  cartCount2.innerHTML = `Cart(${localStorage.getItem("cartCounter")})`;
}

cartContainer.addEventListener("click", removeProduct);

//Function to target the remove product btn and run the removeItem function
function removeProduct(e) {
  if (e.target.classList.contains("remove-product")) {
    let id = e.target.getAttribute("productID");
    removeItem(id);
  }
}

// function to remove items from cart
function removeItem(ID) {
  let updatedCartProducts = cartProducts.filter((item) => {
    return item.id != ID;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
  cartContainer.innerHTML = "";
  cartProducts = JSON.parse(localStorage.getItem("cart"));
  renderCart();
}
cartContainer.addEventListener("click", changeProduct);

//Function to target the remove product btn and run the removeItem function
function changeProduct(e) {
  if (e.target.classList.contains("product-plus")) {
    let id = e.target.getAttribute("productID");
    changeNumberOfUnits("plus", id);
  } else if (e.target.classList.contains("product-minus")) {
    let id = e.target.getAttribute("productID");
    changeNumberOfUnits("minus", id);
  }
}

//change number of units
function changeNumberOfUnits(action, id) {
  //let cartProducts = JSON.parse(localStorage.getItem("cart"));
  let updatedCartProducts = cartProducts.map((item) => {
    let updatedNumberOfUnits = item.numberOfUnits;
    if (item.id == id) {
      if (action === "minus" && updatedNumberOfUnits > 1) {
        updatedNumberOfUnits--;
      } else if (action === "plus") {
        updatedNumberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits: updatedNumberOfUnits,
    };
  });
  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
  cartProducts = JSON.parse(localStorage.getItem("cart"));
  renderSubtotal();
  cartContainer.innerHTML = "";
  renderCart();
}

// Function to clear the cart from products
function clearCart() {
  let emptyCart = [];
  cartContainer.innerHTML = "";
  cartSubtotal.innerHTML = "EGP 00,00";
  cartCount.innerHTML = `Cart(0)`;
  localStorage.setItem("cartCount", 0);
  localStorage.setItem("cart", JSON.stringify(emptyCart));
}

clearCartBtn.addEventListener("click", clearCart);
