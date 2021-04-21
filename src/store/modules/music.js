const SET_MUSIC = 'SET_MUSIC';
const SET_MUSICLIST = 'SET_MUSICLIST';

const initialState = {
  musicIndex: 0,
  currentMusic: null,
  musicList: []
}

export const setMusicIndex = (newIndex) => ({type: SET_MUSIC, musicIndex: newIndex});
export const setMusicList = (newList) => ({type: SET_MUSICLIST, musicList: newList});

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_MUSIC:
      return {
        ...state,
        musicIndex: action.musicIndex,
        currentMusic: state.musicList[action.musicIndex]
      }

    case SET_MUSICLIST:
      return {
        ...state,
        musicList: action.musicList,
        musicIndex: findMusicIndex()
      }

    default:
      return state;
  }
}

const findMusicIndex = () => {
  return 0;
}

export default reducer;