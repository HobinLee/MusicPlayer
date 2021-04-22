import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

import indexOn from "../rsc/menu_icon/home_selected.svg";
import indexOff from "../rsc/menu_icon/home.svg"; 
import profileOn from "../rsc/uicons-bold-rounded/svg/fi-br-portrait.svg";
import profileOff from "../rsc/uicons-regular-rounded/svg/fi-rr-portrait.svg";
import musicOn from "../rsc/menu_icon/music_selected.svg";
import musicOff from "../rsc/uicons-regular-rounded/svg/fi-rr-music.svg";

const Menu = () => {
  const [location, setLocation] = useState('');

  const createBTNs = () => {
    const menus = [
      {
        title: "",
        srcOn: indexOn,
        srcOff: indexOff,
      },
      {
        title: "profile",
        srcOn: profileOn,
        srcOff: profileOff,
      },
      {
        title: "music",
        srcOn: musicOn,
        srcOff: musicOff,
    }];
  
    return menus.map((menu) => 

    <Link className = "hov-menu-button" onClick={() => setLocation(menu.title)} to={`/${menu.title}`} key={menu.title}>
      <img src = {location === menu.title ? menu.srcOn : menu.srcOff} alt = {menu.title}></img>
    </Link> );
  }

  return (
    <div className="hov-menu-wrapper">
      {createBTNs()}
    </div>
  );
}

export default Menu;
