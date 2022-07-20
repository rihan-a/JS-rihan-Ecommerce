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
