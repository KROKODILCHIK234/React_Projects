import React from 'react';
import ScrollAnimation from './ScrollAnimation';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <ScrollAnimation animation="fadeInUp">
            <h1 className="hero-title">
              <span className="gradient-text">Футбольная</span>
              <br />
              <span className="text-white">Лига</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <p className="hero-subtitle">
              Следите за лучшими командами, игроками и матчами в мире футбола
            </p>
          </ScrollAnimation>

          {/* CTA Buttons */}
          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="hero-buttons">
              <button className="btn-secondary">
                Узнать больше
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Hero;