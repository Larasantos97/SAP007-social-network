// Este es el punto de entrada de tu aplicacion
//import "../lib/config-firebase.js"
import login from "./pages/login.js";
import feed from "./pages/feed.js";
import register from "./pages/register.js";

const main = document.querySelector("#root");

const redirect = () => {
  main.innerHTML = "";
  switch (window.location.hash) {
    case "#login":
      main.appendChild(login());
      break;
    case "#feed":
      main.appendChild(feed());
      break;
    case "#register":
      main.appendChild(register());
      break;
    default:
      main.appendChild(login());
  }
};
const init = () => {
  window.addEventListener("hashchange", () => {
    redirect();
  });
};
window.addEventListener("load", () => {
  redirect();
  init();
});
