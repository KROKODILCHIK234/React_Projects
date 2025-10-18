import React, { useState, useEffect } from 'react';
import { Search, Heart, Users, Star, X, MapPin } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { getAllTeams, getAllPlayers } from '../services/footballApi';

interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
  country: string;
  stadium: string;
  coach: string;
  playersCount: number;
  titles: number;
  description: string;
}

interface Player {
  id: string;
  name: string;
  photo: string;
  team: string;
  teamLogo: string;
  league: string;
  nationality: string;
  nationalityFlag: string;
  position: string;
  overall: number;
  rating: number;
  goals: number;
  assists: number;
  matches: number;
  description: string;
}

// Тестовые данные удалены - используем API

// Тестовые данные игроков удалены - используем API

const FavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'players'>('teams');
  const [searchTermTeam, setSearchTermTeam] = useState<string>('');
  const [searchTermPlayer, setSearchTermPlayer] = useState<string>('');
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteTeams');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>(() => {
    const savedFavorites = localStorage.getItem('favoritePlayers');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Загружаем данные из API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [teams, players] = await Promise.all([
          getAllTeams(),
          getAllPlayers()
        ]);
        setAllTeams(teams);
        setAllPlayers(players);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteTeams', JSON.stringify(favoriteTeams));
    if (favoriteTeams.length > 0) {
      localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeams[0]));
    } else {
      localStorage.removeItem('favoriteTeam');
    }
    window.dispatchEvent(new Event('storage'));
  }, [favoriteTeams]);

  useEffect(() => {
    localStorage.setItem('favoritePlayers', JSON.stringify(favoritePlayers));
    window.dispatchEvent(new Event('storage'));
  }, [favoritePlayers]);

  const filteredAvailableTeams = allTeams.filter(team =>
    !favoriteTeams.some(fav => fav.id === team.id) &&
    (team.name.toLowerCase().includes(searchTermTeam.toLowerCase()) ||
      team.league.toLowerCase().includes(searchTermTeam.toLowerCase()) ||
      team.country.toLowerCase().includes(searchTermTeam.toLowerCase()))
  );

  const filteredAvailablePlayers = allPlayers.filter(player =>
    !favoritePlayers.some(fav => fav.id === player.id) &&
    (player.name.toLowerCase().includes(searchTermPlayer.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTermPlayer.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTermPlayer.toLowerCase()))
  );

  const handleAddFavoriteTeam = (team: Team) => {
    setFavoriteTeams(prevFavorites => [...prevFavorites, team]);
    setSearchTermTeam('');
  };

  const handleRemoveFavoriteTeam = (teamId: string) => {
    setFavoriteTeams(prevFavorites => prevFavorites.filter(team => team.id !== teamId));
  };

  const handleAddFavoritePlayer = (player: Player) => {
    setFavoritePlayers(prevFavorites => [...prevFavorites, player]);
    setSearchTermPlayer('');
  };

  const handleRemoveFavoritePlayer = (playerId: string) => {
    setFavoritePlayers(prevFavorites => prevFavorites.filter(player => player.id !== playerId));
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'ST': return '#ef4444'; // Red
      case 'RW':
      case 'LW': return '#f59e0b'; // Orange
      case 'CAM':
      case 'CM':
      case 'CDM': return '#8b5cf6'; // Purple
      case 'CB':
      case 'LB':
      case 'RB': return '#10b981'; // Green
      case 'GK': return '#3b82f6'; // Blue
      default: return '#64748b'; // Gray
    }
  };

  if (loading) {
    return (
      <section className="favorites-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Загружаем данные...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1><span className="gradient-text">Избранное</span></h1>
            <p>Управляйте вашими любимыми командами и игроками</p>
          </div>
        </ScrollAnimation>

        <div className="favorites-tabs">
          <button
            className={`favorites-tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            <Users size={20} />
            <span>Команды</span>
          </button>
          <button
            className={`favorites-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            <Star size={20} />
            <span>Игроки</span>
          </button>
        </div>

        {activeTab === 'teams' && (
          <div className="favorite-section-content">
            <h3>Мои избранные команды</h3>
            {favoriteTeams.length > 0 ? (
              <div className="teams-grid">
                {favoriteTeams.map((team, index) => (
                  <ScrollAnimation key={team.id} animation="scaleIn" delay={index * 100}>
                    <div className="team-card">
                      <div className="team-card-header">
                        <img src={team.logo} alt={team.name} className="team-logo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="team-badge">
                          <span className="team-league">{team.league}</span>
                        </div>
                      </div>
                      <div className="team-card-content">
                        <h3 className="team-name">{team.name}</h3>
                        <div className="team-location">
                          <MapPin size={16} />
                          <span>{team.country}</span>
                        </div>
                        <button className="add-to-favorites-btn remove" onClick={() => handleRemoveFavoriteTeam(team.id)}>
                          <X size={20} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>У вас пока нет избранных команд.</p>
              </div>
            )}

            <h3>Добавить команду в избранное</h3>
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск команды по названию, лиге или стране..."
                className="search-input"
                value={searchTermTeam}
                onChange={(e) => setSearchTermTeam(e.target.value)}
              />
            </div>
            <div className="teams-grid">
              {filteredAvailableTeams.length > 0 ? (
                filteredAvailableTeams.map((team, index) => (
                  <ScrollAnimation key={team.id} animation="scaleIn" delay={index * 100}>
                    <div className="team-card">
                      <div className="team-card-header">
                        <img src={team.logo} alt={team.name} className="team-logo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="team-badge">
                          <span className="team-league">{team.league}</span>
                        </div>
                      </div>
                      <div className="team-card-content">
                        <h3 className="team-name">{team.name}</h3>
                        <div className="team-location">
                          <MapPin size={16} />
                          <span>{team.country}</span>
                        </div>
                        <button className="add-to-favorites-btn" onClick={() => handleAddFavoriteTeam(team)}>
                          <Heart size={20} />
                          Добавить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))
              ) : (
                <div className="no-results">
                  <p>Команды не найдены или уже добавлены в избранное.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="favorite-section-content">
            <h3>Мои избранные игроки</h3>
            {favoritePlayers.length > 0 ? (
              <div className="players-grid">
                {favoritePlayers.map((player, index) => (
                  <ScrollAnimation key={player.id} animation="scaleIn" delay={index * 100}>
                    <div className="player-card">
                      <div className="player-card-header">
                        <img src={player.photo} alt={player.name} className="player-photo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="player-badges">
                          <span 
                            className="position-badge"
                            style={{ backgroundColor: getPositionColor(player.position) }}
                          >
                            {player.position}
                          </span>
                          <span className="rating-badge">
                            <Star size={14} /> {player.overall} OVR
                          </span>
                        </div>
                      </div>
                      <div className="player-card-content">
                        <h3 className="player-name">{player.name}</h3>
                        <div className="player-team">
                          <img src={player.teamLogo} alt={player.team} className="team-logo-small" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                          <span>{player.team}</span>
                        </div>
                        <button className="add-to-favorites-btn remove" onClick={() => handleRemoveFavoritePlayer(player.id)}>
                          <X size={20} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>У вас пока нет избранных игроков.</p>
              </div>
            )}

            <h3>Добавить игрока в избранное</h3>
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск игрока по имени, команде или позиции..."
                className="search-input"
                value={searchTermPlayer}
                onChange={(e) => setSearchTermPlayer(e.target.value)}
              />
            </div>
            <div className="players-grid">
              {filteredAvailablePlayers.length > 0 ? (
                filteredAvailablePlayers.map((player, index) => (
                  <ScrollAnimation key={player.id} animation="scaleIn" delay={index * 100}>
                    <div className="player-card">
                      <div className="player-card-header">
                        <img src={player.photo} alt={player.name} className="player-photo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="player-badges">
                          <span 
                            className="position-badge"
                            style={{ backgroundColor: getPositionColor(player.position) }}
                          >
                            {player.position}
                          </span>
                          <span className="rating-badge">
                            <Star size={14} /> {player.overall} OVR
                          </span>
                        </div>
                      </div>
                      <div className="player-card-content">
                        <h3 className="player-name">{player.name}</h3>
                        <div className="player-team">
                          <img src={player.teamLogo} alt={player.team} className="team-logo-small" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                          <span>{player.team}</span>
                        </div>
                        <button className="add-to-favorites-btn" onClick={() => handleAddFavoritePlayer(player)}>
                          <Heart size={20} />
                          Добавить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))
              ) : (
                <div className="no-results">
                  <p>Игроки не найдены или уже добавлены в избранное.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;