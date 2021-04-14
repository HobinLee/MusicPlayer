import { Component } from 'react';
import MusicPlayer from '../components/musicPlayer/musicPlayer'
import '../styles/music.css';
import { Music } from '../components/musicPlayer/music.entity';
import { MusicManager } from '../components/musicPlayer/musicList';
import DragIcon from "../rsc/uicons-regular-rounded/svg/fi-rr-interlining.svg";

export class MusicPage extends Component {
  createMusicElement(music: Music, key: number) {
    return (<li className = "hov-music-element" key = {key}>
            <audio src = {music.src} id = {music.title}></audio>
            <img className = "hov-music-element-thumbnail" src = {music.img} alt={music.title}/>
              <div className = "hov-music-element-info">
                <h3>{music.title}</h3>
                <h4>{music.singer}</h4>
              </div>
              <div className = "hov-music-element-move">
                <img src = {DragIcon} alt = "order-change-icon"/>
              </div>
            </li>);
  }
  generateMusicList() {
    const musicList = MusicManager.getMusicList();
    return musicList.map((music, index) => this.createMusicElement(music, index));
  }

  render() {
    return (
      <div className = 'hov-music-contents-wrapper'>
      <MusicPlayer/>
      <div className = 'hov-music-list-wrapper-close'>
        <ul className = 'hov-music-play-list'>
          { this.generateMusicList() }
        </ul>
      </div>
    </div>
  )}
}

export default MusicPage;