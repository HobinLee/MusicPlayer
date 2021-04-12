export class ScrollController {
  constructor() {
    this.MAX_PAGE = 5;
    this._currPage = 1;
    this._scrollPause = true;
    document.addEventListener('scroll', (e) => this._scrollPause && this.checkScroll(e));
  }
  init() {

  }
  checkScroll(e) {
    e.preventDefault;
    const direction = e.wheelDelta;
    this._scrollPause = false;
    if (direction < 0) {
      this._currPage ++;
    } else {
      this._currPage --;
    }

    if (this._currPage < 1) {
      this._currPage = 1;
    } else if (this._currPage > this.MAX_PAGE) {
      this._currPage = this.MAX_PAGE;
    }
    this._currPage ++;

    const wrapper = document.querySelector('.hov-content-wrapper');
    const style = -(this._currPage - 1) * 100 + 'vh;';
    console.log(style);
    wrapper.style.top = style;
  }
}

const scrollContoller = new ScrollController();

scrollContoller.init();