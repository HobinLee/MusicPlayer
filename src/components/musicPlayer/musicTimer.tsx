import { Component } from 'react';

export class MusicTimer extends Component {
  render() {
    return (
      <div className = 'hov-music-time'>
        <div className = 'hov-music-current-time'>0:00</div>
        <div className = 'hov-music-total-time'>0:00</div>
      </div>
    );
  }
}

export default MusicTimer;