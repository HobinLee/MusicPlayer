import React, { useState } from 'react';
import Menu from './components/Menu';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import MusicPage from './pages/Music';
import './App.css';

const MAX_PAGE = 3;

const App = () => {
  const [isScrolling, setScrollState] = useState(false);
  const [page, setPage] = useState(1);

  const scrollPage = (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      if (page === MAX_PAGE) return;
      setPage(page + 1);
    } else {
      if (page === 1) return;
      setPage(page - 1);
    }
    setScrollState(true);
  }

  return (
    <div className={`hov-content-wrapper page${page}`}
          onWheel={(e) => scrollPage(e)}
          onTransitionEnd={() => setScrollState(false)}>
      <MainPage/>
      <ProfilePage/>
      <MusicPage/>
      <Menu/>
    </div>
  );
}

export default App;