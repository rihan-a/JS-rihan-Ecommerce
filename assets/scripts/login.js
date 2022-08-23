// User Login ------------->>
// Variables
let userEmail = document.querySelector("#email");
let userPassword = document.querySelector("#password");
let loginBtn = document.querySelector("#login-btn");
let notSignedUser = document.querySelector("#not-signed-in");
let signedUser = document.querySelector("#signed-in-user");
let getUserEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

updateCartCount();
loginBtn.addEventListener("click", loginUser);

function loginUser(e) {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    alert("Please enter your data correctly.");
  } else {
    if (
      getUserEmail === userEmail.value &&
      getPassword === userPassword.value
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1000);

      signedUser.style.display = "flex";

      notSignedUser.style.display = "none";
    } else {
      notSignedUser.style.display = "flex";
      signedUser.style.display = "none";

      alert("Incorrect email or password");
    }
  }
}
