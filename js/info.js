const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  text = document.querySelector(".js-text");

const USER_LS = "name";

function handleSubmit(e) {
  e.preventDefault();
  saveInfo(input.value);
}

function askInfo() {
  form.addEventListener("submit", handleSubmit);
}

function loadInfo() {
  const currentUser = localStorage.getItem(USER_LS);

  if(currentUser === null) {
  } else {
    form.classList.remove("showing");
    text.innerText = `Hello ${currentUser}!`;
  }
}

function saveInfo(newInfo) {
  localStorage.setItem(USER_LS, newInfo);
  loadInfo();
}

function init() {
  loadInfo();
  askInfo();
}

init();