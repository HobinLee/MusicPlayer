export class Music {
  constructor (musicObject) {
    this.title = musicObject.title;
    this.singer = musicObject.singer;
    this.src = musicObject.src;
    this.img = musicObject.img;
    this.audio = new Audio(this.src);
  }
}