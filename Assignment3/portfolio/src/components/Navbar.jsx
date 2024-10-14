import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav id="desktop-nav">
      <div className="logo">Akshita Sharma</div>
      <div className="nav-links">
        
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </div>
    </nav>
  );
}

export default Navbar;
