export class Music {
  constructor (musicObject) {
    this.title = musicObject.title;
    this.singer = musicObject.singer;
    this.src = musicObject.src;
    this.img = musicObject.img;
    this.audio = () => {
      if(this.audioFile) {
        return this.audioFile;
       } else {
          this.audioFile = new Audio(this.src);
          console.log('audio load');
          return this.audioFile;
       }
    }
  }
}