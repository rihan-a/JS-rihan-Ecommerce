// get products in cart from local storgae

//change number of units
export function changeNumberOfUnits(action, id) {
  let allProducts = JSON.parse(localStorage.getItem("allProducts"));

  let updatedAllProducts = allProducts.map((item) => {
    let updatedNumberOfUnits = item.numberOfUnits;
    if (item.id == id) {
      if (action === "minus" && updatedNumberOfUnits > 0) {
        updatedNumberOfUnits--;
      } else if (action === "plus") {
        updatedNumberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits: updatedNumberOfUnits,
    };
  });
  localStorage.setItem("allProducts", JSON.stringify(updatedAllProducts));
  allProducts = JSON.parse(localStorage.getItem("cart"));
}
