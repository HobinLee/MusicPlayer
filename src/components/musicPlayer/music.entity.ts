
export class Music {
  title: string = '';
  singer: string = '';
  src: string = '';
  img: string = '';

  constructor (musicObject: any) {
    this.title = musicObject.title;
    this.singer = musicObject.singer;
    this.src = musicObject.src;
    this.img = musicObject.img;
  }
}