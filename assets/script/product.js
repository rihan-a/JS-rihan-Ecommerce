productContainer = document.querySelector(".single-product");
let cartCount = document.querySelector(".cart-btn");
let cartCount2 = document.querySelector(".cart-btn2");

function printProductPage() {
  let productObj = JSON.parse(localStorage.getItem("productPage"));
  productContainer.innerHTML = `
  <div class="img-container">
  <img src="${productObj.images[0].src}" alt="${productObj.title}" />
</div>
<div class="desc">
  <h4>${productObj.title}</h4>
  <div class="star">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
  </div>
  <div class="desc-price">
    <h5>EGP ${productObj.variants[0].price}</h5>
    <a id="${productObj.id}" class="add-to-cart" onclick="addToCart"> Add to Cart <span> + </span> </a>
  </div>

<div class="product-info">
${productObj.body_html}
</div>

</div>`;

  updateCartCount();
}

printProductPage();

// function addToCart() {
//   localStorage.setItem("cart", productObj);
// }

function updateCartCount() {
  let cartProductCount = localStorage.getItem("cartCount");
  if (localStorage.getItem("cartCount")) {
    cartCount.innerHTML = `Cart(${cartProductCount})`;
    cartCount2.innerHTML = `Cart(${cartProductCount})`;
  } else {
    cartCount.innerHTML = `Cart(0)`;
  }
}
