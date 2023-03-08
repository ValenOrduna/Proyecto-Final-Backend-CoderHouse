const formRegister = document.getElementById("formRegister");
const phone = document.getElementById("phone");
const alert = document.getElementById("alert");

const phoneInput = window.intlTelInput(phone, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formRegister);
  form.forEach((value, key) => {
    if (key === "image") {
      form.append("nameImageAvatar", value.name);
    }
  });
  form.append("phone", phoneInput.getNumber());
  fetch("/register", {
    method: "POST",
    body: form,
  }).then((response) => {
    if (response.status === 404) {
      const divError = document.createElement("div");
      divError.classList =
        "bg-red-400 w-full mx-auto p-4 font-bold text-xl text-center";
      divError.innerHTML =
        "El usuario ingresado ya esta creado! Vuelve a ingresar uno nuevamente.";
      alert.appendChild(divError);

      setTimeout(() => {
        divError.remove();
      }, 5000);
      return;
    }
  });
});
