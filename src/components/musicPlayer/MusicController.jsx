import { useState, useEffect } from 'react';
import MusicTimeBar from './MusicTimeBar'

const MusicController = ({ audio }) => {
  const [currentTime, setCurrentTIme] = useState(audio.currentTime);
  const [finishTime, setFinishTime] = useState(audio.duration);

  useEffect(() => {
    setCurrentTIme(audio.currentTime);
    setFinishTime(audio.duration);

    audio.ontimeupdate = () => {
      setCurrentTIme(audio.currentTime);
    };
  }, [audio]);

  const timeToString = (time) => {
    if (!time) return '0:00';

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
  
    return `${min}:${(sec < 10) ? '0' + sec : sec}`;  
  }

  return (
    <div className = 'hov-music-control-section'>
      <audio src = {audio}/>
        <div className = 'hov-music-bar'>
        <MusicTimeBar currentTime = { currentTime } finishTime = { finishTime } />
        <div className = 'hov-music-rest-bar'/>
      </div>
      <div className = 'hov-music-time'>
        <div className = 'hov-music-current-time'>{ timeToString(currentTime) }</div>
        <div className = 'hov-music-total-time'>{ timeToString(finishTime) }</div>
      </div>
    </div>
  );
}

export default MusicController;