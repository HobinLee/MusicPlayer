const MusicCover = ({ currentMusic }) => {
  
  return (
    <div className = 'hov-music-cover-section'>
      <div className ='hov-music-cover-background' style={{backgroundImage: `url('${currentMusic?.img}')`}}></div>
      <div className ='hov-music-cover-image'>
        <img src = {currentMusic?.img} alt={`${currentMusic?.title}-cover`}/>
      </div>
    </div>
  );
}

export default MusicCover;