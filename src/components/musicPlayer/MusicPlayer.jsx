import { useState, useEffect } from 'react';
import MusicController from './MusicController';
import MusicCover from './MusicCover';
import MusicTitle from './MusicTitle';

import ListIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-list.svg';
import VolumeIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-volume.svg';
import MuteIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-mute.svg';
import PrevIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-rewind.svg';
import NextIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-forward.svg';
import PlayIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-play.svg';
import PauseIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicIndex } from '../../store/modules/music';

const JUMP_TIME = 5;

const MusicPlayer = ({ listVisible, listVisibleSwitch }) => {
  const dispatch = useDispatch();
  const { musicIndex, currentMusic, musicList } = useSelector(state => state);

  const [prevAudio, setPrevAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [finishTime, setFinishTime] = useState(null);
  const [jumpBTNPressTime, setBTNPressTime] = useState(0);
  const [jumpDirection, setJumpDirection] = useState(0);
  const [jumpTime, setJumpTime] = useState(false);
  const [play, setPlay] = useState(false);
  const [volumeControl, setVolumeControl] = useState(false);
  const [volume, setVolume] = useState(50);

  const initAudio = () => {
    currentMusic.audio().currentTime = 0;
    currentMusic.audio().volume = volume / 100;
    currentMusic.audio().ontimeupdate = handleMusicProgress;
    currentMusic.audio().onended = handleEndMusic;

    setCurrentTime(0);
    setPrevAudio(currentMusic.audio());
    setFinishTime(currentMusic.audio().duration);
  }

  useEffect(() => {
    if(prevAudio !== currentMusic.audio()) {
      //이전 음악이 만약 재생 중이라면
      if (prevAudio && play) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
        currentMusic.audio().play();
      }
  
      if(currentMusic.audio().duration) {
        initAudio();
      } else {
        currentMusic.audio().onloadedmetadata = initAudio;
      }
    }
  },[initAudio, play, prevAudio, currentMusic]);

  useEffect(() => {
    currentMusic.audio().ontimeupdate = handleMusicProgress;
  },[jumpBTNPressTime])

  function handleMusicProgress () {
    if (!jumpBTNPressTime || jumpThreshold()) {
      setCurrentTime(currentMusic.audio().currentTime);
    } else {
      jumpPlayTime();
    }
  }

  function jumpPlayTime() {
    const now = new Date().getTime();
    let targetTime = currentMusic.audio().currentTime + JUMP_TIME * jumpDirection;

    setJumpTime(true);
  
    if (targetTime > currentMusic.audio().duration) {
      targetTime = currentMusic.audio().duration;
      releaseJumpBTN();
    } else {
      setBTNPressTime(now);
    }
    
    currentMusic.audio().currentTime = targetTime;
  }

  const changeMusic = (next) => {
    let curr = musicIndex;

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

    dispatch(setMusicIndex(curr));
  }

  const handleEndMusic = () => { changeMusic(true) };

  const handlePlay = () => {
    //음악이 재생중이면 멈추고 멈춰있다면 재생하기
    play ? currentMusic.audio()?.pause() : currentMusic.audio()?.play();

    setPlay(!play);
  }
  
  const isIOS = () => {
    return window.navigator.userAgent.includes('iPad')
          || window.navigator.userAgent.includes('iPhone');
  }

  const switchVolume = () => {
    if (isIOS()) {
      if (volume) setVolume(0);
      else setVolume(50);
    } else {
      setVolumeControl(!volumeControl);
    }
  }
  
  const handleVolume = (volume) => {
    if (volume) {
      setVolume(volume);
      currentMusic.audio().volume = volume / 100;
      currentMusic.audio().muted = false;
    } else {
      currentMusic.audio().muted = true;
    }
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
        <MusicCover currentMusic = { currentMusic }/>
        <MusicTitle currentMusic = { currentMusic }/>
        <MusicController currentTime = { currentTime } finishTime = { finishTime }/>
      </div>
      
      <div className = 'hov-music-buttons'>
        <div className = "hov-music-volume-controller"
              style = { volumeControl? { display: 'flex' } : { display: 'none' } }>
          <h3 className = "hov-music-current-volume">{ volume }</h3>
          <input className = "hov-music-volume-controller-handle"
                  type = "range"
                  min = "0" max = "100"
                  id = "fader"
                  onChange = {(e) => handleVolume(e.target.value)}
          />
        </div>
        <button className = 'hov-music-list' onClick = { listVisibleSwitch } style = { volumeControl? { display: 'none' } : { display: 'flex' } }>
          <img src = { ListIcon } alt = 'menu' style={{ opacity : listVisible ? 1 : 0.5}}/>
        </button>
        <button className = 'hov-music-prev' style={ volumeControl? { display: 'none' } : {display: 'flex'} }>
          <img src = { PrevIcon } alt = 'prev' draggable = 'false' onTouchStart={() => pressJumpBTN(-1)} onTouchEnd={() => jumpTime && releaseJumpBTN()} onTouchCancel = {() => jumpTime && releaseJumpBTN()} onMouseDown = {() => pressJumpBTN(-1)} onMouseOut = {() => jumpTime && releaseJumpBTN()} onMouseUp = {releaseJumpBTN}/>
        </button>
        <button className = 'hov-music-play' style={ volumeControl? { display: 'none' } : {display: 'flex'} }>
          <img src = { play ? PauseIcon : PlayIcon } alt = 'play' onClick = {handlePlay}/>
        </button>
        <button className = 'hov-music-next' style={ volumeControl? { display: 'none' } : {display: 'flex'} }>
          <img src = { NextIcon } alt = 'next' draggable = 'false' onTouchStart={() => pressJumpBTN(1)} onTouchEnd={() => jumpTime && releaseJumpBTN()} onTouchCancel = {() => jumpTime && releaseJumpBTN()} onMouseDown = {() => pressJumpBTN(1)} onMouseOut = {() => jumpTime && releaseJumpBTN()} onMouseUp = {releaseJumpBTN}/>
        </button>
        <button className = 'hov-music-volume' onClick = { switchVolume }>
          <img src = { (volume > 0) ? VolumeIcon : MuteIcon } alt = 'volume' style={ volumeControl? { opacity: '1' } : { opacity: '0.5' } }/>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;