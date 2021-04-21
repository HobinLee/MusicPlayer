const MusicTitle = ({ currentMusic }) => {
  return (
    <div className = 'hov-music-info-section'>
      <div className = 'hov-music-music-title'>{currentMusic?.title}</div>
      <div className = 'hov-music-music-singer'>{currentMusic?.singer}</div>
    </div>
  );
}

export default MusicTitle;