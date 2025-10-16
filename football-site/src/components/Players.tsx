import React, { useState } from 'react';
import { Star, Target, Zap, Shield, Award } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  teamLogo: string;
  photo: string;
  age: number;
  nationality: string;
  rating: number;
  goals: number;
  assists: number;
  matches: number;
  trophies: number;
  skills: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
    dribbling: number;
    physical: number;
  };
}

const Players: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filterPosition, setFilterPosition] = useState<string>('all');

  const players: Player[] = [
    {
      id: 1,
      name: 'Криштиану Роналду',
      position: 'Нападающий',
      team: 'Al Nassr',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Al-Nassr-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/8198-1671435885.jpg',
      age: 39,
      nationality: 'Португалия',
      rating: 9.2,
      goals: 850,
      assists: 250,
      matches: 1200,
      trophies: 32,
      skills: { pace: 85, shooting: 95, passing: 88, defending: 35, dribbling: 90, physical: 88 }
    },
    {
      id: 2,
      name: 'Лионель Месси',
      position: 'Нападающий',
      team: 'Inter Miami',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Inter-Miami-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/28003-1671435885.jpg',
      age: 36,
      nationality: 'Аргентина',
      rating: 9.0,
      goals: 800,
      assists: 350,
      matches: 1000,
      trophies: 44,
      skills: { pace: 80, shooting: 92, passing: 95, defending: 30, dribbling: 95, physical: 75 }
    },
    {
      id: 3,
      name: 'Килиан Мбаппе',
      position: 'Нападающий',
      team: 'Real Madrid',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/342229-1671435885.jpg',
      age: 25,
      nationality: 'Франция',
      rating: 9.1,
      goals: 300,
      assists: 120,
      matches: 400,
      trophies: 15,
      skills: { pace: 95, shooting: 90, passing: 80, defending: 35, dribbling: 88, physical: 85 }
    },
    {
      id: 4,
      name: 'Кевин Де Брейне',
      position: 'Полузащитник',
      team: 'Manchester City',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/88755-1671435885.jpg',
      age: 32,
      nationality: 'Бельгия',
      rating: 8.9,
      goals: 150,
      assists: 200,
      matches: 600,
      trophies: 20,
      skills: { pace: 75, shooting: 88, passing: 95, defending: 60, dribbling: 85, physical: 80 }
    },
    {
      id: 5,
      name: 'Винисиус Жуниор',
      position: 'Нападающий',
      team: 'Real Madrid',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/371998-1671435885.jpg',
      age: 23,
      nationality: 'Бразилия',
      rating: 8.8,
      goals: 100,
      assists: 80,
      matches: 250,
      trophies: 8,
      skills: { pace: 95, shooting: 85, passing: 80, defending: 30, dribbling: 92, physical: 75 }
    },
    {
      id: 6,
      name: 'Эрлинг Холанд',
      position: 'Нападающий',
      team: 'Manchester City',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/418560-1671435885.jpg',
      age: 23,
      nationality: 'Норвегия',
      rating: 8.9,
      goals: 200,
      assists: 50,
      matches: 300,
      trophies: 12,
      skills: { pace: 90, shooting: 95, passing: 70, defending: 25, dribbling: 80, physical: 90 }
    }
  ];

  const positions = ['all', 'Нападающий', 'Полузащитник', 'Защитник', 'Вратарь'];
  
  const filteredPlayers = filterPosition === 'all' 
    ? players 
    : players.filter(player => player.position === filterPosition);

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'pace': return Zap;
      case 'shooting': return Target;
      case 'passing': return Award;
      case 'defending': return Shield;
      case 'dribbling': return Zap;
      case 'physical': return Shield;
      default: return Star;
    }
  };

  const getSkillName = (skill: string) => {
    const names: { [key: string]: string } = {
      pace: 'Скорость',
      shooting: 'Удары',
      passing: 'Передачи',
      defending: 'Защита',
      dribbling: 'Дриблинг',
      physical: 'Физика'
    };
    return names[skill] || skill;
  };

  return (
    <section id="players" className="players">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Топ игроки</span>
          </h2>
          <p>
            Лучшие футболисты мира с выдающимися достижениями и навыками
          </p>
        </div>

        {/* Position Filter */}
        <div className="players-filters">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() => setFilterPosition(position)}
              className={`filter-btn ${filterPosition === position ? 'active' : ''}`}
            >
              {position === 'all' ? 'Все позиции' : position}
            </button>
          ))}
        </div>

        <div className="players-grid">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="card player-card"
              onClick={() => setSelectedPlayer(player)}
            >
              {/* Player Photo */}
              <div className="player-photo">
                <img
                  src={player.photo}
                  alt={player.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150x150/333333/FFFFFF?text=' + player.name.charAt(0);
                  }}
                />
                <div className="player-rating">{player.rating}</div>
              </div>

              {/* Player Info */}
              <div className="player-name">{player.name}</div>
              <div className="player-position">{player.position}</div>
              <div className="player-team">
                <img
                  src={player.teamLogo}
                  alt={player.team}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span>{player.team}</span>
              </div>
              <div className="player-info">{player.nationality} • {player.age} лет</div>

              {/* Stats */}
              <div className="player-stats">
                <div className="player-stat">
                  <div className="player-stat-value" style={{ color: 'var(--football-green)' }}>{player.goals}</div>
                  <div className="player-stat-label">Голы</div>
                </div>
                <div className="player-stat">
                  <div className="player-stat-value" style={{ color: 'var(--primary-blue)' }}>{player.assists}</div>
                  <div className="player-stat-label">Ассисты</div>
                </div>
                <div className="player-stat">
                  <div className="player-stat-value" style={{ color: 'var(--football-gold)' }}>{player.trophies}</div>
                  <div className="player-stat-label">Трофеи</div>
                </div>
              </div>

              {/* Top Skills */}
              <div className="player-skills">
                {Object.entries(player.skills)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([skill, value]) => {
                    const Icon = getSkillIcon(skill);
                    return (
                      <div key={skill} className="player-skill">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon size={16} className="player-skill-icon" />
                          <span className="player-skill-name">{getSkillName(skill)}</span>
                        </div>
                        <div className="player-skill-value">{value}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Player Detail Modal */}
        {selectedPlayer && (
          <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedPlayer.name}</h3>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={selectedPlayer.photo}
                    alt={selectedPlayer.name}
                    style={{ width: '192px', height: '192px', borderRadius: '50%', margin: '0 auto 16px' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/200x200/333333/FFFFFF?text=' + selectedPlayer.name.charAt(0);
                    }}
                  />
                  <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{selectedPlayer.name}</div>
                  <div style={{ color: 'var(--football-green)', fontWeight: '600', marginBottom: '8px' }}>{selectedPlayer.position}</div>
                  <div style={{ color: 'var(--gray-300)', marginBottom: '8px' }}>{selectedPlayer.team}</div>
                  <div style={{ color: 'var(--gray-400)' }}>{selectedPlayer.nationality} • {selectedPlayer.age} лет</div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Статистика</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={{ background: 'var(--gray-800)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--football-green)', marginBottom: '4px' }}>{selectedPlayer.goals}</div>
                        <div style={{ color: 'var(--gray-400)' }}>Голы</div>
                      </div>
                      <div style={{ background: 'var(--gray-800)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '4px' }}>{selectedPlayer.assists}</div>
                        <div style={{ color: 'var(--gray-400)' }}>Ассисты</div>
                      </div>
                      <div style={{ background: 'var(--gray-800)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--football-gold)', marginBottom: '4px' }}>{selectedPlayer.trophies}</div>
                        <div style={{ color: 'var(--gray-400)' }}>Трофеи</div>
                      </div>
                      <div style={{ background: 'var(--gray-800)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '4px' }}>{selectedPlayer.matches}</div>
                        <div style={{ color: 'var(--gray-400)' }}>Матчи</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Навыки</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {Object.entries(selectedPlayer.skills).map(([skill, value]) => {
                        const Icon = getSkillIcon(skill);
                        return (
                          <div key={skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <Icon size={20} style={{ color: 'var(--gray-400)' }} />
                              <span style={{ color: 'var(--gray-300)' }}>{getSkillName(skill)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '128px', background: 'var(--gray-700)', borderRadius: '4px', height: '8px' }}>
                                <div
                                  style={{
                                    background: 'var(--football-green)',
                                    height: '8px',
                                    borderRadius: '4px',
                                    width: `${value}%`,
                                    transition: 'width 0.5s ease'
                                  }}
                                />
                              </div>
                              <span style={{ fontSize: '14px', fontWeight: '700', width: '32px' }}>{value}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Players;