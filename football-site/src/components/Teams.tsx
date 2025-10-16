import React, { useState } from 'react';
import { Trophy, Users, MapPin, Star } from 'lucide-react';

interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
  city: string;
  founded: number;
  trophies: number;
  players: number;
  rating: number;
  colors: string[];
}

const Teams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const teams: Team[] = [
    {
      id: 1,
      name: 'Real Madrid',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      country: 'Испания',
      city: 'Мадрид',
      founded: 1902,
      trophies: 35,
      players: 25,
      rating: 9.2,
      colors: ['#FFFFFF', '#FFD700', '#000000']
    },
    {
      id: 2,
      name: 'Barcelona',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
      country: 'Испания',
      city: 'Барселона',
      founded: 1899,
      trophies: 26,
      players: 24,
      rating: 9.0,
      colors: ['#A50044', '#004D98', '#EDBB00']
    },
    {
      id: 3,
      name: 'Manchester United',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
      country: 'Англия',
      city: 'Манчестер',
      founded: 1878,
      trophies: 20,
      players: 26,
      rating: 8.8,
      colors: ['#DA020E', '#FFE500', '#000000']
    },
    {
      id: 4,
      name: 'Bayern Munich',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png',
      country: 'Германия',
      city: 'Мюнхен',
      founded: 1900,
      trophies: 32,
      players: 25,
      rating: 9.1,
      colors: ['#DC052D', '#FFFFFF', '#0066B2']
    },
    {
      id: 5,
      name: 'Liverpool',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
      country: 'Англия',
      city: 'Ливерпуль',
      founded: 1892,
      trophies: 19,
      players: 25,
      rating: 8.9,
      colors: ['#C8102E', '#F6EB61', '#00A398']
    },
    {
      id: 6,
      name: 'PSG',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Paris-Saint-Germain-Logo.png',
      country: 'Франция',
      city: 'Париж',
      founded: 1970,
      trophies: 11,
      players: 24,
      rating: 8.7,
      colors: ['#004170', '#ED1C24', '#FFFFFF']
    }
  ];

  return (
    <section id="teams" className="teams">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Топ команды</span>
          </h2>
          <p>
            Лучшие футбольные клубы мира с богатой историей и выдающимися достижениями
          </p>
        </div>

        <div className="teams-grid">
          {teams.map((team) => (
            <div
              key={team.id}
              className="card team-card"
              onClick={() => setSelectedTeam(team)}
            >
              {/* Team Logo */}
              <div className="team-logo">
                <img
                  src={team.logo}
                  alt={team.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Team Info */}
              <div className="team-name">{team.name}</div>
              <div className="team-location">
                <MapPin size={16} />
                <span>{team.city}, {team.country}</span>
              </div>
              <div className="team-founded">Основан в {team.founded}</div>

              {/* Stats */}
              <div className="team-stats">
                <div className="team-stat">
                  <div className="team-stat-icon">
                    <Trophy size={16} color="var(--football-green)" />
                  </div>
                  <div className="team-stat-value">{team.trophies}</div>
                  <div className="team-stat-label">Трофеи</div>
                </div>
                <div className="team-stat">
                  <div className="team-stat-icon">
                    <Users size={16} color="var(--primary-blue)" />
                  </div>
                  <div className="team-stat-value">{team.players}</div>
                  <div className="team-stat-label">Игроки</div>
                </div>
                <div className="team-stat">
                  <div className="team-stat-icon">
                    <Star size={16} color="var(--football-gold)" />
                  </div>
                  <div className="team-stat-value">{team.rating}</div>
                  <div className="team-stat-label">Рейтинг</div>
                </div>
              </div>

              {/* Team Colors */}
              <div className="team-colors">
                {team.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="team-color"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team Detail Modal */}
        {selectedTeam && (
          <div className="modal-overlay" onClick={() => setSelectedTeam(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedTeam.name}</h3>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    style={{ width: '128px', height: '128px', margin: '0 auto 16px', display: 'block' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', color: 'var(--gray-300)', marginBottom: '8px' }}>
                      {selectedTeam.city}, {selectedTeam.country}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                      Основан в {selectedTeam.founded}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--gray-400)' }}>Трофеи:</span>
                    <span style={{ fontWeight: '700' }}>{selectedTeam.trophies}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--gray-400)' }}>Игроки:</span>
                    <span style={{ fontWeight: '700' }}>{selectedTeam.players}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--gray-400)' }}>Рейтинг:</span>
                    <span style={{ fontWeight: '700' }}>{selectedTeam.rating}/10</span>
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

export default Teams;