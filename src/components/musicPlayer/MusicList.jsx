import DragIcon from "../../rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicIndex, setMusicList } from '../../store/modules/music';


const MusicList = ({musicList, currentMusic}) => {
  const dispatch = useDispatch();
  const [picked, setPicked] = useState(null);
  const [pickedIndex, setPickedIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  const generateMusicList = (musicList) => {
    if (musicList) {
      return musicList.map((music, index) => createMusicElement(music, index));
    } else {
      return null;
    }
  }

  const createMusicElement = (music, index) => {
    return (
      <li className = "hov-music-element"
        draggable = 'true' key = {music.title} onClick={() => jumpMusic(index)}>
        <div className = {`hov-music-element-wrapper ${picked && (pickedIndex === index) && 'selected'}`}>
          <img className = "hov-music-element-thumbnail" draggable = 'false'  src = {music.img} alt={music.title}/>
          <div className = "hov-music-element-info">
            <h3 style={{ fontWeight: music.title === currentMusic.title ? 'bolder' : 'lighter'}}>{music.title}</h3>
            <h4 style={{ fontWeight: music.title === currentMusic.title ? 'bolder' : 'lighter'}}>{music.singer}</h4>
          </div>
          <div className = "hov-music-element-move">
            <img src = {DragIcon} draggable = 'false' alt = "order-change-icon"/>
          </div>
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
    
    setNewIndex(element, [...element.parentNode.children].indexOf(element));
  }

  const setNewIndex = (element, index)=> {
    (index < pickedIndex) ? element.before(picked) : element.after(picked);

    reSetMusicList(pickedIndex, index);
    setPicked(null);
    setPickedIndex(null);
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

  const touchMove = (e) => {
    if (!picked) {
      dragStart(e);
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    } else {
      picked.firstElementChild.style.top = `${e.touches[0].clientY - picked.firstElementChild.clientHeight / 2}px`;
      picked.firstElementChild.style.left = `${e.touches[0].clientX - picked.firstElementChild.clientWidth / 2}px`;
    }
  }
  const pxToNumber = (px) => {
    return Number(px.slice(0, -2));
  }

  const touchEnd = (e) => {
    if(picked) {
      const y = pxToNumber(picked.firstElementChild.style.top)
                   + picked.firstElementChild.clientHeight / 2;

      const dy = Math.floor((y - touchStart.y) / picked.firstElementChild.clientHeight);
      let index = pickedIndex + dy;

      if (index < 0) index = 0;
      if (index > picked.parentNode.children.length - 1) index = picked.parentNode.children.length - 1;
    
      setNewIndex(picked, index);
      setTouchStart(null);
      setPicked(null);
      setPickedIndex(null);
    }
  }

  return (
    <ul className = 'hov-music-play-list'
          onDragStart = {dragStart}
          onDragOver = { (e) => e.preventDefault() }
          onDrop = {drop}

          onTouchCancel = {touchEnd}
          onTouchMove = {touchMove}
          onTouchEnd = {touchEnd}
          >
        { generateMusicList(musicList) }
      </ul>
  );
}

export default MusicList;