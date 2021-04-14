import React, { Component } from 'react';
import Menu from './components/menu';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import MusicPage from './pages/music';
import './App.css';

const MAX_PAGE: number = 3;

export class App extends Component{
  state = {
    isScrolling: false,
    page: 1,
  }

  scrollPage = (e: any) => {
    if (this.state.isScrolling) return;

    let page = this.state.page;

    if (e.deltaY > 0) {
      if (page === MAX_PAGE) return;
      page ++;
    } else {
      if (page === 1) return;
      page --;
    }
    
    this.setState({
      isScrolling: true,
      page: page
    })
  }

  render() {
    return (
      <div className={`hov-content-wrapper page${this.state.page}`}
           onWheel={(e) => this.scrollPage(e)}
           onTransitionEnd={() => this.setState({isScrolling: false})}>
        <MainPage/>
        <ProfilePage/>
        <MusicPage/>
        <Menu/>
      </div>
    );
  }
}
