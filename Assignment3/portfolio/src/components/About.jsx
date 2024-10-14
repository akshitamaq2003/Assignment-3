import '../styles/About.css';
import education from "../assets/education.png";
import experience from "../assets/experience.png";

function About() {
  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <h1 className="title">About Me</h1>
      <div className="section-container">
        <div className="about-details-container">
          <div className="text-container">
            <p>Hello! I'm a passionate Web Developer committed to crafting responsive and engaging web applications...</p>
          </div>
          <div className="about-containers">
            <div className="details-container">
              <img src={experience} alt="Experience icon" className="icon" />
              <h3>Experience</h3>
              <p>6 Months Web Development<br />Telus International, Noida</p>
            </div>
            <div className="details-container">
              <img src={education} alt="Education icon" className="icon" />
              <h3>Education</h3>
              <p>B.Tech CSE<br />Sharda University (2021-2025)</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default About;
