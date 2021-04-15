const MusicTitle = (props) => {
  return (
    <div className = 'hov-music-info-section'>
      <div className = 'hov-music-music-title'>{props.currMusic?.title}</div>
      <div className = 'hov-music-music-singer'>{props.currMusic?.singer}</div>
    </div>
  );
}

export default MusicTitle;