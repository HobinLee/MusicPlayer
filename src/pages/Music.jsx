import { useEffect, useState } from 'react';
import '../styles/music.css';
import MusicPlayer from '../components/musicPlayer/MusicPlayer'
import { MusicManager } from '../components/musicPlayer/musicInfos';
import MusicList from '../components/musicPlayer/MusicList';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicIndex, setMusicList } from '../store/modules/music';

const MusicPage = () => {
  const dispatch = useDispatch();
  const { currentMusic, musicList } = useSelector(state => state);

  useEffect(() => {
    if (musicList === null) {
      dispatch(setMusicList(MusicManager.getMusicList()));
      dispatch(setMusicIndex(0));
    }
  })
  
  const [listVisible, setListVisible] = useState(false);

  const switchListVisible = () => {
    setListVisible(!listVisible);
  }

  return (
    <div className = 'hov-page hov-music-contents-wrapper'>
      {
        currentMusic &&
        <MusicPlayer listVisible = {listVisible} listVisibleSwitch = {() => switchListVisible()}/>
      }
      <div className = {listVisible ? 'hov-music-list-wrapper-show' : 'hov-music-list-wrapper-hide'}>
        <MusicList musicList = {musicList} currentMusic = {currentMusic}/>
      </div>
    </div>
  )
}

export default MusicPage;