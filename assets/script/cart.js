let cartContainer = document.querySelector(".cart-products-container");
let cartSubtotal = document.querySelector(".cart-total-amout");
let cartCount = document.querySelector(".cart-btn");

function renderCart() {
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  cartProducts.forEach((item) => {
    cartContainer.innerHTML += `
  <div class="cart-product" >
     <div class="img-container">
        <img src="${item.images[0].src}" alt="${item.title}" />
      </div>
     <div class="cart-desc">
        <span class="remove-pro"><a onclick="removeItem(${
          item.id
        })" >X</a></span>

        <div class="pro-name">
         <span class="pro-brand"> Stoneware</span>
         <h4>${item.title}</h4>
         <span class="pro-minus" > <a onclick="changeNumberOfUnits('minus', ${
           item.id
         } )"> - </a> </span>
         <span class="pro-count"> ${item.numberOfUnits} </span>
        <span class="pro-plus"> <a onclick="changeNumberOfUnits('plus', ${
          item.id
        } )" >  + </a> </span>
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

//change number of units

function changeNumberOfUnits(action, id) {
  cartProducts = cartProducts.map((item) => {
    let updatedNumberOfUnits = item.numberOfUnits;

    if (item.id === id) {
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
  renderSubtotal();
  cartContainer.innerHTML = "";
  renderCart();
  localStorage.setItem("cart", JSON.stringify(cartProducts));
}

//render the subtoal value and update the cart product count

function renderSubtotal() {
  let cartProductCount = 0;
  let subTotal = 0;

  cartProducts.forEach((item) => {
    subTotal += item.variants[0].price * item.numberOfUnits;
    cartProductCount += item.numberOfUnits;
  });
  cartSubtotal.innerHTML = `EGP ${subTotal}`;
  localStorage.setItem("cartCount", cartProductCount);
  cartCount.innerHTML = `Cart(${cartProductCount})`;
}

// function to remove items from cart

function removeItem(id) {
  console.log("rihan");
  updatedCartProducts = cartProducts.filter((item) => item.id !== id);
  console.log(updatedCartProducts);

  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));
  cartContainer.innerHTML = "";
  renderCart();
}
