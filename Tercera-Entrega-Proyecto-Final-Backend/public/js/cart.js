const makerOrder = document.getElementById("makeOrder");

makerOrder.addEventListener("click", (e) => {
  fetch("/cart/makeOrder").then((response) => {
    if (response.status === 200) {
      alertify.alert("Pedido realizado con exito!", () => {
        alertify.message("Pedido Finalizado!");
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      });
    }
  });
});
