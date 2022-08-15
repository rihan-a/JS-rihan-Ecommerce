// Hamburger menu start ----------------
let hamburgerMenu = document.querySelector(".header-hamburger");
let menuLeft = document.querySelector(".header-left");
let menuRight = document.querySelector(".header-right");

hamburgerMenu.addEventListener("click", showHideMenu);

// function to show/hide the hamburger menu on small screens
function showHideMenu() {
  if (hamburgerMenu.value == "opened") {
    menuLeft.style.display = "none";
    menuRight.style.display = "none";
    hamburgerMenu.value = "closed";
    hamburgerMenu.innerHTML = `<i class="fi fi-bs-menu-burger"></i>`;
  } else {
    menuLeft.style.display = "unset";
    menuRight.style.display = "unset";
    hamburgerMenu.value = "opened";
    hamburgerMenu.innerHTML = `<i class="fi fi-bs-cross"></i>`;
  }
}

// Hamburger menu end -------------

function closeSidebar() {
  if (sideBar.value == "opened") {
    sideBar.style.display = "none";
    sideBar.value = "closed";
  }
}

//User signing in

let notSignedUser = document.querySelector("#not-signed-in");
let signedUser = document.querySelector("#signed-in-user");

if (localStorage.getItem("email")) {
  signedUser.style.display = "flex";
  notSignedUser.style.display = "none";
} else {
  signedUser.style.display = "none";
  notSignedUser.style.display = "flex";
}

signedUser.addEventListener("click", logOut);

function logOut() {
  localStorage.clear();

  setTimeout(() => {
    window.location = "index.html";
  }, 1000);
}

let featuredProductsContainer = document.querySelector(
  ".featured-pro-container"
);

// Async Function to fetch the products json from shopify
async function getProducts() {
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getProducts();

// Function to inject featured products into the homepage
async function printFeaturedProducts() {
  let allProducts = await getProducts();

  if (allProducts.products) {
    for (let i = 0; i < 4; i++) {
      featuredProductsContainer.innerHTML += `<div class="pro"  >
      <div class="img-container" onclick="openProduct(${allProducts.products[i].id})">
        <img src="${allProducts.products[i].images[0].src}" alt="${allProducts.products[i].title}"/>
      </div> 
      <div class="desc">
        <span class="desc-brand">Homewares</span>
        <h4>${allProducts.products[i].title}</h4>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="desc-price">
          <h5>EGP ${allProducts.products[i].variants[0].price}</h5>
          <a id="${allProducts.products[i].id}" class="add-to-cart" onclick="addToCart(${allProducts.products[i].id})" > + </a>
        </div>
      </div>
      </div>`;
    }
  } else {
    alert("no data available.");
  }
}
printFeaturedProducts();
