export class ScrollController {
  constructor() {
    this._prevScroll = 0;
    this._currPage = 1;
    this._scrollPause = true;
    document.querySelector('.hov-content-wrapper')
      .addEventListener('mousewheel', (e) => this._scrollPause && this.checkScroll(e));
  }
  init() {

  }
  checkScroll(e) {
    document.body.qu
    this._scrollPause = false;

  }
}

const scrollContoller = new ScrollController();

scrollContoller.init();