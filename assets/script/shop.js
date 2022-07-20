// get products from shopify shop

let productsContainer = document.querySelector(".pro-container");

function getProducts(data) {
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => printProducts(data))
    .catch((err) => console.log("error"));
}

function printProducts(items) {
  console.log("items");
  if (items.products) {
    items.products.forEach(function (item) {
      productsContainer.innerHTML += `<div class="pro">
      <div class="img-container">
        <img src="${item.images[0].src}" alt="" />
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
          <h5>€ 20,00</h5>
          <a id="add-to-cart" onclick="addedToCart(${item.id})" > + </a>
        </div>
      </div>
      </div>`;
    });
  } else {
    alert("no data available.");
  }
}

getProducts();

function addedToCart(id) {
  //   let clickedProduct = items.filter((item) => item.id === id);
  console.log(id);
}

function checkLogedInUser() {
  if (localStorage.getItem("username")) {
    console.log("added to card");
  } else {
    window.location = "login.html";
  }
}
