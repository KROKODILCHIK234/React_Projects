import React, { useState, useEffect } from 'react';
import { Heart, Users, Star, Calendar, Clock } from 'lucide-react';

interface FavoriteTeam {
  id: string;
  name: string;
  logo: string;
  league: string;
}

interface FavoritePlayer {
  id: string;
  name: string;
  photo: string;
  team: string;
  teamLogo: string;
  position: string;
  rating: number;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
}

const FavoritesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'player'>('team');
  const [favoriteTeam, setFavoriteTeam] = useState<FavoriteTeam | null>(null);
  const [favoritePlayer, setFavoritePlayer] = useState<FavoritePlayer | null>(null);
  const [teamMatches, setTeamMatches] = useState<Match[]>([]);

  // Загружаем избранную команду из localStorage
  useEffect(() => {
    const savedTeam = localStorage.getItem('favoriteTeam');
    if (savedTeam) {
      // Здесь должна быть логика загрузки данных команды
      // Пока используем заглушку
      setFavoriteTeam({
        id: savedTeam,
        name: 'Manchester United',
        logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
        league: 'Premier League'
      });
    }
  }, []);

  // Загружаем избранного игрока из localStorage
  useEffect(() => {
    const savedPlayer = localStorage.getItem('favoritePlayer');
    if (savedPlayer) {
      // Здесь должна быть логика загрузки данных игрока
      // Пока используем заглушку
      setFavoritePlayer({
        id: savedPlayer,
        name: 'Криштиану Роналду',
        photo: 'https://img.a.transfermarkt.technology/portrait/header/8198-1671435885.jpg',
        team: 'Al Nassr',
        teamLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Al-Nassr-Logo.png',
        position: 'ST',
        rating: 9.2
      });
    }
  }, []);

  // Загружаем матчи команды
  useEffect(() => {
    if (favoriteTeam) {
      // Здесь должна быть логика загрузки матчей команды
      // Пока используем заглушку
      setTeamMatches([
        {
          id: '1',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
          awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png',
          date: '2024-01-15',
          time: '17:30',
          venue: 'Old Trafford',
          league: 'Premier League',
          status: 'upcoming'
        },
        {
          id: '2',
          homeTeam: 'Arsenal',
          awayTeam: 'Manchester United',
          homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png',
          awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png',
          date: '2024-01-20',
          time: '16:00',
          venue: 'Emirates Stadium',
          league: 'Premier League',
          status: 'upcoming'
        }
      ]);
    }
  }, [favoriteTeam]);

  const handleTeamSelect = (team: FavoriteTeam) => {
    setFavoriteTeam(team);
    localStorage.setItem('favoriteTeam', team.id);
  };

  const handlePlayerSelect = (player: FavoritePlayer) => {
    setFavoritePlayer(player);
    localStorage.setItem('favoritePlayer', player.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'var(--football-green)';
      case 'finished': return 'var(--gray-400)';
      case 'upcoming': return 'var(--primary-blue)';
      default: return 'var(--gray-400)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'finished': return 'FT';
      case 'upcoming': return 'Upcoming';
      default: return status;
    }
  };

  return (
    <section id="favorites" className="favorites-section">
      <div className="favorites-header">
        <h2>
          <span className="gradient-text">Избранное</span>
        </h2>
        <div className="favorites-tabs">
          <button
            onClick={() => setActiveTab('team')}
            className={`favorites-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          >
            <Users size={16} />
            Команда
          </button>
          <button
            onClick={() => setActiveTab('player')}
            className={`favorites-tab-btn ${activeTab === 'player' ? 'active' : ''}`}
          >
            <Star size={16} />
            Игрок
          </button>
        </div>
      </div>

      {activeTab === 'team' && (
        <div className="favorite-team-section">
          {favoriteTeam ? (
            <div className="selected-favorite-team">
              <div className="favorite-team-info">
                <img
                  src={favoriteTeam.logo}
                  alt={favoriteTeam.name}
                  className="favorite-team-logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="favorite-team-details">
                  <h3>{favoriteTeam.name}</h3>
                  <p>{favoriteTeam.league}</p>
                </div>
                <button
                  onClick={() => setFavoriteTeam(null)}
                  className="remove-favorite-btn"
                >
                  <Heart size={16} fill="var(--football-green)" color="var(--football-green)" />
                </button>
              </div>

              {/* Team Matches */}
              <div className="team-matches">
                <h4>Матчи команды</h4>
                <div className="matches-list-small">
                  {teamMatches.map((match) => (
                    <div key={match.id} className="match-card-small">
                      <div className="match-teams-small">
                        <div className="team-small">
                          <img
                            src={match.homeLogo}
                            alt={match.homeTeam}
                            className="team-logo-small"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <span className="team-name-small">{match.homeTeam}</span>
                        </div>
                        
                        <div className="match-score-small">
                          {match.status === 'upcoming' ? (
                            <div className="match-time-small">
                              <Clock size={12} />
                              <span>{match.time}</span>
                            </div>
                          ) : (
                            <div className="score-small">
                              <span>{match.homeScore || 0}</span>
                              <span>:</span>
                              <span>{match.awayScore || 0}</span>
                            </div>
                          )}
                        </div>

                        <div className="team-small">
                          <span className="team-name-small">{match.awayTeam}</span>
                          <img
                            src={match.awayLogo}
                            alt={match.awayTeam}
                            className="team-logo-small"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="match-info-small">
                        <div className="match-status-small" style={{ color: getStatusColor(match.status) }}>
                          {getStatusText(match.status)}
                        </div>
                        <div className="match-date-small">
                          <Calendar size={12} />
                          <span>{new Date(match.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-favorite-team">
              <Users size={48} color="var(--gray-500)" />
              <h3>Выберите любимую команду</h3>
              <p>Выберите команду, за которой хотите следить</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'player' && (
        <div className="favorite-player-section">
          {favoritePlayer ? (
            <div className="selected-favorite-player">
              <div className="favorite-player-info">
                <img
                  src={favoritePlayer.photo}
                  alt={favoritePlayer.name}
                  className="favorite-player-photo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/80x80/333333/FFFFFF?text=' + favoritePlayer.name.charAt(0);
                  }}
                />
                <div className="favorite-player-details">
                  <h3>{favoritePlayer.name}</h3>
                  <p>{favoritePlayer.position} • {favoritePlayer.team}</p>
                  <div className="player-rating-small">
                    <Star size={14} fill="var(--football-gold)" color="var(--football-gold)" />
                    <span>{favoritePlayer.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => setFavoritePlayer(null)}
                  className="remove-favorite-btn"
                >
                  <Heart size={16} fill="var(--football-green)" color="var(--football-green)" />
                </button>
              </div>

              {/* Player Stats */}
              <div className="player-stats-small">
                <h4>Статистика игрока</h4>
                <div className="stats-grid-small">
                  <div className="stat-item-small">
                    <div className="stat-value-small">15</div>
                    <div className="stat-label-small">Голы</div>
                  </div>
                  <div className="stat-item-small">
                    <div className="stat-value-small">8</div>
                    <div className="stat-label-small">Ассисты</div>
                  </div>
                  <div className="stat-item-small">
                    <div className="stat-value-small">20</div>
                    <div className="stat-label-small">Матчи</div>
                  </div>
                  <div className="stat-item-small">
                    <div className="stat-value-small">7.8</div>
                    <div className="stat-label-small">Рейтинг</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-favorite-player">
              <Star size={48} color="var(--gray-500)" />
              <h3>Выберите любимого игрока</h3>
              <p>Выберите игрока, за которым хотите следить</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default FavoritesTab;
