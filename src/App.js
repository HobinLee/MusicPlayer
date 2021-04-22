import React from 'react';
import Menu from './components/Menu';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import MusicPage from './pages/Music';
import { Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
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
  );
}

export default App;