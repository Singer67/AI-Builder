import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-bg" />
      <div className="hero-content">
        <Reveal as="p" className="hero-label" delay={undefined}>
          Founded 2024
        </Reveal>
        <Reveal delay="d1">
          <h1>
            设计是沉默的<em>对话</em>
          </h1>
        </Reveal>
        <Reveal delay="d2">
          <p>
            在克制与表达之间寻找精确的平衡点。每一行间距、每一段留白，都是经过推敲的选择。
          </p>
        </Reveal>
        <Reveal delay="d3">
          <a className="hero-cta" href="#approach">
            探索我们的方式
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
