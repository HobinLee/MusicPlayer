export class ScrollController {
  constructor() {
    this.MAX_PAGE = 3;
    this._currPage = 1;
    this._scrollPause = true;
    this._wrapper = document.querySelector('body');

    this.initScroll();
  }
  init() {

  }
  checkScroll(e) {
    if (this._scrollPause === false) {
      return;
    }
    const direction = e.wheelDelta;
  
    if (direction < 0) {
      if (this._currPage === this.MAX_PAGE) return;
      this._currPage ++;
    } else {
      if (this._currPage === 1) return;
      this._currPage --;
    }
    
    console.log('scroll');
    
    this._scrollPause = false;

    this._wrapper.className = 'page' + this._currPage;

    document.removeEventListener('mousewheel', (e) => this.checkScroll(e));
    this._wrapper.addEventListener('transitionend', () => this.initScroll());
  }

  initScroll() {
    this._scrollPause = true;
    document.addEventListener('mousewheel', (e) => this.checkScroll(e));
    this._wrapper.removeEventListener('transitionend', (e) => this.startScroll());
  }
}

const scrollContoller = new ScrollController();

scrollContoller.init();