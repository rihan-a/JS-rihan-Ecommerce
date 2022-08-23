//Variables
let productsContainer = document.querySelector(".pro-container");
let loading = document.querySelector(".loading-page");
let cartsidebar = document.querySelector(".cart-products-container");
let cartCount = document.querySelector(".cart-btn");
let cartCount2 = document.querySelector(".cart-btn2");
let productPage = document.querySelector(".product-page-img-container");

// cart
let cart = [];

//Getting the Products - Shopify API -
class Products {
  async getProducts() {
    //show loading spinner
    loading.style.display = "flex";
    let url = "https://rihanbackgrounds.myshopify.com/products.json";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

// Display Products
class UI {
  displayProducts(products) {
    //hide the loading spinner
    loading.style.display = "none";
    products.products.forEach(function (item) {
      if (item.vendor === "rihan.") {
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
      }
    });
  }
}

// Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then((data) => {
    ui.displayProducts(data);
    Storage.saveProducts(data);
  });
});
