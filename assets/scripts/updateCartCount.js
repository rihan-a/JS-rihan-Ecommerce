export function updateCartCount() {
  let cartCount = document.querySelector(".cart-btn");
  let cartCount2 = document.querySelector(".cart-btn2");

  let allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let theCartProductCount = 0;
  allProducts.forEach((item) => {
    theCartProductCount += item.numberOfUnits;
  });

  cartCount.innerHTML = `Cart(${theCartProductCount})`;
  cartCount2.innerHTML = `Cart(${theCartProductCount})`;
}
