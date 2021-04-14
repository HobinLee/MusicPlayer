import { Component } from 'react';
import { Music } from './music.entity';
import MusicTimer from './musicTimer';
import MusicCover from './musicCover';
import MusicInfo from './musicInfo';

import ListIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-list.svg';
import VolumeIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-volume.svg';
import PrevIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-rewind.svg';
import NextIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-forward.svg';
import PlayIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-play.svg';
import PauseIcon from '../../rsc/uicons-regular-rounded/svg/fi-rr-pause.svg';

type MusicPlayerProps = {
    currMusic: Music;
    changeMusic: (prev :boolean) => void;

    listVisible: boolean;
    listVisibleSwitch: () => void;
};

export class MusicPlayer extends Component<MusicPlayerProps> {
  state = {
    currMusic: null,
  }
  constructor(props: MusicPlayerProps) {
    super(props);
    if(this.props.currMusic) {
      const music = new Audio(this.props.currMusic.src);
      music.load();
      this.setState({currMusic: music})
    }
  }

  handlePlay(): void{
  }

  handleVolume(): void{
    console.log('show and hide volumne controller');
  }

  render() {
    return (
      <div className = 'hov-music-player-wrapper'>
        <div className = {this.props.listVisible ? 'hov-music-player-contents-with-list' : 'hov-music-player-contents'}>
          <MusicCover currMusic={this.props.currMusic}/>
          <MusicInfo currMusic={this.props.currMusic}/>
          <div className = 'hov-music-control-section'>
            <audio src = {this.props.currMusic?.src} onCanPlay={() => console.log('a')}/>
              <div className = 'hov-music-bar'>
              <div className = 'hov-music-time-bar'>
                <div className = 'hov-music-controller'>
                  <div className = 'hov-music-controller-handle'/>
                </div>
              </div>
              <div className = 'hov-music-rest-bar'/>
            </div>
            <MusicTimer/>
          </div>
        </div>
        
        <div className = 'hov-music-buttons'>
          <div className = 'hov-music-volume-controller'>
            <h3 className = 'hov-music-current-volume'>50</h3>
          </div>
          <button className = 'hov-music-list' onClick = {this.props.listVisibleSwitch}>
            <img src = {ListIcon} alt = 'menu' style={{ opacity : this.props.listVisible ? 1 : 0.5}}/>
          </button>
          <button className = 'hov-music-prev'>
            <img src = {PrevIcon} alt = 'prev' onClick = {() => this.props.changeMusic(true)}/>
          </button>
          <button className = 'hov-music-play'>
            <img src = {PlayIcon} alt = 'play' onClick = {() => this.handlePlay()}/>
          </button>
          <button className = 'hov-music-next'>
            <img src = {NextIcon} alt = 'next' onClick = {() => this.props.changeMusic(false)}/>
          </button>
          <button className = 'hov-music-volume' onClick = {this.handleVolume}>
            <img src = {VolumeIcon} alt = 'volume'/>
          </button>
        </div>
      </div>
    );
  }
}
export default MusicPlayer;