import { Component } from 'react';
import { Music } from './music.entity';
import { MusicProps } from './musicCover';

export class MusicTitle extends Component<MusicProps> {
  constructor(props: MusicProps) {
    super(props);
  }
  render() {
    return (
      <div className = 'hov-music-info-section'>
        <div className = 'hov-music-music-title'>{this.props.currMusic?.title}</div>
        <div className = 'hov-music-music-singer'>{this.props.currMusic?.singer}</div>
      </div>
    );
  }
}

export default MusicTitle;