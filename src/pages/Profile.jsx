import '../styles/profile.css';

import doubleQuotes from "../rsc/profile/double-quotes.svg";
import MailIcon from "../rsc/profile/gmail.svg";
import PhoneIcon from "../rsc/profile/smartphone.svg";
import InstagramIcon from "../rsc/profile/instagram.svg";

const ProfilePage = () => {
  return <div className="hov-page hov-profile-wrapper">
  <div className="hov-profile-mission">
    <img src={doubleQuotes} alt="double-quotes"/>
    <h2 >기술로 세상에 좋은 변화를 일으키고 싶은 개발자</h2>
  </div>
  <div className="hov-profile-resume-wrapper">
    <ul className="hov-profile-resume">
    </ul>
  </div>
  <div className="hov-profile-contact">
    <ul>
      <li><img src={MailIcon} alt="email icon"/>viny5120@gmail.com</li>
      <li><img src={PhoneIcon} alt="phone icon"/>010.5120.2551</li>
      <li><img src={InstagramIcon} alt="insta icon"/>@l__hov</li>
    </ul>
  </div>
</div>
}

export default ProfilePage;