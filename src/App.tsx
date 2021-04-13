import React from 'react';
import logo from './logo.svg';
import Menu from './components/menu';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import MusicPage from './pages/music';
import './App.css';

function App() {
  return (
    <div className="hov-content-wrapper">
      {
/*
      <MainPage/>
      <ProfilePage/>
*/
      }
      <MusicPage/>
      <Menu/>
    </div>
  );
}

export default App;
