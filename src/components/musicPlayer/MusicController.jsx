import { useEffect, useState } from 'react';

const MusicController = ({ currentTime, finishTime, currMusic }) => {
  useEffect(() => {},[currentTime])
  
  const handleMusicTime = (e) => {
    currMusic.audio().currentTime = e * currMusic.audio().duration / 100;
  }

  const timeToString = (time) => {
    if (!time) return '0:00';

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
  
    return `${min}:${(sec < 10) ? '0' + sec : sec}`;  
  }

  return (
    <div className = 'hov-music-control-section'>
      <div className = 'hov-music-bar-wrapper'>
        <input className = "hov-music-bar"
              type = "range"
              min = "0" max = "100"
              value = {currMusic.audio().duration ? (currMusic.audio().currentTime / currMusic.audio().duration * 100) : 0}
              onChange = {(e) => handleMusicTime(e.target.value)}
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