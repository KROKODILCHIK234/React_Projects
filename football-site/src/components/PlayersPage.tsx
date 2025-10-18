import React, { useState, useEffect } from 'react';
import { Search, User, Shirt, Flag, Goal, Zap, Star, AlertCircle, Eye, Filter } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { usePlayers, useLeagues } from '../hooks/useFootballData';
import { Player } from '../types/Player';

const PlayersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // 🔧 Временно используем прямые вызовы API вместо хуков
  const [allPlayers, setAllPlayers] = useState<any[]>([]);
  const [leaguesData, setLeaguesData] = useState<any[]>([]);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(true);
  const [playersError, setPlayersError] = useState<string | null>(null);
  const [leaguesError, setLeaguesError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // 🔄 Загружаем данные напрямую
  useEffect(() => {
    if (dataLoaded) return; // Предотвращаем двойную загрузку
    
    const loadData = async () => {
      try {
        console.log('🔄 Загружаем данные напрямую...');
        
        // Импортируем API функции
        const { getAllPlayers, getLeagues } = await import('../services/footballApi');
        
        console.log('📊 Вызываем getAllPlayers...');
        const players = await getAllPlayers();
        console.log('✅ Получили игроков:', players.length);
        setAllPlayers(players);
        setPlayersLoading(false);
        
        console.log('📊 Вызываем getLeagues...');
        const leagues = await getLeagues();
        console.log('✅ Получили лиги:', leagues.length);
        console.log('✅ Названия лиг:', leagues.map(l => l.name));
        setLeaguesData(leagues);
        setLeaguesLoading(false);
        
        setDataLoaded(true);
        
      } catch (error) {
        console.error('❌ Ошибка загрузки данных:', error);
        setPlayersError(error instanceof Error ? error.message : 'Ошибка загрузки');
        setLeaguesError(error instanceof Error ? error.message : 'Ошибка загрузки');
        setPlayersLoading(false);
        setLeaguesLoading(false);
        setDataLoaded(true);
      }
    };

    loadData();
  }, [dataLoaded]);

  // 🔍 Отладочная информация
  console.log('🔍 PlayersPage - allPlayers:', allPlayers.length);
  console.log('🔍 PlayersPage - leaguesData:', leaguesData.length);
  console.log('🔍 PlayersPage - leaguesData names:', leaguesData.map(l => l.name));
  console.log('🔍 PlayersPage - loading:', playersLoading);
  console.log('🔍 PlayersPage - error:', playersError);

  // Только базовые позиции
  const basicPositions = ['GK', 'CB', 'RB', 'LB', 'CM', 'CAM', 'LW', 'ST', 'RW'];
  
  // Оставляем только топ-5 европейских лиг
  const availableLeagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];
  const availablePositions = ['all', ...basicPositions];

  const filteredPlayers = allPlayers.filter(player => {
    // Проверяем лигу по названию из фиксированного списка
    const leagueMatch = selectedLeague === 'all' || 
      player.league === selectedLeague || 
      (leaguesData.find(league => league.id === player.league)?.name === selectedLeague);
    
    return leagueMatch &&
      (selectedPosition === 'all' || player.position === selectedPosition) &&
      (player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
       player.nationality.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedPosition === 'all' || basicPositions.includes(player.position));
  });

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return '#3b82f6'; // Blue - Вратарь
      case 'CB': return '#10b981'; // Green - Центральный защитник
      case 'RB': return '#6366f1'; // Indigo - Правый защитник
      case 'LB': return '#6366f1'; // Indigo - Левый защитник
      case 'CM': return '#06b6d4'; // Cyan - Центральный полузащитник
      case 'CAM': return '#8b5cf6'; // Purple - Центральный атакующий полузащитник
      case 'LW': return '#f59e0b'; // Orange - Левый вингер
      case 'ST': return '#ef4444'; // Red - Нападающий
      case 'RW': return '#f59e0b'; // Orange - Правый вингер
      default: return '#64748b'; // Gray
    }
  };

  const getPositionName = (position: string) => {
    const positions: { [key: string]: string } = {
      'GK': 'Вратарь',
      'CB': 'Центральный защитник',
      'RB': 'Правый защитник',
      'LB': 'Левый защитник',
      'CM': 'Центральный полузащитник',
      'CAM': 'Центральный атакующий полузащитник',
      'LW': 'Левый вингер',
      'ST': 'Нападающий',
      'RW': 'Правый вингер'
    };
    return positions[position] || position;
  };

  if (playersLoading || leaguesLoading) {
    return (
      <div className="players-page">
        <div className="container">
          <div className="loading-container">
            <Star size={48} className="loading-spinner" />
            <p>Загрузка игроков...</p>
          </div>
        </div>
      </div>
    );
  }

  if (playersError || leaguesError) {
    return (
      <div className="players-page">
        <div className="container">
          <div className="error-message">
            <AlertCircle size={24} />
            <p>{playersError || leaguesError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="players-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1>
              <span className="gradient-text">Игроки</span>
            </h1>
            <p>Исследуйте лучших футболистов мира с выдающимися достижениями и навыками</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="stats-row">
            <div className="stat-item">
              <User size={32} />
              <div>
                <span className="stat-number">{allPlayers.length}+</span>
                <span className="stat-label">Всего игроков</span>
              </div>
            </div>
            <div className="stat-item">
              <Shirt size={32} />
              <div>
                <span className="stat-number">{leaguesData.length}</span>
                <span className="stat-label">Лиг</span>
              </div>
            </div>
            <div className="stat-item">
              <Star size={32} />
              <div>
                <span className="stat-number">{filteredPlayers.length}</span>
                <span className="stat-label">Найдено</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="search-filters">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Поиск игрока по имени, команде или национальности..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Лига:</label>
            <div className="filter-buttons">
              {availableLeagues.map(league => (
                <button
                  key={league}
                  onClick={() => setSelectedLeague(league)}
                  className={`filter-btn ${selectedLeague === league ? 'active' : ''}`}
                >
                  {league === 'all' ? 'Все лиги' : league}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Позиция:</label>
            <div className="filter-buttons">
              {availablePositions.map(position => (
                <button
                  key={position}
                  onClick={() => setSelectedPosition(position)}
                  className={`filter-btn ${selectedPosition === position ? 'active' : ''}`}
                >
                  {position === 'all' ? 'Все позиции' : getPositionName(position)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="players-grid">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, index) => (
              <ScrollAnimation key={player.id} animation="scaleIn" delay={index * 100}>
                <div className="player-card" onClick={() => setSelectedPlayer(player)}>
                  <div className="player-card-header">
                    <img 
                      src={player.photo} 
                      alt={player.name} 
                      className="player-photo"
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement; 
                        const firstChar = player.name.charAt(0).toUpperCase();
                        target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="200" fill="#8b5cf6"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="60" fill="white" text-anchor="middle" dy=".3em">${firstChar}</text>
                          </svg>
                        `)}`; 
                      }} 
                    />
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
                      <img 
                        src={player.teamLogo} 
                        alt={player.team} 
                        className="team-logo-small"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <span>{player.team}</span>
                    </div>
                    
                    <div className="player-info">
                      <div className="info-item">
                        <Flag size={14} />
                        <span>{player.nationality} {player.nationalityFlag}</span>
                      </div>
                      <div className="info-item">
                        <Shirt size={14} />
                        <span>{getPositionName(player.position)}</span>
                      </div>
                    </div>
                    
                    <div className="player-stats-row">
                      <div className="player-stat-item">
                        <Goal size={16} />
                        <span>{player.goals} Голов</span>
                      </div>
                      <div className="player-stat-item">
                        <Zap size={16} />
                        <span>{player.assists} Ассистов</span>
                      </div>
                    </div>
                    
                    <div className="player-rating">
                      <div className="rating-label">Рейтинг</div>
                      <div className="rating-value">{player.rating}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))
          ) : (
            <div className="no-results">
              <Search size={48} />
              <h3>Игроки не найдены</h3>
              <p>Попробуйте изменить критерии поиска или фильтры.</p>
            </div>
          )}
        </div>

        {/* Модальное окно с детальной информацией об игроке */}
        {selectedPlayer && (
          <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
            <div className="player-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedPlayer.name}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedPlayer(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="player-detail-header">
                  <img 
                    src={selectedPlayer.photo} 
                    alt={selectedPlayer.name} 
                    className="player-detail-photo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const firstChar = selectedPlayer.name.charAt(0).toUpperCase();
                      target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                          <rect width="300" height="300" fill="#8b5cf6"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="80" fill="white" text-anchor="middle" dy=".3em">${firstChar}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="player-detail-info">
                    <div className="player-detail-team">
                      <img 
                        src={selectedPlayer.teamLogo} 
                        alt={selectedPlayer.team} 
                        className="team-logo-detail"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <span>{selectedPlayer.team}</span>
                    </div>
                    <div className="player-detail-position">
                      <span
                        className="position-badge-large"
                        style={{ backgroundColor: getPositionColor(selectedPlayer.position) }}
                      >
                        {getPositionName(selectedPlayer.position)}
                      </span>
                    </div>
                    <div className="player-detail-nationality">
                      <Flag size={16} />
                      <span>{selectedPlayer.nationality} {selectedPlayer.nationalityFlag}</span>
                    </div>
                  </div>
                </div>
                
                <div className="player-detail-stats">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Goal size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedPlayer.goals}</div>
                        <div className="stat-label">Голы</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Zap size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedPlayer.assists}</div>
                        <div className="stat-label">Ассисты</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Shirt size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedPlayer.matches}</div>
                        <div className="stat-label">Матчи</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Star size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedPlayer.rating}</div>
                        <div className="stat-label">Рейтинг</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="player-description">
                    <p>{selectedPlayer.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;