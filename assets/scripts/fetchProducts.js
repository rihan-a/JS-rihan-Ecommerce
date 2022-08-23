// Async Function to fetch the products json from shopify
export async function getProducts() {
  let url = "https://rihanbackgrounds.myshopify.com/products.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getProducts();
