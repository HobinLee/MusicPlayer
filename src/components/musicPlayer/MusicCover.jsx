const MusicCover = ({ currMusic }) => {
  
  return (
    <div className = 'hov-music-cover-section'>
      <div className ='hov-music-cover-background' style={{backgroundImage: `url('${currMusic?.img}')`}}></div>
      <div className ='hov-music-cover-image'>
        <img src = {currMusic?.img} alt={`${currMusic?.title}-cover`}/>
      </div>
    </div>
  );
}

export default MusicCover;