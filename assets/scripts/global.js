// Imports
import { updateCartCount } from "./updateCartCount.js";

updateCartCount();

// Hamburger menu --------------------------------------------------->>>>
// Variables
let hamburgerMenu = document.querySelector(".header-hamburger");
let menuLeft = document.querySelector(".header-left");
let menuRight = document.querySelector(".header-right");

// Testing the touch events to fix the links bug on IOS
hamburgerMenu.addEventListener("click", showHideMenu, false);
// hamburgerMenu.addEventListener("touchmove", showHideMenu, false);
hamburgerMenu.addEventListener("click", showHideMenu, false);

// function to show/hide the hamburger menu on small screens
function showHideMenu() {
    console.log("btn clicked");
    if (hamburgerMenu.value == "opened") {
        menuLeft.style.display = "none";
        menuRight.style.display = "none";
        hamburgerMenu.value = "closed";
        hamburgerMenu.innerHTML = '<i class="fi fi-bs-menu-burger"></i>';
    } else {
        menuLeft.style.display = "unset";
        menuRight.style.display = "unset";
        hamburgerMenu.value = "opened";
        hamburgerMenu.innerHTML = '<i class="fi fi-bs-cross"></i>';
    }
}

// User signing in --------------------------------------------------->>>>
// Variables
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

// Function to check if the user is logged in or not
function checkLogedInUser() {
    if (localStorage.getItem("username")) {
    } else {
        window.location = "login.html";
    }
}

// fix the hover problem on ios
function hasTouch() {
    return (
        "ontouchstart" in document.documentElement ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}
