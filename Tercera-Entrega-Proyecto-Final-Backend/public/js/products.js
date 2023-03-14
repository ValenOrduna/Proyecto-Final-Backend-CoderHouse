const formProducts = document.getElementById("formProducts");
const alert = document.getElementById("alert");

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formProducts);
  if (
    formData.get("title").length >= 5 &&
    formData.get("description").length >= 10 &&
    validator.isInt(formData.get("price"), { min: 1 }) &&
    validator.isInt(formData.get("stock"), { min: 1 }) &&
    formData.get("image").length >= 10
  ) {
    fetch("/api/productos", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        alertify.success("Producto añadido con exito!");
      } else {
        createAlert(
          "No se ha podido ingresar el producto, vuelve a intentarlo nuevamente!"
        );
      }
    });
  } else {
    createAlert(
      "Has ingresado mal el producto, vuelve a intentarlo nuevamente!"
    );
  }
});

const createAlert = (text) => {
  const divError = document.createElement("div");
  divError.classList =
    "bg-red-400 w-full mx-auto p-4 font-bold text-xl text-center";
  divError.innerHTML = text;
  alert.appendChild(divError);

  setTimeout(() => {
    divError.remove();
  }, 5000);
  return;
};
