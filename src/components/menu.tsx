import { Component } from 'react';
import '../styles/menu.css'

import indexOn from "../rsc/menu_icon/home_selected.svg";
import indexOff from "../rsc/menu_icon/home.svg"; 
import profileOn from "../rsc/uicons-bold-rounded/svg/fi-br-portrait.svg";
import profileOff from "../rsc/uicons-regular-rounded/svg/fi-rr-portrait.svg";
import musicOn from "../rsc/menu_icon/music_selected.svg";
import musicOff from "../rsc/uicons-regular-rounded/svg/fi-rr-music.svg";

class Menu extends Component {
  handleBTNClick() {
    console.log('click');
  }

  createBTNs() {
    const menus = [
      {
        title: "index",
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
        <button className = "hov-menu-button" onClick = {this.handleBTNClick} key={menu.title}>
          <img src = {menu.srcOff} alt = {menu.title}></img>
        </button>
      );
  }

  render() {
    return <div className="hov-menu-wrapper">
      {this.createBTNs()}
    </div>
  }
}

export default Menu;
