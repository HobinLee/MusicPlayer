const 
  screen = document.querySelector('body'),
  playList = document.querySelector('.hov-music-play-list'),
  prevBTN = document.querySelector('.hov-music-prev'),
  playBTN = document.querySelector('.hov-music-play'),
  listBTN = document.querySelector('.hov-music-list'),
  listPanel = document.querySelector('.hov-music-list-wrapper'),
  volumeBTN = document.querySelector('.hov-music-volume'),
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
  musicBTNList = null,
  mouseDown = null,
  jumpTime = null,
  jumpDirection = 0,
  prevMusic = null;

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

function findIndex(audio){
  for(let i = 0 ; i < audioList.length ; i++) {
    if (audioList[i].firstElementChild === audio) {
      return i;
    }
  }
  console.error('cannot find audio index');
  return 0;
}

function jumpMusic(e) {
  let target = e.target.parentNode;

  while (target.nodeName != 'LI') {
    target = target.parentNode;
  }
  
  let newIndex = findIndex(target.firstElementChild);

  if (musicIndex !== newIndex) {
    musicIndex = newIndex;
    setTargetMusic();
  }
}

function createMusicElementBTN(music) {
  const musicElement = document.createElement('li');
  const thumbnail = document.createElement('div');
  const info = document.createElement('div');
  const moveBTN = document.createElement('button');
  const musicTitle = document.createElement('h3');
  const musicSinger = document.createElement('h4');
  const audio = document.createElement('audio');
  const moveIcon = new Image();

  musicElement.className = "hov-music-element";
  info.className = "hov-music-element-info";
  thumbnail.className = "hov-music-element-thumbnail";
  moveBTN.className = "hov-music-element-move";

  moveIcon.src = "./rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";
  moveIcon.alt = "order change";

  moveBTN.appendChild(moveIcon);
  musicTitle.innerText = music.title;
  musicSinger.innerText = music.singer;

  audio.src = music.src;
  audio.id = music.title;

  info.appendChild(musicTitle);
  info.appendChild(musicSinger);
  musicElement.appendChild(audio);
  musicElement.appendChild(thumbnail);
  musicElement.appendChild(info);
  musicElement.appendChild(moveBTN);
  playList.appendChild(musicElement);

  //썸네일이나 제목부분 누르면 해당 음악 재생
  thumbnail.addEventListener('click', jumpMusic);
  info.addEventListener('click', jumpMusic);
}

function setCurrentMusicState() {
  if (prevMusic) {
    prevMusic.querySelector('.hov-music-element-info').style.opacity = 0.7;
  }
  const info = audioList[musicIndex].querySelector('.hov-music-element-info');
  
  info.style.opacity = 1;
  prevMusic = audioList[musicIndex];
}

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
  musicList.forEach(music => createMusicElementBTN(music));
  audioList = playList.querySelectorAll('.hov-music-element');
  musicIndex = 0;
  setTargetMusic();
}

function loadFinish() {
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
  
  currentAudio = audioList[musicIndex].firstElementChild;
  currentAudio.load();
  currentAudio.addEventListener('loadeddata', loadFinish);
  controller.style.left = -controllerHalf;
  setCurrentMusicState();
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

function controlListPanel() {
  if (listPanel.style.maxWidth === "0px") {
    listPanel.style.maxWidth = "30em";
    listBTN.firstElementChild.style.opacity = 1;
  } else {
    listPanel.style.maxWidth = "0";
    listBTN.firstElementChild.style.opacity = 0.5;
  }
}

function init() {
  setMusicList();

  playBTN.addEventListener('click', musicPlayPause);
  listBTN.addEventListener('click', controlListPanel);

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