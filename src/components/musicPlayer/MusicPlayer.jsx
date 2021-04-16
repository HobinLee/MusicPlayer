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

const JUMP_TIME = 5;

const MusicPlayer = ({ currMusic, listVisible, listVisibleSwitch, changeMusic}) => {
  const [prevAudio, setPrevAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [finishTime, setFinishTime] = useState(null);
  const [jumpBTNPressTime, setBTNPressTime] = useState(0);
  const [jumpDirection, setJumpDirection] = useState(0);
  const [jumpTime, setJumpTime] = useState(false);
  const [play, setPlay] = useState(false);
  const [volumeControl, setVolumeControl] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    //이전 음악이 만약 재생 중이라면
    if (prevAudio && play) {
      prevAudio.pause();
      prevAudio.currentTime = 0;
      currMusic.audio().play();
    }

    if(currMusic.audio().duration) {
      initAudio();
    } else {
      currMusic.audio().onloadedmetadata = initAudio;
    }
  },[currMusic]);

  useEffect(() => {
    currMusic.audio().ontimeupdate = handleMusicProgress;
  },[jumpBTNPressTime])

  function handleMusicProgress () {
    if (!jumpBTNPressTime || jumpThreshold()) {
      setCurrentTime(currMusic.audio().currentTime);
    } else {
      jumpPlayTime();
    }
  }

  function initAudio() {
    currMusic.audio().currentTime = 0;
    currMusic.audio().volume = volume / 100;
    currMusic.audio().ontimeupdate = handleMusicProgress;
    currMusic.audio().onended = handleEndMusic;

    setCurrentTime(0);
    setPrevAudio(currMusic.audio());
    setFinishTime(currMusic.audio().duration);
  }

  function jumpPlayTime() {
    const now = new Date().getTime();
    let targetTime = currMusic.audio().currentTime + JUMP_TIME * jumpDirection;

    setJumpTime(true);
  
    if (targetTime > currMusic.audio().duration) {
      targetTime = currMusic.audio().duration;
      releaseJumpBTN();
    } else {
      setBTNPressTime(now);
    }
    
    currMusic.audio().currentTime = targetTime;
  }
  
  const handleEndMusic = () => { play && changeMusic(true) };

  const handlePlay = () => {
    //음악이 재생중이면 멈추고 멈춰있다면 재생하기
    play ? currMusic.audio()?.pause() : currMusic.audio()?.play();

    setPlay(!play);
  }
  const switchVolume = () => {
    setVolumeControl(!volumeControl);
  }
  
  const handleVolume = (volume) => {
    setVolume(volume);
    currMusic.audio().volume = volume / 100;
  }

  function jumpThreshold() {
    const now = new Date().getTime();
    const jumpThresholdTime = 500;
  
    return (now - jumpBTNPressTime) < jumpThresholdTime;
  }

  function pressJumpBTN(direction) {
    const now = new Date().getTime();
  
    setJumpTime(false);
    setBTNPressTime(now);
    setJumpDirection(direction);
  }

  function releaseJumpBTN() {
    //jump한 적 없으면!
    if (!jumpTime) {
      changeMusic(jumpDirection > 0);
    }
  
    setBTNPressTime(0);
  }

  return (
    <div className = 'hov-music-player-wrapper'>
      <div className = { listVisible ? 'hov-music-player-contents-with-list' : 'hov-music-player-contents' }>
        <MusicCover currMusic = { currMusic }/>
        <MusicTitle currMusic = { currMusic }/>
        <MusicController currentTime = { currentTime } finishTime = { finishTime } currMusic = { currMusic }/>
      </div>
      
      <div className = 'hov-music-buttons'>
        <div className = "hov-music-volume-controller"
              style={volumeControl? { display: 'flex' } : { display: 'none' }}>
          <h3 className = "hov-music-current-volume">{ volume }</h3>
          <input className = "hov-music-volume-controller-handle"
                  type = "range"
                  min = "0" max = "100"
                  id = "fader"
                  onChange = {(e) => handleVolume(e.target.value)}
          />
        </div>
        <button className = 'hov-music-list' onClick = { listVisibleSwitch }
                style={ volumeControl? { display: 'none' } : { display: 'flex' } }>
          <img src = {ListIcon} alt = 'menu' style={{ opacity : listVisible ? 1 : 0.5}}/>
        </button>
        <button className = 'hov-music-prev' style={volumeControl? {display: 'none'} : {display: 'flex'}}>
          <img src = {PrevIcon} alt = 'prev' draggable = 'false' onMouseDown = {() => pressJumpBTN(-1)} onMouseOut={() => jumpTime && releaseJumpBTN()} onMouseUp={releaseJumpBTN}/>
        </button>
        <button className = 'hov-music-play' style={volumeControl? {display: 'none'} : {display: 'flex'}}>
          <img src = {play ? PauseIcon : PlayIcon} alt = 'play' onClick = {handlePlay}/>
        </button>
        <button className = 'hov-music-next' style={volumeControl? {display: 'none'} : {display: 'flex'}}>
          <img src = {NextIcon} alt = 'next' draggable = 'false' onMouseDown = {() => pressJumpBTN(1)} onMouseOut={() => jumpTime && releaseJumpBTN()} onMouseUp={releaseJumpBTN}/>
        </button>
        <button className = 'hov-music-volume' onClick = { switchVolume }>
          <img src = {VolumeIcon} alt = 'volume' style={volumeControl? {opacity: '1'} : {opacity: '0.5'}}/>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;