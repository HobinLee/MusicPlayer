import { Component } from 'react';
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
    listVisible: boolean;
    listVisibleSwitch: () => void;
};

export class MusicPlayer extends Component<MusicPlayerProps> {
  constructor(props: MusicPlayerProps) {
    super(props);
  }
  handlePlay(): void{
    console.log('click Play');
  }

  nextMusic(): void{
    console.log('play next music');
  }

  prevMusic(): void{
    console.log('play prev music');
  }

  handleList(): void{
    // const listPanel = document.querySelector('.hov-music-play-list');
    // if (listPanel?.style.maxWidth === "0px") {
    //   listPanel.style.maxWidth = "30em";
    //   listPanel.className = 'hov-music-list-wrapper-shov-music-player-contentshow';
    //   playerWrapper.className = ;
    // } else {
    //   listPanel.style.maxWidth = "0px";
    //   listPanel.className = 'hov-music-list-wrapper';
    //   playerWrapper.className = 'hov-music-player-contents';
    // }
  }

  handleVolume(): void{
    console.log('show and hide volumne controller');
  }
  render() {
    return (
      <div className = 'hov-music-player-wrapper'>
        <div className = {this.props.listVisible ? 'hov-music-player-contents-with-list' : 'hov-music-player-contents'}>
          <MusicCover/>
          <MusicInfo/>
          <div className = 'hov-music-control-section'>
              <div className = 'hov-music-bar'>
              <div className = 'hov-music-time-bar'>
                <div className = 'hov-music-controller'>
                  <div className = 'hov-music-controller-handle'>
                  </div>
                </div>
              </div>
              <div className = 'hov-music-rest-bar'>
              </div>
            </div>
            
            <MusicTimer/>
          </div>
        </div>
        
        <div className = 'hov-music-buttons'>
          <div className = 'hov-music-volume-controller'>
            <h3 className = 'hov-music-current-volume'>50</h3>
          </div>
          <button className = 'hov-music-list' onClick = {this.props.listVisibleSwitch}>
            <img src = {ListIcon} alt = 'menu'/>
          </button>
          <button className = 'hov-music-prev'>
            <img src = {PrevIcon} alt = 'prev' onClick = {this.prevMusic}/>
          </button>
          <button className = 'hov-music-play'>
            <img src = {PlayIcon} alt = 'play' onClick = {this.handlePlay}/>
          </button>
          <button className = 'hov-music-next'>
            <img src = {NextIcon} alt = 'next' onClick = {this.nextMusic}/>
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