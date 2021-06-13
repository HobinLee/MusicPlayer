import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MusicController = ({ currentTime, finishTime }) => {
  const { currentMusic } = useSelector(state => state);
  const [ offset , setOffset ] = useState(null);
  const [ startMouseX , setStartMouseX ] = useState(0);
  const [ barSize ] = useState(100 / Number(window.innerWidth > 360 ? 280 : (window.innerWidth - 40)));

  useEffect(() => {},[currentTime])
  
  const handleMusicTime = (e) => {
    currentMusic.audio().currentTime = e * currentMusic.audio().duration / 100;
  }

  const timeToString = (time) => {
    if (!time) return '0:00';

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
  
    return `${min}:${(sec < 10) ? '0' + sec : sec}`;  
  }

  const initControl = (e) => {
    if (e.touches.length) {
      setOffset(Number(e.target.value));
      setStartMouseX(Number(e.touches[0].clientX));
    }
  }

  const handleControl = (e) => {
    if (e.touches.length) {
      if (!offset) {
        setOffset(Number(e.target.value));
        setStartMouseX(Number(e.touches[0].clientX));
      } else {
        const change = (Number(e.touches[0].clientX) - startMouseX) * barSize;
      
        let result = offset + change;

        if (result < 0) result = 0;
        else if (result > 99.99) result = 99.99;
        
        handleMusicTime(result);
      }
    }
  }

  return (
    <div className = 'hov-music-control-section'>
      <div className = 'hov-music-bar-wrapper'>
        <input className = "hov-music-bar"
              type = "range"
              min = "0" max = "100"
              value = {currentMusic.audio().duration ? (currentMusic.audio().currentTime / currentMusic.audio().duration * 100) : 0}
              onChange = {(e) => {
                handleMusicTime(e.target.value);
              }}
              
              onTouchStart = {initControl}
              onTouchMove = {handleControl}
              onTouchEnd = {() => setOffset(null)}
        />
      </div>
      <div className = 'hov-music-time'>
        <div className = 'hov-music-current-time'>{ timeToString(currentTime) }</div>
        <div className = 'hov-music-total-time'>{ timeToString(finishTime) }</div>
      </div>
    </div>
  );
}

export default MusicController;