import React from 'react';
import Menu from './components/Menu';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import MusicPage from './pages/Music';
import { Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const preventClick = (e) => {
    e.preventDefault();
    return false;
  }

  return (
    <div className="hov-wrapper"
      onContextMenu={preventClick}
      onSelect={preventClick}>
      <Route exact path="/" 
        render={() => <MusicPage/>}
      />
    </div>
  );
  /*
    <div className="hov-wrapper">
      <Route exact path="/" 
        render={() => <MainPage/>}
      />
      <Route path="/profile" 
        render={() => <ProfilePage/>}
      />
      <Route path="/music" 
        render={() => <MusicPage/>}
      />
      <Menu/>
    </div>
  */
}

export default App;