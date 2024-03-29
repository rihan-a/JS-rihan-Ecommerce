// Async Function to fetch the products json from shopify

async function getProducts() {
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
getProducts();

export async function saveProductsToLocal() {
  if (JSON.parse(localStorage.getItem("allProducts"))) {
  } else {
    let allProducts = await getProducts();
    let modifiedProductsList = [];
    allProducts.products.forEach(function (item) {
      if (item.vendor === "rihan.") {
        modifiedProductsList.push({
          ...item,
          numberOfUnits: 0,
        });
      }
    });
    localStorage.setItem("allProducts", JSON.stringify(modifiedProductsList));
  }
}
saveProductsToLocal();
