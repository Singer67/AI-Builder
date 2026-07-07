import Reveal from './Reveal';

export default function Nav() {
  return (
    <nav className="container nav">
      <span className="nav-brand">Studio</span>
      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#approach">Approach</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
