const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const usernameHead = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";

function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);

  const username = loginInput.value;
  usernameHead.innerText = `Hello ${username}!`;
  usernameHead.classList.remove(HIDDEN_CLASSNAME);
}

loginForm.addEventListener("submit", onLoginSubmit);
