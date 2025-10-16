import React from 'react';
import { TrendingUp, Users, Trophy, Calendar, Target, Zap } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '20+',
      label: 'Команд',
      description: 'Участвуют в лиге',
      color: 'var(--primary-blue)',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      icon: Target,
      value: '500+',
      label: 'Игроков',
      description: 'Профессиональных футболистов',
      color: 'var(--football-green)',
      bgColor: 'rgba(0, 255, 136, 0.1)'
    },
    {
      icon: Trophy,
      value: '100+',
      label: 'Трофеев',
      description: 'Разыграно за сезон',
      color: 'var(--football-gold)',
      bgColor: 'rgba(255, 215, 0, 0.1)'
    },
    {
      icon: Calendar,
      value: '365',
      label: 'Дней',
      description: 'Футбола в году',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.1)'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Удовлетворенность',
      description: 'Зрителей матчей',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'Поддержка',
      description: 'Для всех болельщиков',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    }
  ];

  const achievements = [
    {
      title: 'Лучшая лига мира',
      description: 'По версии FIFA',
      year: '2024',
      icon: Trophy
    },
    {
      title: 'Рекорд посещаемости',
      description: '95,000 зрителей',
      year: '2023',
      icon: Users
    },
    {
      title: 'Технологические инновации',
      description: 'VAR и гол-лайн технологии',
      year: '2024',
      icon: Zap
    }
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Статистика лиги</span>
          </h2>
          <p>
            Впечатляющие цифры и достижения нашей футбольной лиги
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="card stat-card">
              <div 
                className="stat-card-icon"
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon size={32} style={{ color: stat.color }} />
              </div>
              
              <div className="stat-card-value gradient-text">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-description">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="achievements">
          <div className="section-title">
            <h3>
              <span className="gradient-text">Достижения</span>
            </h3>
          </div>
          
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="achievement-card">
                <div className="achievement-icon">
                  <achievement.icon size={24} color="var(--football-green)" />
                </div>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">{achievement.description}</div>
                <div className="achievement-year">{achievement.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Stats */}
        <div className="live-stats">
          <div className="live-stats-title">Текущий сезон</div>
          <div className="live-stats-subtitle">Статистика в реальном времени</div>
          
          <div className="live-stats-grid">
            <div className="live-stat">
              <div className="live-stat-value gradient-text">15</div>
              <div className="live-stat-label">Игровых недель</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-value gradient-text">180</div>
              <div className="live-stat-label">Сыграно матчей</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-value gradient-text">450</div>
              <div className="live-stat-label">Забито голов</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-value gradient-text">2.5</div>
              <div className="live-stat-label">Голов за матч</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;