import { Component } from 'react';
import MusicPlayer from '../components/musicPlayer/musicPlayer'
import '../styles/music.css';

export class MusicPage extends Component {
  render() {
    return (
      <div className = 'hov-music-contents-wrapper'>
      <MusicPlayer/>
      <div className = 'hov-music-list-wrapper-close'>
        <ul className = 'hov-music-play-list'></ul>
      </div>
    </div>
  )}
}

export default MusicPage;