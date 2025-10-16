import React, { useState } from 'react';
import { Trophy, Users } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  founded: number;
  teamsCount: number;
  description: string;
}

const leaguesData: League[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'Англия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    founded: 1992,
    teamsCount: 20,
    description: 'Высший дивизион английского футбола',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Испания',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaLiga.svg/1200px-LaLiga.svg.png',
    founded: 1929,
    teamsCount: 20,
    description: 'Высший дивизион испанского футбола',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Германия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
    founded: 1963,
    teamsCount: 18,
    description: 'Высший дивизион немецкого футбола',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Италия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Serie_A_logo_%282019%29.svg/1200px-Serie_A_logo_%282019%29.svg.png',
    founded: 1929,
    teamsCount: 20,
    description: 'Высший дивизион итальянского футбола',
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    country: 'Франция',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
    founded: 1932,
    teamsCount: 20,
    description: 'Высший дивизион французского футбола',
  },
];

const Leagues: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  return (
    <section className="leagues-section">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="section-header">
            <h2>
              <span className="gradient-text">Топ-5 Лиг</span>
            </h2>
            <p>Исследуйте лучшие футбольные лиги мира</p>
          </div>
        </ScrollAnimation>

        <div className="leagues-grid">
          {leaguesData.map((league, index) => (
            <ScrollAnimation key={league.id} animation="scaleIn" delay={index * 100}>
              <div 
                className={`league-card ${selectedLeague?.id === league.id ? 'selected' : ''}`}
                onClick={() => setSelectedLeague(league)}
              >
                <div className="league-card-header">
                  <img
                    src={league.logo}
                    alt={league.name}
                    className="league-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="league-badge">
                    <span className="league-country">{league.country}</span>
                  </div>
                </div>
                
                <div className="league-card-content">
                  <h3 className="league-name">{league.name}</h3>
                  <div className="league-stats">
                    <div className="league-stat">
                      <Users size={14} />
                      <span>{league.teamsCount} Команд</span>
                    </div>
                    <div className="league-stat">
                      <Trophy size={14} />
                      <span>Основана {league.founded}</span>
                    </div>
                  </div>
                  <p className="league-description">{league.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {selectedLeague && (
          <ScrollAnimation animation="fadeInUp">
            <div className="league-details">
              <h3>Информация о {selectedLeague.name}</h3>
              <div className="league-info-grid">
                <div className="info-item">
                  <strong>Страна:</strong> {selectedLeague.country}
                </div>
                <div className="info-item">
                  <strong>Команд:</strong> {selectedLeague.teamsCount}
                </div>
                <div className="info-item">
                  <strong>Основана:</strong> {selectedLeague.founded}
                </div>
                <div className="info-item">
                  <strong>Описание:</strong> {selectedLeague.description}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
};

export default Leagues;