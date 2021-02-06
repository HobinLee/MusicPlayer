const 
  screen = document.querySelector('body'),
  playList = document.querySelector('.hov-music-play-list'),
  prevBTN = document.querySelector('.hov-music-prev'),
  playBTN = document.querySelector('.hov-music-play'),
  nextBTN = document.querySelector('.hov-music-next'),
  musicBar = document.querySelector('.hov-music-bar'),
  timeBar = document.querySelector('.hov-music-time-bar');
  controller = document.querySelector('.hov-music-controller'),
  handle = controller.querySelector('.hov-music-controller-handle'),
  title = document.querySelector('.hov-music-music-title'),
  singer = document.querySelector('.hov-music-music-singer'),
  totalTime = document.querySelector('.hov-music-total-time'),
  currTime = document.querySelector('.hov-music-current-time');

const barWidth = musicBar.offsetWidth,
  controllerHalf = controller.offsetWidth / 2;

const COLOR_INACTIVE = "#89888F",
  COLOR_ACTIVE = "white";

let musicIndex = 0,
  currentAudio = null,
  isPlaying = false,
  drag = false,
  startMouse = null,
  startController = - controllerHalf+'px',
  audioList = null,
  mouseDown = null,
  jumpTime = null,
  jumpDirection = 0;

const JUMP_TIME = 5;

const DEFAULT_TIME = "0:00";

const ICON_PLAY = './rsc/uicons-regular-rounded/svg/fi-rr-play.svg',
  ICON_PAUSE = './rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';

const musicList = [
  {
    title: 'la la la lovesong',
    singer: '백예린',
    src: './rsc/music/lalalalovesong.mp3'
  },
  {
    title: '공드리',
    singer: '혁오',
    src: './rsc/music/공드리.mp3'
  },
  {
    title: 'She',
    singer: '카더가든',
    src: './rsc/music/she.mp3'
  },
  {
    title: '난춘',
    singer: '새소년',
    src: './rsc/music/난춘.mp3'
  }
]

function musicPlayPause() {
  const musicList = playList.querySelectorAll('audio');

  if (musicIndex < musicList.length) {
    currentAudio = musicList[musicIndex];
    if (isPlaying) {
      pauseMusic(currentAudio);
    } else {
      playMusic(currentAudio);
    }
  }
}

function startDrag(e) {
  drag = true;
  currentAudio.pause();
  handle.style.backgroundColor = COLOR_ACTIVE;
  startMouse = e.clientX;
  const positionPX = controller.style.left;
  startController = parseInt(positionPX.slice(0, positionPX.length - 2));
}

function endDrag(e) {
  if (startMouse) {
    const currMouse = e.clientX;
    const distance = currMouse - startMouse;

    currentAudio.currentTime = (startController + distance + controllerHalf) * currentAudio.duration / barWidth;
    startMouse = null;

    if (isPlaying) {
      currentAudio.play();
    } else {
      handle.style.backgroundColor = COLOR_INACTIVE;
    }

    drag = false;
  }
}

function onDrag(e) {
  if (drag) {
    handleMusicTime(e);
  }
}

function handleMusicEnd() {
  offPress();
  startNextMusic();
}

function handleMusicTime(e) {
  if (startMouse) {
    const currMouse = e.clientX;
    const distance = currMouse - startMouse;
    let position = startController + distance;

    if (position < -controllerHalf) {
      position = -controllerHalf;
    } else if (position > barWidth) {
      position = barWidth - controllerHalf;
    }

    const playRatio = (position + controllerHalf) / barWidth;
    setBar(currentAudio.duration * playRatio);
  }
}

function handleMusicProgress(e) {
  if (!jumpTime || jumpThreshold()){
    // bar : position = duration : currTime
    // position = bar * currTime / duration - controllerWidth / 2;
    setBar(currentAudio.currentTime);
    startTime = currentAudio.currentTime;
  } else {
    jumpPlayTime();
  }
}

function pauseMusic(audio) {
  isPlaying = false;
  handle.style.backgroundColor = COLOR_INACTIVE;
  playBTN.firstElementChild.src = ICON_PLAY;
  playBTN.firstElementChild.alt = 'play';
  audio.pause();
}

function playMusic(audio) {
  isPlaying = true;
  handle.style.backgroundColor = COLOR_ACTIVE;
  playBTN.firstElementChild.src = ICON_PAUSE;
  playBTN.firstElementChild.alt = 'pause';
  audio.play();
}

function secToTimer(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  return `${min}:${(sec < 10) ? '0' + sec : sec}`;
}

function setBar(time) {
  const ratio = (time / currentAudio.duration);
  const position = barWidth * ratio;

  timeBar.style.width = 100 * ratio + '%';
  
  controller.style.left = position - controllerHalf;
  
  currTime.innerText = secToTimer(time);
}

function setTotalTime() {
  totalTime.innerText = secToTimer(currentAudio.duration);
}

function jumpThreshold() {
  const now = new Date().getTime();
  const jumpThresholdTime = 500;

  return (now - jumpTime) < jumpThresholdTime;
}

function jumpPlayTime() {
  const now = new Date().getTime();
  const targetTime = currentAudio.currentTime + JUMP_TIME * jumpDirection;
  setBar(currentAudio.currentTime);
  
  if (targetTime > currentAudio.duration) {
    jumpTime = null;
  } else {
    jumpTime = now;
  }
  currentAudio.currentTime = targetTime;
}

function setMusicList() {
  musicList.forEach(music => {
    const audio = document.createElement('audio');
    audio.src = music.src;
    audio.id = music.title;

    playList.appendChild(audio);
  })
  audioList = playList.querySelectorAll('audio');

  musicIndex = 0;
  setTargetMusic();
}

function loadFinish() {
  console.log('load finish ' + musicList[musicIndex].title);
  setBar(0);
  setTotalTime();
  currentAudio.addEventListener('timeupdate', handleMusicProgress);
  currentAudio.addEventListener('ended', handleMusicEnd);

  if (isPlaying) {
    playMusic(currentAudio);
  }
}

function setTargetMusic() {
  mouseDown = null;
  title.innerText = musicList[musicIndex].title;
  singer.innerText = musicList[musicIndex].singer;
  currTime.innerText = DEFAULT_TIME;
  totalTime.innerText = DEFAULT_TIME;
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = audioList[musicIndex];
  currentAudio.load();
  currentAudio.addEventListener('loadeddata', loadFinish);
  controller.style.left = -controllerHalf;
}

function startNextMusic() {
  musicIndex ++;

  if (musicIndex >= musicList.length) {
    musicIndex = 0;
  }

  setTargetMusic();
}

function startPrevMusic() {
  musicIndex --;

  if (musicIndex < 0) {
    musicIndex = musicList.length - 1;
  }

  setTargetMusic();
}

function clickThreshold() {
  const now = new Date().getTime();
  const SEC = 1000;
  const threshold = 0.3 * SEC;

  return (now - mouseDown) < threshold;
}

function onPressPrev() {
  mouseDown = new Date().getTime();
  jumpTime = mouseDown;
  jumpDirection = -1;
}

function onPressNext() {
  mouseDown = new Date().getTime();
  jumpTime = mouseDown;
  jumpDirection = 1;
 }

function offPress() {
  if (clickThreshold()) {
    if (jumpDirection === 1) {
      startNextMusic();
    } else if(jumpDirection === -1) {
      startPrevMusic();
    }
  }
  mouseDown = null;
  jumpDirection = 0;
  jumpTime = null;
}

function init() {
  setMusicList();

  playBTN.addEventListener('click', musicPlayPause);
  controller.addEventListener('mousedown', startDrag);
  screen.addEventListener('mouseup', endDrag);
  screen.addEventListener('mousemove', onDrag);
  
  prevBTN.addEventListener('mousedown', onPressPrev);
  nextBTN.addEventListener('mousedown', onPressNext);
  
  prevBTN.addEventListener('mouseout', offPress);
  nextBTN.addEventListener('mouseout', offPress);
  prevBTN.addEventListener('mouseup', offPress);
  nextBTN.addEventListener('mouseup', offPress);
}

init();