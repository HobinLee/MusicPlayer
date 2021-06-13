import { useEffect, useState } from 'react';
import '../styles/music.css';
import MusicPlayer from '../components/musicPlayer/MusicPlayer'
import { MusicManager } from '../components/musicPlayer/MusicList';
import DragIcon from "../rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setMusicIndex, setMusicList } from '../store/modules/music';

const MusicPage = () => {
  const dispatch = useDispatch();
  const { currentMusic, musicList } = useSelector(state => state);

  useEffect(() => {
    if (musicList === null) {
      dispatch(setMusicList(MusicManager.getMusicList()));
      dispatch(setMusicIndex(0));
    }
  })
  
  const [listVisible, setListVisible] = useState(false);
  const [picked, setPicked] = useState(null);
  const [pickedIndex, setPickedIndex] = useState(null);

  const switchListVisible = () => {
    setListVisible(!listVisible);
  }

  const generateMusicList = () => {
    if (musicList) {
      return musicList.map((music, index) => createMusicElement(music, index));
    } else {
      return null;
    }
  }
  
  const preventClick = (e) => {
    e.preventDefault();
    return false;
  }

  const createMusicElement = (music, index) => {
    return (
      <li className = "hov-music-element"
        onContextMenu={preventClick}
        onSelect={preventClick}
        draggable = 'true' key = {music.title} onClick={() => jumpMusic(index)}>
        <img className = "hov-music-element-thumbnail" draggable = 'false'  src = {music.img} alt={music.title}/>
        <div className = "hov-music-element-info">
          <h3 style={{ fontWeight: music.title === currentMusic.title ? 'bolder' : 'lighter'}}>{music.title}</h3>
          <h4 style={{ fontWeight: music.title === currentMusic.title ? 'bolder' : 'lighter'}}>{music.singer}</h4>
        </div>
        <div className = "hov-music-element-move">
          <img src = {DragIcon} draggable = 'false' alt = "order-change-icon"/>
        </div>
      </li>);
  }

  const dragStart = (e) => {
    let element = e.target;

    if(element.nodeName === 'UL')
      return;

    e.stopPropagation();
       
    while(element.nodeName !== 'LI') {
      element = element.parentNode;
    }

    const list = [...element.parentNode.children];
    setPicked(element);
    setPickedIndex(list.indexOf(element));
  }

  const drop = (e) => {
    let element = e.target;

    if(element.nodeName === 'UL')
      return;
  
    e.stopPropagation();

    while(element.nodeName !== 'LI') {
      element = element.parentNode;
    }
    
    const list = [...element.parentNode.children];
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

    dispatch(setMusicList(list));
  }

  const jumpMusic = (index) => {
    dispatch(setMusicIndex(index));
  }

  return (
    <div className = 'hov-page hov-music-contents-wrapper'>
      {
        currentMusic &&
        <MusicPlayer listVisible = {listVisible} listVisibleSwitch = {() => switchListVisible()}/>
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