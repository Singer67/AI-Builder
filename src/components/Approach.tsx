import Reveal from './Reveal';

const cards = [
  {
    number: '01',
    title: '化繁为简',
    desc: '去掉一切不必要的装饰，让每个元素都有其存在的理由。少不是空，而是精确。',
  },
  {
    number: '02',
    title: '细节之中',
    desc: '间距的毫厘之差、色彩的微妙变化、动势的轻柔过渡，品质藏在这些不易察觉的地方。',
  },
  {
    number: '03',
    title: '以人为本',
    desc: '每个设计最终服务于人的体验。清晰的导航、舒适的阅读、自然的交互，才是好的设计。',
  },
];

export default function Approach() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <Reveal className="section-header">
          <h2>我们如何工作</h2>
          <p>三个核心原则，贯穿每一个项目</p>
        </Reveal>
        <div className="cards">
          {cards.map((card, i) => {
            const delays: (undefined | 'd1' | 'd2' | 'd3')[] = [
              'd1',
              'd2',
              'd3',
            ];
            return (
              <Reveal key={card.number} delay={delays[i]} className="card">
                <span className="card-number">{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
