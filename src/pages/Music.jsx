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

  //playList.addEventListener('dragstart', dragStart);
  //playList.addEventListener('dragover', dragOver);
  //playList.addEventListener('drop', drop);

  const createMusicElement = (music, key) => {
    return (
      <li className = "hov-music-element" key = {key} onClick={() => jumpMusic(key)}>
        <audio src = {music.src} id = {music.title}></audio>
        <img className = "hov-music-element-thumbnail" src = {music.img} alt={music.title}/>
        <div className = "hov-music-element-info">
          <h3 style={{ fontWeight: key === currMusic ? 'bolder' : 'lighter'}}>{music.title}</h3>
          <h4 style={{ fontWeight: key === currMusic ? 'bolder' : 'lighter'}}>{music.singer}</h4>
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

  const dragStart = (e) => {
    console.log('drag start');
    // let element = e.target;

    // if(element.nodeName === 'UL')
    //   return;
       
    // while(element.nodeName !== 'LI') {
    //   element = element.parentNode;
    // }

    // const list = [... element.parentNode.children];
    // picked = element;
    // pickedIndex = list.indexOf(element);
  }

  const drop = (e) => {
    console.log('drop');
    // let element = e.target;

    // if(element.nodeName === 'UL')
    //   return;
  
    // while(element.nodeName !== 'LI') {
    //   element = element.parentNode;
    // }
    
    // element.id = undefined;
    
    // const list = [... element.parentNode.children];
    // const index = list.indexOf(element);
  
    // (index < pickedIndex) ? element.before(picked) : element.after(picked);
  
    // reSetMusicList(pickedIndex, index);
  }
  const reSetMusicList = () => {
    // const beforeMusic = musicList[before];
    // if (musicIndex === before) {
    //   musicIndex = after;
    // }
    // // musicIndex가 ++ 될 지, -- 될 지 작성 필요

    // if (before < after) {
    //   for (let i = before ; i < after ; i ++) {
    //     musicList[i] = musicList[i + 1];
    //   }
    // } else if (before > after) {
    //   for (let i = before ; i > after ; i --) {
    //     musicList[i] = musicList[i - 1];
    //   }
    // }
    // musicList[after] = beforeMusic;

    // audioList = playList.querySelectorAll('.hov-music-element');
    // findCurrentMusic();

    // console.log(musicIndex, musicList);

  //before ~ after배열들은 전부 앞으로 민다
  //after위치에 before를 넣는다
  }

  function findCurrentMusic()
  {
    // for(let i = 0 ; i < musicList.length ; i++) {
    //   if(currentAudio.id === musicList[i].title) {
    //     musicIndex = i;
    //     return;
    //   }
    // }  
  }

  const jumpMusic = (index) => {
    setCurrentMusic(index);
  }

  return (
    <div className = 'hov-music-contents-wrapper'>
      {
        <MusicPlayer currMusic = {musicList[currMusic]} listVisible = {listVisible} listVisibleSwitch = {() => switchListVisible()} changeMusic={(next) => changeMusic(next)}/>
      }
      <div className = {listVisible ? 'hov-music-list-wrapper-show' : 'hov-music-list-wrapper-hide'}>
        <ul className = 'hov-music-play-list'
            onDragStart = { (e) => dragStart(e) }
            onDragOver = { (e) => e.preventDefault() }
            onDragEnd = { (e) => drop(e) } >
          { generateMusicList() }
        </ul>
      </div>
    </div>
  )
}

export default MusicPage;