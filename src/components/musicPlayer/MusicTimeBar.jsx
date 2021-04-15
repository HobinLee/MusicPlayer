const MusicTimeBar = ({ currentTime, finishTime }) => {
  const moveTime = (e) => {
    console.log(e);
  }

  return (
    <div className = 'hov-music-time-bar' style = {{ width: 100 * (currentTime / finishTime) + '%' }}>
      <div className = 'hov-music-controller' onMouseMove={(e) => moveTime(e)}>
        <div className = 'hov-music-controller-handle'/>
      </div>
    </div>
  )
};

export default MusicTimeBar;