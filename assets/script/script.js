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

// Cart Sidebar -------------------
let sideBar = document.querySelector(".cart-sidebar");
let cartBtn = document.querySelector(".cart-btn");

cartBtn.addEventListener("click", showHideSidebar);

// function to show/hide the cart sidebar
function showHideSidebar() {
  if (sideBar.value == "opened") {
    sideBar.style.display = "none";
    sideBar.value = "closed";
    cartBtn.classList.remove("active");
  } else {
    sideBar.style.display = "unset";
    sideBar.value = "opened";
    cartBtn.classList.add("active");
  }
}

hamburgerMenu.addEventListener("click", closeSidebar);

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

// -----  Cart product count ( - / + )  --------
let cartMinusBtn = document.querySelector(".pro-minus");
let cartPlusBtn = document.querySelector(".pro-plus");
let productCountDom = document.querySelector(".pro-count");
let productCount = 1;

cartMinusBtn.addEventListener("click", decrementProduct);
cartPlusBtn.addEventListener("click", incrementProduct);

function decrementProduct() {
  if (productCount > 1) {
    productCount--;
  }
  productCountDom.innerHTML = `${productCount}`;
}

function incrementProduct() {
  if (productCount < 10) {
    productCount++;
  }
  productCountDom.innerHTML = `${productCount}`;
}
