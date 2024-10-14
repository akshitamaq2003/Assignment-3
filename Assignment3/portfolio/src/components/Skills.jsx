import React, { useEffect, useState } from 'react';
import '../styles/Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]); // State to hold skills data

  useEffect(() => {
    // Fetch skills data from the API
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5225/api/skills'); // Update with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the fetched data to check its structure
        setSkills(data); // Set skills data to state
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    }; 

    fetchSkills();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section id="skills">
      <p className="section__text__p1">What I Know</p>
      <h1 className="title">My Skills</h1>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={`${skill.skillName}-${index}`}> {/* Use unique key by combining skillName and index */}
           <img src={skill.logoUrl} alt={skill.skillName} className="skill-icon" />
            <h3>{skill.skillName}</h3>
            <p>Proficiency: {skill.proficiency}</p> {/* Display proficiency */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
