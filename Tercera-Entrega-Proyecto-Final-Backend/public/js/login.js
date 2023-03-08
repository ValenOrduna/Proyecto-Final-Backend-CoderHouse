const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(formLogin);
  fetch("/login", {
    method: "POST",
    body: form,
  }).then((response) => console.log(response));
});
