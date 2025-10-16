import React, { useState } from 'react';
import { Heart, Star, Users, Trophy, MapPin } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
  country: string;
  city: string;
  founded: number;
  trophies: number;
  players: number;
  rating: number;
  isFavorite: boolean;
}

const FavoriteTeamSelector: React.FC = () => {
  const [favoriteTeam, setFavoriteTeam] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const teams: Team[] = [
    {
      id: 'manchester-united',
      name: 'Manchester United',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
      league: 'Premier League',
      country: 'Англия',
      city: 'Манчестер',
      founded: 1878,
      trophies: 20,
      players: 26,
      rating: 8.8,
      isFavorite: false
    },
    {
      id: 'real-madrid',
      name: 'Real Madrid',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      league: 'La Liga',
      country: 'Испания',
      city: 'Мадрид',
      founded: 1902,
      trophies: 35,
      players: 25,
      rating: 9.2,
      isFavorite: false
    },
    {
      id: 'barcelona',
      name: 'Barcelona',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
      league: 'La Liga',
      country: 'Испания',
      city: 'Барселона',
      founded: 1899,
      trophies: 26,
      players: 24,
      rating: 9.0,
      isFavorite: false
    },
    {
      id: 'bayern-munich',
      name: 'Bayern Munich',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png',
      league: 'Bundesliga',
      country: 'Германия',
      city: 'Мюнхен',
      founded: 1900,
      trophies: 32,
      players: 25,
      rating: 9.1,
      isFavorite: false
    },
    {
      id: 'liverpool',
      name: 'Liverpool',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
      league: 'Premier League',
      country: 'Англия',
      city: 'Ливерпуль',
      founded: 1892,
      trophies: 19,
      players: 25,
      rating: 8.9,
      isFavorite: false
    },
    {
      id: 'psg',
      name: 'PSG',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Paris-Saint-Germain-Logo.png',
      league: 'Ligue 1',
      country: 'Франция',
      city: 'Париж',
      founded: 1970,
      trophies: 11,
      players: 24,
      rating: 8.7,
      isFavorite: false
    },
    {
      id: 'juventus',
      name: 'Juventus',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Juventus-Logo.png',
      league: 'Serie A',
      country: 'Италия',
      city: 'Турин',
      founded: 1897,
      trophies: 36,
      players: 25,
      rating: 8.6,
      isFavorite: false
    },
    {
      id: 'ac-milan',
      name: 'AC Milan',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/AC-Milan-Logo.png',
      league: 'Serie A',
      country: 'Италия',
      city: 'Милан',
      founded: 1899,
      trophies: 18,
      players: 24,
      rating: 8.5,
      isFavorite: false
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTeamSelect = (teamId: string) => {
    setFavoriteTeam(teamId);
    // Сохраняем в localStorage
    localStorage.setItem('favoriteTeam', teamId);
  };

  const selectedTeam = teams.find(team => team.id === favoriteTeam);

  return (
    <section className="favorite-team-section">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Выберите любимую команду</span>
          </h2>
          <p>
            Выберите команду, за которой хотите следить, чтобы получать персонализированную информацию
          </p>
        </div>

        {/* Search */}
        <div className="team-search">
          <input
            type="text"
            placeholder="Поиск команды..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Selected Team Display */}
        {selectedTeam && (
          <div className="selected-team">
            <div className="selected-team-header">
              <h3>Ваша любимая команда</h3>
              <button
                onClick={() => setFavoriteTeam(null)}
                className="change-team-btn"
              >
                Изменить
              </button>
            </div>
            <div className="selected-team-card">
              <img
                src={selectedTeam.logo}
                alt={selectedTeam.name}
                className="selected-team-logo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="selected-team-info">
                <h4 className="selected-team-name">{selectedTeam.name}</h4>
                <div className="selected-team-details">
                  <div className="selected-team-league">{selectedTeam.league}</div>
                  <div className="selected-team-location">
                    <MapPin size={16} />
                    <span>{selectedTeam.city}, {selectedTeam.country}</span>
                  </div>
                </div>
                <div className="selected-team-stats">
                  <div className="selected-team-stat">
                    <Trophy size={16} />
                    <span>{selectedTeam.trophies} трофеев</span>
                  </div>
                  <div className="selected-team-stat">
                    <Users size={16} />
                    <span>{selectedTeam.players} игроков</span>
                  </div>
                  <div className="selected-team-stat">
                    <Star size={16} />
                    <span>Рейтинг {selectedTeam.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teams Grid */}
        <div className="teams-grid">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className={`team-card ${favoriteTeam === team.id ? 'selected' : ''}`}
              onClick={() => handleTeamSelect(team.id)}
            >
              <div className="team-card-header">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="team-card-logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <button className="favorite-btn">
                  <Heart 
                    size={20} 
                    fill={favoriteTeam === team.id ? 'var(--football-green)' : 'none'}
                    color={favoriteTeam === team.id ? 'var(--football-green)' : 'var(--gray-400)'}
                  />
                </button>
              </div>

              <div className="team-card-content">
                <h4 className="team-card-name">{team.name}</h4>
                <div className="team-card-league">{team.league}</div>
                <div className="team-card-location">
                  <MapPin size={14} />
                  <span>{team.city}, {team.country}</span>
                </div>
                
                <div className="team-card-stats">
                  <div className="team-card-stat">
                    <Trophy size={14} />
                    <span>{team.trophies}</span>
                  </div>
                  <div className="team-card-stat">
                    <Users size={14} />
                    <span>{team.players}</span>
                  </div>
                  <div className="team-card-stat">
                    <Star size={14} />
                    <span>{team.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="no-teams">
            <Users size={48} color="var(--gray-500)" />
            <h3>Команды не найдены</h3>
            <p>Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoriteTeamSelector;
