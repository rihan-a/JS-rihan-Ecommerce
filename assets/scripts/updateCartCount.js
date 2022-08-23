export function updateCartCount() {
  let cartCount = document.querySelector(".cart-btn");
  let cartCount2 = document.querySelector(".cart-btn2");

  let theCartProducts = JSON.parse(localStorage.getItem("cart"));
  let theCartProductCount = 0;
  theCartProducts.forEach((item) => {
    theCartProductCount += item.numberOfUnits;
  });

  cartCount.innerHTML = `Cart(${theCartProductCount})`;
  cartCount2.innerHTML = `Cart(${theCartProductCount})`;
}
