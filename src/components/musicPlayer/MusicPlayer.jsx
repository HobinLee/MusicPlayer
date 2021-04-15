import { useState, useEffect } from 'react';
import MusicController from './MusicController';
import MusicCover from './MusicCover';
import MusicTitle from './MusicTitle';

import ListIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-list.svg';
import VolumeIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-volume.svg';
import PrevIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-rewind.svg';
import NextIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-forward.svg';
import PlayIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-play.svg';
import PauseIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';

const MusicPlayer = ({ currMusic, listVisible, listVisibleSwitch, changeMusic}) => {
  const [audio, setAudio] = useState(currMusic.audio);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    //이전 음악이 만약 재생 중이라면
    if (audio && play) {
      audio.pause();
      currMusic.audio.play();
    }
    
    currMusic.audio.currentTime = 0;
    setAudio(currMusic.audio);
  },[currMusic]);

  const handlePlay = () => {
    //음악이 재생중이면 멈추고 멈춰있다면 재생하기
    play ? audio?.pause() : audio?.play();

    setPlay(!play);
  }

  const handleVolume = () => {
    console.log('show and hide volumne controller');
  }

  return (
    <div className = 'hov-music-player-wrapper'>
      <div className = {listVisible ? 'hov-music-player-contents-with-list' : 'hov-music-player-contents'}>
        <MusicCover currMusic={currMusic}/>
        <MusicTitle currMusic={currMusic}/>
        <MusicController audio={currMusic.audio}/>
      </div>
      
      <div className = 'hov-music-buttons'>
        <div className = 'hov-music-volume-controller'>
          <h3 className = 'hov-music-current-volume'>50</h3>
        </div>
        <button className = 'hov-music-list' onClick = {listVisibleSwitch}>
          <img src = {ListIcon} alt = 'menu' style={{ opacity : listVisible ? 1 : 0.5}}/>
        </button>
        <button className = 'hov-music-prev'>
          <img src = {PrevIcon} alt = 'prev' onClick = {() => changeMusic(false)}/>
        </button>
        <button className = 'hov-music-play'>
          <img src = {play ? PauseIcon : PlayIcon} alt = 'play' onClick = {handlePlay}/>
        </button>
        <button className = 'hov-music-next'>
          <img src = {NextIcon} alt = 'next' onClick = {() => changeMusic(true)}/>
        </button>
        <button className = 'hov-music-volume' onClick = {handleVolume}>
          <img src = {VolumeIcon} alt = 'volume'/>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;