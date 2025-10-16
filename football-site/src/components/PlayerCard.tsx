import React, { useState } from 'react';
import { Target, Zap, Shield, Award, Heart, Share2 } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  teamLogo: string;
  photo: string;
  age: number;
  nationality: string;
  nationalityFlag: string;
  rating: number;
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  defending: number;
  dribbling: number;
  physical: number;
  goals: number;
  assists: number;
  matches: number;
  trophies: number;
  price: string;
  contract: string;
  isFavorite: boolean;
}

const PlayerCard: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const players: Player[] = [
    {
      id: 1,
      name: 'Криштиану Роналду',
      position: 'ST',
      team: 'Al Nassr',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Al-Nassr-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/8198-1671435885.jpg',
      age: 39,
      nationality: 'Португалия',
      nationalityFlag: '🇵🇹',
      rating: 9.2,
      overall: 91,
      pace: 85,
      shooting: 95,
      passing: 88,
      defending: 35,
      dribbling: 90,
      physical: 88,
      goals: 850,
      assists: 250,
      matches: 1200,
      trophies: 32,
      price: '€15M',
      contract: '2025',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Лионель Месси',
      position: 'RW',
      team: 'Inter Miami',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Inter-Miami-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/28003-1671435885.jpg',
      age: 36,
      nationality: 'Аргентина',
      nationalityFlag: '🇦🇷',
      rating: 9.0,
      overall: 90,
      pace: 80,
      shooting: 92,
      passing: 95,
      defending: 30,
      dribbling: 95,
      physical: 75,
      goals: 800,
      assists: 350,
      matches: 1000,
      trophies: 44,
      price: '€12M',
      contract: '2025',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Килиан Мбаппе',
      position: 'ST',
      team: 'Real Madrid',
      teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      photo: 'https://img.a.transfermarkt.technology/portrait/header/342229-1671435885.jpg',
      age: 25,
      nationality: 'Франция',
      nationalityFlag: '🇫🇷',
      rating: 9.1,
      overall: 91,
      pace: 95,
      shooting: 90,
      passing: 80,
      defending: 35,
      dribbling: 88,
      physical: 85,
      goals: 300,
      assists: 120,
      matches: 400,
      trophies: 15,
      price: '€180M',
      contract: '2029',
      isFavorite: false
    }
  ];

  const getSkillColor = (value: number) => {
    if (value >= 90) return '#00ff88';
    if (value >= 80) return '#3b82f6';
    if (value >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getOverallColor = (overall: number) => {
    if (overall >= 90) return '#00ff88';
    if (overall >= 80) return '#3b82f6';
    if (overall >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <section className="player-card-section">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Карточки игроков FIFA</span>
          </h2>
          <p>
            Детальные карточки игроков в стиле FIFA с полной статистикой
          </p>
        </div>

        <div className="player-cards-grid">
          {players.map((player) => (
            <div
              key={player.id}
              className="fifa-card"
              onClick={() => setSelectedPlayer(player)}
            >
              {/* Card Header */}
              <div className="fifa-card-header">
                <div className="fifa-card-overall">
                  <div 
                    className="overall-number"
                    style={{ backgroundColor: getOverallColor(player.overall) }}
                  >
                    {player.overall}
                  </div>
                </div>
                <div className="fifa-card-position">{player.position}</div>
                <div className="fifa-card-actions">
                  <button 
                    className="fifa-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFavorite(!isFavorite);
                    }}
                  >
                    <Heart 
                      size={16} 
                      fill={isFavorite ? 'var(--football-green)' : 'none'}
                      color={isFavorite ? 'var(--football-green)' : 'white'}
                    />
                  </button>
                  <button className="fifa-action-btn">
                    <Share2 size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Player Photo */}
              <div className="fifa-player-photo">
                <img
                  src={player.photo}
                  alt={player.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/200x200/333333/FFFFFF?text=' + player.name.charAt(0);
                  }}
                />
                <div className="fifa-player-shadow"></div>
              </div>

              {/* Player Info */}
              <div className="fifa-player-info">
                <div className="fifa-player-name">{player.name}</div>
                <div className="fifa-player-details">
                  <div className="fifa-player-age">{player.age} лет</div>
                  <div className="fifa-player-nationality">
                    <span className="nationality-flag">{player.nationalityFlag}</span>
                    <span>{player.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Team Info */}
              <div className="fifa-team-info">
                <img
                  src={player.teamLogo}
                  alt={player.team}
                  className="fifa-team-logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="fifa-team-name">{player.team}</div>
              </div>

              {/* Stats */}
              <div className="fifa-stats">
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Zap size={12} />
                  </div>
                  <div className="stat-value">{player.pace}</div>
                </div>
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Target size={12} />
                  </div>
                  <div className="stat-value">{player.shooting}</div>
                </div>
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Award size={12} />
                  </div>
                  <div className="stat-value">{player.passing}</div>
                </div>
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Shield size={12} />
                  </div>
                  <div className="stat-value">{player.defending}</div>
                </div>
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Zap size={12} />
                  </div>
                  <div className="stat-value">{player.dribbling}</div>
                </div>
                <div className="fifa-stat">
                  <div className="stat-icon">
                    <Shield size={12} />
                  </div>
                  <div className="stat-value">{player.physical}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Player Detail Modal */}
        {selectedPlayer && (
          <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
            <div className="player-detail-modal" onClick={(e) => e.stopPropagation()}>
              <div className="player-detail-header">
                <div className="player-detail-photo">
                  <img
                    src={selectedPlayer.photo}
                    alt={selectedPlayer.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x300/333333/FFFFFF?text=' + selectedPlayer.name.charAt(0);
                    }}
                  />
                  <div className="player-detail-overall">
                    <div 
                      className="detail-overall-number"
                      style={{ backgroundColor: getOverallColor(selectedPlayer.overall) }}
                    >
                      {selectedPlayer.overall}
                    </div>
                    <div className="detail-overall-label">OVERALL</div>
                  </div>
                </div>
                
                <div className="player-detail-info">
                  <h2 className="player-detail-name">{selectedPlayer.name}</h2>
                  <div className="player-detail-position">{selectedPlayer.position}</div>
                  <div className="player-detail-team">
                    <img
                      src={selectedPlayer.teamLogo}
                      alt={selectedPlayer.team}
                      className="detail-team-logo"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <span>{selectedPlayer.team}</span>
                  </div>
                  <div className="player-detail-meta">
                    <div className="detail-meta-item">
                      <span className="meta-label">Возраст:</span>
                      <span className="meta-value">{selectedPlayer.age}</span>
                    </div>
                    <div className="detail-meta-item">
                      <span className="meta-label">Национальность:</span>
                      <span className="meta-value">
                        <span className="nationality-flag">{selectedPlayer.nationalityFlag}</span>
                        {selectedPlayer.nationality}
                      </span>
                    </div>
                    <div className="detail-meta-item">
                      <span className="meta-label">Цена:</span>
                      <span className="meta-value">{selectedPlayer.price}</span>
                    </div>
                    <div className="detail-meta-item">
                      <span className="meta-label">Контракт до:</span>
                      <span className="meta-value">{selectedPlayer.contract}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="player-detail-content">
                <div className="detail-section">
                  <h3>Навыки</h3>
                  <div className="skills-grid">
                    {[
                      { name: 'Скорость', value: selectedPlayer.pace, icon: Zap },
                      { name: 'Удары', value: selectedPlayer.shooting, icon: Target },
                      { name: 'Передачи', value: selectedPlayer.passing, icon: Award },
                      { name: 'Защита', value: selectedPlayer.defending, icon: Shield },
                      { name: 'Дриблинг', value: selectedPlayer.dribbling, icon: Zap },
                      { name: 'Физика', value: selectedPlayer.physical, icon: Shield }
                    ].map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-header">
                          <skill.icon size={16} />
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-value">{skill.value}</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress"
                            style={{ 
                              width: `${skill.value}%`,
                              backgroundColor: getSkillColor(skill.value)
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Статистика</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-number">{selectedPlayer.goals}</div>
                      <div className="stat-label">Голы</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">{selectedPlayer.assists}</div>
                      <div className="stat-label">Ассисты</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">{selectedPlayer.matches}</div>
                      <div className="stat-label">Матчи</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number">{selectedPlayer.trophies}</div>
                      <div className="stat-label">Трофеи</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerCard;
