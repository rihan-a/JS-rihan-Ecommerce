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

// get products from shopify shop

function getRecipes(data) {
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => printRecipesHtml(data))
    .catch((err) => console.log("err"));
}

function printRecipesHtml(recipes) {
  console.log(recipes);

  // if (recipes.meals) {
  //     recipes.meals.forEach(function(item) {
  //         resultsAreaHtml.innerHTML += `<div class="result-item" >
  //                   <img class="result-img" src="${item.strMealThumb}" data-id="${item.idMeal}" alt="" />
  //                   <h2>${item.strMeal}</h2>

  //         </div>`;
  //     });
  // } else {
  //     alert("no data available.");
  // }
}

getRecipes();
