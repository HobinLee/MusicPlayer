const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  select = form.querySelector("select"),
  text = document.querySelector(".js-text");

const USER_LS = "name",
  HIDE = "hide";

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
    text.classList.add(HIDE);
    form.classList.remove(HIDE);
  } else {
    form.classList.add(HIDE);
    text.classList.remove(HIDE);
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