const menuWrapper = document.querySelector('.hov-menu-wrapper');
const menus = [
  {
    title: "index",
    srcOn: "./rsc/menu_icon/home_selected.svg",
    srcOff: "./rsc/menu_icon/home.svg"
  },
  {
    title: "profile",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-portrait.svg",
    srcOff:"./rsc/uicons-regular-rounded/svg/fi-rr-portrait.svg"
  },
  {
    title: "music",
    srcOn:"./rsc/menu_icon/music_selected.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-music.svg"
  },/*
  {
    title: "calander",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-calendar.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-calendar.svg"
  },
  {
    title: "film",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-film.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-film.svg"
  },
  {
    title: "trip",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-paper-plane.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-paper-plane.svg"
  },
  {
    title: "gallery",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-layout-fluid.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-layout-fluid.svg"
  },
  {
    title: "game",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-chess.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-chess.svg"
  },
  {
    title: "health",
    srcOn:"./rsc/uicons-bold-rounded/svg/fi-br-gym.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-gym.svg"
  },
  {
    title: "portfolio",
    srcOn: "./rsc/uicons-bold-rounded/svg/fi-br-link.svg",
    srcOff: "./rsc/uicons-regular-rounded/svg/fi-rr-link.svg"
  }*/
]

function handleBTNClick(e) {
  e.preventDefault();

  const URL = `./${e.target.alt}.html`;
  window.location.href = URL;
}

function createBTNs() {
  const currLocation = getCurrLocation()

  menus.forEach(menu => {
    const btn = document.createElement("button");
    const img = new Image();
    btn.className = "hov-menu-button";

    if (currLocation == menu.title) {
      img.id = "hov-menu-button-current";
      img.src = menu.srcOn;
    } else {
      img.src = menu.srcOff;
    }
    img.alt = menu.title;

    btn.appendChild(img);
    img.addEventListener("click", handleBTNClick);
    menuWrapper.appendChild(btn);
  });
}

function getCurrLocation() {
  const currURL = window.location.pathname;

  let tmp = currURL.split('/');

  return tmp[tmp.length - 1].split('.')[0];
}

function handleHoverBTN(e) {
  //e.target.style.
}

function init() {
  createBTNs();
}

init();