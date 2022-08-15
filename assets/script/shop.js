let productsContainer = document.querySelector(".pro-container");
let loading = document.querySelector(".loading-page");
let cartsidebar = document.querySelector(".cart-products-container");
let cartCount = document.querySelector(".cart-btn");
let cartCount2 = document.querySelector(".cart-btn2");

let productPage = document.querySelector(".product-page-img-container");

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
  // loading.style.display = "flex";
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getProducts();

// Function to inject products into the shop page

async function printProducts() {
  let items = await getProducts();
  if (items.products) {
    loading.style.display = "none";
    items.products.forEach(function (item) {
      productsContainer.innerHTML += `<div class="pro"  >
      <div class="img-container" onclick="openProduct(${item.id})">
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

// A function to open a product page and saves that product to local storage
async function openProduct(theID) {
  let productsJSON = await getProducts(); // Products JSON

  productsJSON.products.forEach(function (item) {
    if (item.id === theID) {
      let clickedProduct = item;
      localStorage.setItem("productPage", JSON.stringify(clickedProduct));
    }
    setTimeout(() => {
      window.location = "product.html";
    }, 200);
  });
  printProductPage();
}

// Intiate an empty cart array
let cart = [];

// Function to check which product is being added to the cart and push to the cart array
window.addToCart = async function addToCart(theID) {
  console.log("hi rihan");

  let productsJSON = await getProducts(); // Products JSON

  productsJSON.products.forEach(function (item) {
    if (item.id === theID) {
      let clickedProduct = item;
      if (cart.some((item) => item.id === theID)) {
        alert("Product already in the cart.");
      } else {
        cart.push({
          ...clickedProduct,
          numberOfUnits: 1,
        });
      }
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));

  renderSubtotal();
};

// window.fn1 = function fn1() {
//   alert("external fn clicked");
// };

function renderSubtotal() {
  let cartProductCount = 0;
  let cartProducts = JSON.parse(localStorage.getItem("cart"));

  cartProducts.forEach((item) => {
    cartProductCount += item.numberOfUnits;
  });
  cartCount.innerHTML = `Cart(${cartProductCount})`;
  cartCount2.innerHTML = `Cart(${cartProductCount})`;
}
renderSubtotal();

// Function to check if the user is logged in or not
function checkLogedInUser() {
  if (localStorage.getItem("username")) {
  } else {
    window.location = "login.html";
  }
}
