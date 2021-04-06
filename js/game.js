const chessBoard = document.querySelector('.hov-game-chess-board');

function init() {
  for(let i = 0 ; i < 64 ; i ++) {
    const section = document.createElement('div');
    section.className = 'hov-game-chess-section';

    if ((!(Math.floor(i / 8) % 2) && (i % 2)) 
          || ((Math.floor(i / 8) % 2) && !(i % 2))) {
      section.style.backgroundColor = "#2c362d";
    } else {
      section.style.backgroundColor = "#eeeeee";

    }
    
    chessBoard.append(section);
  }
}

init();