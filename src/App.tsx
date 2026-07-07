import { useTheme } from './hooks/useTheme';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Approach from './components/Approach';
import Quote from './components/Quote';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav />
      <Hero />
      <hr className="divider container" />
      <Approach />
      <hr className="divider container" />
      <Quote />
      <hr className="divider container" />
      <Footer />
      <ThemeToggle theme={theme} onToggle={toggle} />
    </>
  );
}
