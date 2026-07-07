import Reveal from './Reveal';

export default function Quote() {
  return (
    <Reveal as="section" className="quote-section container">
      <blockquote>好的设计，感觉就像本该如此。</blockquote>
      <cite>— Dieter Rams</cite>
    </Reveal>
  );
}
