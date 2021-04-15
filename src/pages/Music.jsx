import { useState } from 'react';
import MusicPlayer from '../components/musicPlayer/MusicPlayer'
import '../styles/music.css';
import { MusicManager } from '../components/musicPlayer/MusicList';
import DragIcon from "../rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";

const MusicPage = () => {
  const [listVisible, setListVisible] = useState(false);
  const [musicList] = useState(MusicManager.getMusicList());
  const [currMusic, setCurrentMusic] = useState(0);

  const switchListVisible = () => {
    setListVisible(!listVisible);
  }

  const createMusicElement = (music, key) => {
    return (
      <li className = "hov-music-element" key = {key}>
        <audio src = {music.src} id = {music.title}></audio>
        <img className = "hov-music-element-thumbnail" src = {music.img} alt={music.title}/>
        <div className = "hov-music-element-info">
          <h3>{music.title}</h3>
          <h4>{music.singer}</h4>
        </div>
        <div className = "hov-music-element-move">
          <img src = {DragIcon} alt = "order-change-icon"/>
        </div>
      </li>);
  }
  
  const generateMusicList = () => {
    if (musicList.length > 0) {
      return musicList.map((music, index) => createMusicElement(music, index));
    } else {
      return null;
    }
  }

  const changeMusic = (next) => {
    let curr = currMusic;
  
    if(next) {
      curr ++;
      if (curr === musicList.length) {
        curr = 0;
      }
    } else {
      curr --;
      if (curr < 0) {
        curr = musicList.length - 1;
      }
    }

    setCurrentMusic(curr);
  }

  return (
    <div className = 'hov-music-contents-wrapper'>
      <MusicPlayer currMusic = {musicList[currMusic]} listVisible = {listVisible} listVisibleSwitch = {() => switchListVisible()} changeMusic={(next) => changeMusic(next)}/>
      <div className = {listVisible ? 'hov-music-list-wrapper-show' : 'hov-music-list-wrapper-hide'}>
        <ul className = 'hov-music-play-list'>
          { generateMusicList() }
        </ul>
      </div>
    </div>
  )
}

export default MusicPage;