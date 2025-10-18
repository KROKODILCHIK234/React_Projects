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

  // Тестовые данные удалены - используем API
  const teams: Team[] = [];

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
