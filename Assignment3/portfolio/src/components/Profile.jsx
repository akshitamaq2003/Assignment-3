import '../styles/Profile.css';
import img from "../assets/profile.png";
import linkedin from "../assets/linkedin.png"
import github from "../assets/github.png";
 
function Profile() {
  return (
    <section id="profile">
      <div className="section__pic-container">
        <img src={img} alt="profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello! I'm</p>
        <h1 className="title">Akshita Sharma</h1>
        <p className="section__text__p2"><span>Full Stack Developer</span></p>
        <div className="btn-container">
          <button className="btn-profile" onClick={() => window.open('./assets/resume.pdf')}>
            Download CV
          </button>
          <button className="btn-profile" onClick={() => window.location.href = '#contact'}>
            Contact Info
          </button>
        </div>
        <div id="socials-container">
          <img src={linkedin} alt="LinkedIn" className="icon" />
          <img src={github} alt="GitHub" className="icon" />
        </div>
      </div>
    </section>
  );
}

export default Profile;
