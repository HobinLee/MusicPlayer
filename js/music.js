const 
  screen = document.querySelector('body'),
  playList = document.querySelector('.hov-music-play-list'),
  prevBTN = document.querySelector('.hov-music-prev'),
  playBTN = document.querySelector('.hov-music-play'),
  nextBTN = document.querySelector('.hov-music-next'),
  musicBar = document.querySelector('.hov-music-bar'),
  controller = document.querySelector('.hov-music-controller'),
  title = document.querySelector('.hov-music-music-title'),
  singer = document.querySelector('.hov-music-music-singer');

const barWidth = musicBar.offsetWidth,
  controllerHalf = controller.offsetWidth / 2;

let musicIndex = 0,
  currentAudio = null,
  isPlaying = false,
  drag = false,
  startMouse = null,
  startController = -controllerHalf+'px';

const ICON_PLAY = './rsc/uicons-regular-rounded/svg/fi-rr-play.svg',
  ICON_PAUSE = './rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';

const musicList = [
  {
    title: 'la la la lovesong',
    singer: '백예린',
    src: './rsc/music/lalalalovesong.mp3'
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
    }

    drag = false;
  }
}

function onDrag(e) {
  if (drag) {
    handleMusicTime(e);
  }
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

    controller.style.left = position + 'px';
  }
}
function handleMusicProgress(e) {
  // bar : position = duration : currTime
  // position = bar * currTime / duration - controllerWidth / 2;
  const position = barWidth * currentAudio.currentTime / currentAudio.duration;
  controller.style.left = position - controllerHalf;
}

function pauseMusic(audio) {
  isPlaying = false;
  playBTN.firstElementChild.src = ICON_PLAY;
  playBTN.firstElementChild.alt = 'play';
  audio.pause();
}

function playMusic(audio) {
  isPlaying = true;
  playBTN.firstElementChild.src = ICON_PAUSE;
  playBTN.firstElementChild.alt = 'pause';
  audio.addEventListener('timeupdate', handleMusicProgress);
  audio.play();
}

function setMusicList() {
  musicList.forEach(music => {
    const audio = document.createElement('audio');
    audio.src = music.src;
    audio.id = music.title;

    playList.appendChild(audio);
  })
  title.innerText = musicList[0].title;
  singer.innerText = musicList[0].singer;
  currentAudio = playList.firstElementChild;
  controller.style.left = -controllerHalf;
}

function init() {
  setMusicList();

  playBTN.addEventListener('click', musicPlayPause);
  controller.addEventListener('mousedown', startDrag);
  screen.addEventListener('mouseup', endDrag);
  screen.addEventListener('mousemove', onDrag);
}

init();