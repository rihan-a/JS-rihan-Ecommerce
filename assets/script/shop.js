let productsContainer = document.querySelector(".pro-container");
let loading = document.querySelector(".loading-page");

// function getProducts(data) {
//   let url = "https://rihanbackgrounds.myshopify.com/products.json";
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => printProducts(data))
//     .then((tdata) => cartProducts(tdata))
//     .catch((err) => console.log(err));
// }

// Async Function to fetch the products json from shopify
async function getProducts() {
  loading.style.display = "flex";
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
getProducts();

// Function to inject the fetched products into html
async function printProducts() {
  let items = await getProducts();

  loading.style.display = "none";

  if (items.products) {
    items.products.forEach(function (item) {
      productsContainer.innerHTML += `<div class="pro">
      <div class="img-container">
        <img src="${item.images[0].src}" alt="${item.title}"/>
      </div> 
      <div class="desc">
        <span class="desc-brand"> Backdrops</span>
        <h4>${item.title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="desc-price">
          <h5>EGP ${item.variants[0].price}</h5>
          <a id="${item.id}" class="add-to-cart" onclick="addToCart(${item.id})" > + </a>
        </div>
      </div>
      </div>`;
    });
  } else {
    alert("no data available.");
  }
}
printProducts();

// Intiate cart array
let cart = [];

// Function to check which product is being added to the cart and push to the cart array
async function addToCart(theID) {
  let productsJSON = await getProducts();

  productsJSON.products.forEach(function (item) {
    if (item.id === theID) {
      let clickedProduct = item;
      if (cart.some((item) => item.id === theID)) {
        alert("Product is already in cart");
      } else {
        cart.push({
          ...clickedProduct,
          numberOfUnits: 1,
        });
        console.log(cart);
      }
    }
  });
  updateCart();
}

// Function to update cart
function updateCart() {
  renderCartItems();
  //renderSubtoal();
}

let cartsidebar = document.querySelector(".cart-products");

function renderCartItems() {
  cartsidebar.innerHTML = ""; // clear cart
  cart.forEach((item) => {
    cartsidebar.innerHTML += `<div class="cart-pro">
        <div class="img-container">
          <img src="${item.images[0].src}" alt="${item.title}" />
        </div>
        <div class="cart-desc">
          <span class="remove-pro">X</span>
          <div class="pro-name">
            <span class="pro-brand"> Stoneware</span>
            <h4>${item.title}</h4>
            <span class="pro-minus">-</span>
            <span class="pro-count">${item.numberOfUnits}</span>
            <span class="pro-plus">+</span>
              </div>
              <div class="pro-price">
            <h5>EGP ${item.variants[0].price}</h5>
          </div>
        </div>
    </div>`;
  });
}

// Function to check if the user is logged in or not
function checkLogedInUser() {
  if (localStorage.getItem("username")) {
  } else {
    window.location = "login.html";
  }
}

// <!-- product in cart -->
