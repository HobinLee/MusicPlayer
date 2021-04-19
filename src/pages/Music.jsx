import { useEffect, useState } from 'react';
import MusicPlayer from '../components/musicPlayer/MusicPlayer'
import '../styles/music.css';
import { MusicManager } from '../components/musicPlayer/MusicList';
import DragIcon from "../rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";

const MusicPage = () => {
  const [listVisible, setListVisible] = useState(false);
  const [musicList, setMusicList] = useState(MusicManager.getMusicList());
  const [musicIndex, setMusicIndex] = useState(0);
  const [currMusic, setCurrentMusic] = useState(musicList[0]);
  const [picked, setPicked] = useState(null);
  const [pickedIndex, setPickedIndex] = useState(null);

  useEffect(() => {
  }, musicList)

  const switchListVisible = () => {
    setListVisible(!listVisible);
  }

  const generateMusicList = () => {
    if (musicList.length > 0) {
      return musicList.map((music, index) => createMusicElement(music, index));
    } else {
      return null;
    }
  }

  const createMusicElement = (music, index) => {
    return (
      <li className = "hov-music-element" key = {music.title} onClick={() => jumpMusic(index)}>
        <img className = "hov-music-element-thumbnail" src = {music.img} alt={music.title}/>
        <div className = "hov-music-element-info">
          <h3 style={{ fontWeight: music.title === currMusic.title ? 'bolder' : 'lighter'}}>{music.title}</h3>
          <h4 style={{ fontWeight: music.title === currMusic.title ? 'bolder' : 'lighter'}}>{music.singer}</h4>
        </div>
        <div className = "hov-music-element-move">
          <img src = {DragIcon} alt = "order-change-icon"/>
        </div>
      </li>);
  }

  const changeMusic = (next) => {
    let curr = musicIndex;
  
    console.log(curr, musicList.findIndex((music) => music === currMusic));

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

    setCurrentMusic(musicList[curr]);
    setMusicIndex(curr);
  }

  const dragStart = (e) => {
    let element = e.target;

    if(element.nodeName === 'UL')
      return;
       
    while(element.nodeName !== 'LI') {
      element = element.parentNode;
    }

    const list = [... element.parentNode.children];
    setPicked(element);
    setPickedIndex(list.indexOf(element));
  }

  const drop = (e) => {
    let element = e.target;

    if(element.nodeName === 'UL')
      return;
  
    while(element.nodeName !== 'LI') {
      element = element.parentNode;
    }
    
    const list = [... element.parentNode.children];
    const index = list.indexOf(element);
  
    (index < pickedIndex) ? element.before(picked) : element.after(picked);
    
    reSetMusicList(pickedIndex, index);
  }
  
  const reSetMusicList = (before, after) => {
    const list = [...musicList];
    const beforeMusic = musicList[before];
  
    if (after === before) {
      return;
    }

    if (before < after) {
      for (let i = before ; i < after ; i ++) {
        list[i] = list[i + 1];

      }
    } else if (before > after) {
      for (let i = before ; i > after ; i --) {
        list[i] = list[i - 1];
      }
    }

    list[after] = beforeMusic;

    setMusicList(list);
    setMusicIndex(list.findIndex((music) => music === currMusic));
  }

  const jumpMusic = (index) => {
    setMusicIndex(index);
    setCurrentMusic(musicList[index]);
  }

  return (
    <div className = 'hov-music-contents-wrapper'>
      {
        <MusicPlayer currMusic = {currMusic} listVisible = {listVisible} listVisibleSwitch = {() => switchListVisible()} changeMusic={(next) => changeMusic(next)}/>
      }
      <div className = {listVisible ? 'hov-music-list-wrapper-show' : 'hov-music-list-wrapper-hide'}>
        <ul className = 'hov-music-play-list'
            onDragStart = { (e) => dragStart(e) }
            onDragOver = { (e) => e.preventDefault() }
            onDrop = { (e) => drop(e) } >
          { generateMusicList() }
        </ul>
      </div>
    </div>
  )
}

export default MusicPage;