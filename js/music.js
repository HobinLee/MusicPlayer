const 
  screen = document.querySelector('body'),
  playList = document.querySelector('.hov-music-play-list'),
  playerWrapper = document.querySelector('.hov-music-player-contents'),
  prevBTN = document.querySelector('.hov-music-prev'),
  playBTN = document.querySelector('.hov-music-play'),
  nextBTN = document.querySelector('.hov-music-next'),
  listBTN = document.querySelector('.hov-music-list'),
  listPanel = document.querySelector('.hov-music-list-wrapper'),
  musicCoverBG = document.querySelector('.hov-music-cover-background'),
  musicCover = document.querySelector('.hov-music-cover-image'),
  volumeBTN = document.querySelector('.hov-music-volume'),
  musicBar = document.querySelector('.hov-music-bar'),
  timeBar = document.querySelector('.hov-music-time-bar'),
  controller = document.querySelector('.hov-music-controller'),
  handle = controller.querySelector('.hov-music-controller-handle'),
  title = document.querySelector('.hov-music-music-title'),
  singer = document.querySelector('.hov-music-music-singer'),
  totalTime = document.querySelector('.hov-music-total-time'),
  currTime = document.querySelector('.hov-music-current-time'),
  volumenController = document.querySelector('.hov-music-volume-controller'),
  volumeHandle = document.querySelector('.hov-music-volume-controller-handle'),
  currentVolume = document.querySelector('.hov-music-current-volume');

const barWidth = musicBar.offsetWidth,
  controllerHalf = controller.offsetWidth / 2;

const COLOR_INACTIVE = "#89888F",
  COLOR_ACTIVE = "white";

let musicIndex = 0,
  currentAudio = null,
  isPlaying = false,
  drag = false,
  startMouseX = null,
  startMouseY = null,
  startController = - controllerHalf+'px',
  audioList = null,
  musicBTNList = null,
  mouseDown = null,
  jumpTime = null,
  jumpDirection = 0,
  prevMusic = null;

const JUMP_TIME = 5,
  MOBILE_WIDTH = '820px';

const DEFAULT_TIME = "0:00";

const ICON_PLAY = './rsc/uicons-regular-rounded/svg/fi-rr-play.svg',
  ICON_PAUSE = './rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';

let musicList = [
  {
    title: 'la la la lovesong',
    singer: '백예린',
    src: './rsc/music/lalalalovesong.mp3',
    img: './rsc/music-img/lalalalovesong.png'
  },
  {
    title: '공드리',
    singer: '혁오',
    src: './rsc/music/공드리.mp3',
    img: './rsc/music-img/공드리.jpg'
  },
  {
    title: 'She',
    singer: '카더가든',
    src: './rsc/music/she.mp3',
    img: './rsc/music-img/she.jpg'
  },
  {
    title: '난춘',
    singer: '새소년',
    src: './rsc/music/난춘.mp3',
    img: './rsc/music-img/난춘.jpg'
  },
  {
    title: '오늘',
    singer: '오왠',
    src: './rsc/music/오늘.mp3',
    img: './rsc/music-img/today.jpg'
  },{
    title: 'la la la lovesong',
    singer: '백예린',
    src: './rsc/music/lalalalovesong.mp3',
    img: './rsc/music-img/lalalalovesong.png'
  },
  {
    title: '공드리',
    singer: '혁오',
    src: './rsc/music/공드리.mp3',
    img: './rsc/music-img/공드리.jpg'
  },
  {
    title: 'She',
    singer: '카더가든',
    src: './rsc/music/she.mp3',
    img: './rsc/music-img/she.jpg'
  },
  {
    title: '난춘',
    singer: '새소년',
    src: './rsc/music/난춘.mp3',
    img: './rsc/music-img/난춘.jpg'
  },
  {
    title: '오늘',
    singer: '오왠',
    src: './rsc/music/오늘.mp3',
    img: './rsc/music-img/today.jpg'
  },{
    title: 'la la la lovesong',
    singer: '백예린',
    src: './rsc/music/lalalalovesong.mp3',
    img: './rsc/music-img/lalalalovesong.png'
  },
  {
    title: '공드리',
    singer: '혁오',
    src: './rsc/music/공드리.mp3',
    img: './rsc/music-img/공드리.jpg'
  },
  {
    title: 'She',
    singer: '카더가든',
    src: './rsc/music/she.mp3',
    img: './rsc/music-img/she.jpg'
  },
  {
    title: '난춘',
    singer: '새소년',
    src: './rsc/music/난춘.mp3',
    img: './rsc/music-img/난춘.jpg'
  },
  {
    title: '오늘',
    singer: '오왠',
    src: './rsc/music/오늘.mp3',
    img: './rsc/music-img/today.jpg'
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
  const thumbnail = new Image();
  const info = document.createElement('div');
  const moveBTN = document.createElement('div');
  const musicTitle = document.createElement('h3');
  const musicSinger = document.createElement('h4');
  const audio = document.createElement('audio');
  const moveIcon = new Image();

  musicElement.className = "hov-music-element";
  info.className = "hov-music-element-info";
  thumbnail.className = "hov-music-element-thumbnail";
  thumbnail.src = music.img;
  thumbnail.alt = music.title;
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
  moveBTN.addEventListener('mouseover', dragOn);
  moveBTN.addEventListener('mouseout', dragOff);
  playList.addEventListener('dragstart', dragStart);
  playList.addEventListener('dragover', dragOver);
  playList.addEventListener('drop', drop);
}

let picked = null,
  pickedIndex = null,
  afterli = null,
  volumeControl = false;

function switchVolumenControl() {
  volumeControl = (!volumeControl);
  
  prevBTN.style.display = volumeControl ? "none" : "flex";
  playBTN.style.display = volumeControl ? "none" : "flex";
  nextBTN.style.display = volumeControl ? "none" : "flex";
  listBTN.style.display = volumeControl ? "none" : "flex";
  volumenController.style.display = volumeControl ? "flex" : "none";
  volumeBTN.querySelector('img').style.opacity = volumeControl ? 1 : 0.5;
}

function setVolume() {
  currentVolume.innerText = volumeHandle.value;
  currentAudio.volume = volumeHandle.value / 100;
}

function dragOn(e) {
  e.preventDefault();
  let element = e.target.parentNode.parentNode;

  if(element.nodeName === 'UL')
    return;

  if (element.nodeName === 'LI') {
    element.draggable = true;
  }
}

function dragOff(e) {
  let element = e.target.parentNode.parentNode;

  if(element.nodeName === 'UL')
    return;

  if (element.nodeName === 'LI') {
    element.draggable = false;
  }
}

function dragStart(e) {
  let element = e.target;

  if(element.nodeName === 'UL')
    return;
    
  while(element.nodeName !== 'LI') {
    element = element.parentNode;
  }

  const list = [... element.parentNode.children];
  picked = element;
  pickedIndex = list.indexOf(element);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  let element = e.target;

  if(element.nodeName === 'UL')
    return;

  while(element.nodeName !== 'LI') {
    element = element.parentNode;
  }
  
  const list = [... element.parentNode.children];
  const index = list.indexOf(element);

  (index < pickedIndex) ? element.before(picked) : element.after(picked);

  reSetMusicList(pickedIndex, index);
}

function findCurrentMusic()
{
  for(let i = 0 ; i < musicList.length ; i++) {
    if(currentAudio.id === musicList[i].title) {
      musicIndex = i;
      return;
    }
  }  
}

function reSetMusicList(before, after) {
  const beforeMusic = musicList[before];
  if (musicIndex === before) {
    musicIndex = after;
  }
  // musicIndex가 ++ 될 지, -- 될 지 작성 필요

  if (before < after) {
    for (let i = before ; i < after ; i ++) {
      musicList[i] = musicList[i + 1];
    }
  } else if (before > after) {
    for (let i = before ; i > after ; i --) {
      musicList[i] = musicList[i - 1];
    }
  }
  musicList[after] = beforeMusic;

  audioList = playList.querySelectorAll('.hov-music-element');
  findCurrentMusic();

  console.log(musicIndex, musicList);
  //before ~ after배열들은 전부 앞으로 민다
  //after위치에 before를 넣는다
  //musicList = ;
}

function onMove(e) {
  if (targetMusic) {
    const finalX = startPosX + e.clientX - startMouseX;
    const finalY = startPosY + e.clientY - startMouseY;
    targetMusic.style.left = finalX;
    targetMusic.style.top = finalY;
    console.log(finalX, finalY);
  }
}

function moveEnd(e) {
  targetMusic.style.position = 'static';
  startMouseX = null;
  startMouseY = null;
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
  startMouseX = e.clientX;
  const positionPX = controller.style.left;
  startController = parseInt(positionPX.slice(0, positionPX.length - 2));
}

function endDrag(e) {
  if (startMouseX) {
    const currMouse = e.clientX;
    const distance = currMouse - startMouseX;

    if (currentAudio.currentTime) {
      currentAudio.currentTime = (startController + distance + controllerHalf) * currentAudio.duration / barWidth;
      startMouseX = null;
  
      if (isPlaying) {
        currentAudio.play();
      } else {
        handle.style.backgroundColor = COLOR_INACTIVE;
      }
  
      drag = false;
    }
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
  if (startMouseX) {
    const currMouse = e.clientX;
    const distance = currMouse - startMouseX;
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
  
  if(musicCover.firstElementChild) {
    musicCover.removeChild(musicCover.firstElementChild);
  }

  const newCover = new Image();
  newCover.src = musicList[musicIndex].img;
  newCover.alt = musicList[musicIndex].title;

  musicCoverBG.style.backgroundImage = `url('${musicList[musicIndex].img}')`;
  musicCover.appendChild(newCover);

  currentAudio = audioList[musicIndex].firstElementChild;
  setVolume();
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
  console.log();

  if (listPanel.style.maxWidth === "0px") {
    listPanel.style.maxWidth = "30em";
    listBTN.firstElementChild.style.opacity = 1;
    listPanel.className = 'hov-music-list-wrapper-show';
    playerWrapper.className = 'hov-music-player-contents-with-list';
  } else {
    listPanel.style.maxWidth = "0";
    listBTN.firstElementChild.style.opacity = 0.5;
    listPanel.className = 'hov-music-list-wrapper';
    playerWrapper.className = 'hov-music-player-contents';
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

  volumeBTN.addEventListener('click', switchVolumenControl);

  volumeHandle.addEventListener('mousemove', setVolume);
  volumeHandle.addEventListener('mousedown', setVolume);
}

init();