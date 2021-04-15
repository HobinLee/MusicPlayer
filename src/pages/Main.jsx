import '../styles/main.css';
import Profile from '../rsc/profile/profile2.jpg'

const MainPage = () => {
  return (
    <div className="hov-page hov-main">
      <div className = "hov-main-name">LEE HOBIN</div>
        <div className = "hov-main-wrapper">
          <h1>WEB-DEVELOPER</h1>
          <div className="hov-main-profile-wrapper">
            <div className="hov-main-circle"></div>
            <div className="hov-main-rect"></div>
            <img className="hov-main-profile" src = {Profile} alt ='profile'/>
          </div>
          <h1>PORTFOLIO</h1>
        </div>
      <div className = "hov-main-last-update">2021. 04. 06</div>
    </div>
  )
}

export default MainPage;