function init() {
  var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
  });

  wavesurfer.load('./rsc/music/la la la lovesong - 백예린.mp3');
}

init();