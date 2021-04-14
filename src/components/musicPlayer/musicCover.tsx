import { url } from 'node:inspector';
import { Component } from 'react';
import { Music } from './music.entity';

export type MusicProps = {
  currMusic: Music;
};

export class MusicCover extends Component<MusicProps> {
  constructor(props: MusicProps) {
    super(props);
  }

  render() {
    const style = {
      backgroundImage: `url('${this.props.currMusic?.img}')`
    }
    return (
      <div className = 'hov-music-cover-section'>
        <div className ='hov-music-cover-background' style={style}></div>
        <div className ='hov-music-cover-image'>
          <img src = {this.props.currMusic?.img} alt={`${this.props.currMusic?.title}-cover`}/>
        </div>
      </div>
    );
  }
}

export default MusicCover;