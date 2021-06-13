const MusicCover = ({ currentMusic }) => {
  
  return (
    <div className = 'hov-music-cover-section'>
      <div className ='hov-music-cover-background' style={{backgroundImage: `url('${currentMusic?.img}')`}}></div>
      <img className ='hov-music-cover-image' src={currentMusic?.img} alt={`${currentMusic?.title}-cover`}/>
    </div>
  );
}

export default MusicCover;