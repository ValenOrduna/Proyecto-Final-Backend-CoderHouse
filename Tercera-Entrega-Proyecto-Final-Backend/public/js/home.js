const product = document.getElementById("product");
const logout = document.getElementById("logout");

product.addEventListener("click", (e) => {
  if (e.target.id === "addCart") {
    const product = { id: e.target.parentNode.id };
    fetch("/cart/addProduct", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alertify.success("Producto Añadido al Carrito!");
        const countCart = document.getElementById("countCart");
        countCart.innerHTML = data.countCart;
      });
  }
});

logout.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Se deslogueo");
});
