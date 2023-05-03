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
  if (
    form.get("username").length > 3 &&
    validator.isEmail(form.get("email")) &&
    validator.isInt(form.get("age")) &&
    form.get("password").length > 6 &&
    form.get("repeat_password").length > 6 &&
    form.get("address").length > 5 &&
    form.get("username").length > 3 &&
    form.get("phone").length > 5 &&
    form.get("nameImageAvatar") &&
    validator.equals(form.get("password"), form.get("repeat_password"))
  ) {
    fetch("/register", {
      method: "POST",
      body: form,
    }).then((response) => {
      if (response.status === 404) {
        return createAlert(
          "El usuario ingresado ya esta creado! Vuelve a ingresar uno nuevamente."
        );
      }
      return location.replace("/");
    });
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
