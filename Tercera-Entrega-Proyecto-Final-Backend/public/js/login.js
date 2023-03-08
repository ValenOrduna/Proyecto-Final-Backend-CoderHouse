const formLogin = document.getElementById("formLogin");
const alert = document.getElementById("alert");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formLogin);
  fetch("/login", {
    method: "POST",
    body: form,
  }).then((response) => {
    if (response.status === 404) {
      const divError = document.createElement("div");
      divError.classList =
        "bg-red-400 w-full mx-auto p-4 font-bold text-xl text-center";
      divError.innerHTML =
        "El email o la contraseña no es correcta, intenta nuevamente.";
      alert.appendChild(divError);

      setTimeout(() => {
        divError.remove();
      }, 5000);
      return;
    }
    location.replace("/home");
  });
});
