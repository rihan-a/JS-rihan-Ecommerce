// A function to open a product page and saves that product to local storage
export function openProduct(theID) {
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));

  allProducts.forEach(function (item) {
    if (item.id == theID) {
      localStorage.setItem("productPage", JSON.stringify(item));
    }
    setTimeout(() => {
      window.location = "product.html";
    }, 200);
  });
  printProductPage();
}
