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
  const [favoritePlayers, setFavoritePlayers] = useState<string[]>([]);

  // 🔧 Функции для работы с избранными игроками
  const toggleFavorite = (playerId: string) => {
    setFavoritePlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const isFavorite = (playerId: string) => favoritePlayers.includes(playerId);

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
        console.log('✅ Первые 3 игрока:', players.slice(0, 3));
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
  console.log('🔍 PlayersPage - allPlayers sample:', allPlayers.slice(0, 3));
  console.log('🔍 PlayersPage - leaguesData:', leaguesData.length);
  console.log('🔍 PlayersPage - leaguesData names:', leaguesData.map(l => l.name));
  console.log('🔍 PlayersPage - loading:', playersLoading);
  console.log('🔍 PlayersPage - error:', playersError);
  console.log('🔍 PlayersPage - selectedLeague:', selectedLeague);
  console.log('🔍 PlayersPage - selectedPosition:', selectedPosition);

  // Позиции на русском языке для отображения
  const positionTranslations = {
    'Goalkeeper': 'Вратарь',
    'Centre-Back': 'Центральный защитник', 
    'Right-Back': 'Правый защитник',
    'Left-Back': 'Левый защитник',
    'Defensive Midfield': 'Центральный полузащитник',
    'Attacking Midfield': 'Центральный атакующий полузащитник',
    'Left Winger': 'Левый вингер',
    'Centre-Forward': 'Нападающий',
    'Right Winger': 'Правый вингер'
  };
  
  // Оставляем только топ-5 европейских лиг
  const availableLeagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];
  const availablePositions = ['all', ...Object.values(positionTranslations)];

  const filteredPlayers = allPlayers.filter(player => {
    // Проверяем лигу по названию из фиксированного списка
    const leagueMatch = selectedLeague === 'all' || 
      player.league === selectedLeague;
    
    // Проверяем позицию с учетом переводов
    const positionMatch = selectedPosition === 'all' || 
      positionTranslations[player.position as keyof typeof positionTranslations] === selectedPosition;
    
    const searchMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    return leagueMatch && positionMatch && searchMatch;
  });


  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Goalkeeper': return '#3b82f6'; // Blue - Вратарь
      case 'Centre-Back': return '#10b981'; // Green - Центральный защитник
      case 'Right-Back': return '#6366f1'; // Indigo - Правый защитник
      case 'Left-Back': return '#6366f1'; // Indigo - Левый защитник
      case 'Defensive Midfield': return '#06b6d4'; // Cyan - Центральный полузащитник
      case 'Attacking Midfield': return '#8b5cf6'; // Purple - Центральный атакующий полузащитник
      case 'Left Winger': return '#f59e0b'; // Orange - Левый вингер
      case 'Centre-Forward': return '#ef4444'; // Red - Нападающий
      case 'Right Winger': return '#f59e0b'; // Orange - Правый вингер
      default: return '#64748b'; // Gray
    }
  };

  const getPositionName = (position: string) => {
    return positionTranslations[position as keyof typeof positionTranslations] || position;
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

    <div style={{ padding: '20px' }}>
      <h2>Игроки Premier League ({filteredPlayers.length})</h2>
      
      {filteredPlayers.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '15px',
          marginTop: '20px'
        }}>
          {filteredPlayers.map((player, index) => (
            <div 
              key={player.id} 
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onClick={() => setSelectedPlayer(player)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img 
                  src={player.photo} 
                  alt={player.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '12px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const firstChar = player.name.charAt(0).toUpperCase();
                    target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                        <rect width="50" height="50" fill="#8b5cf6"/>
                        <text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">${firstChar}</text>
                      </svg>
                    `)}`;
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {player.name}
                  </h3>
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                    {player.team}
                  </p>
                </div>
                <button 
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '50%',
                    color: isFavorite(player.id) ? '#fbbf24' : '#d1d5db'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(player.id);
                  }}
                >
                  <Star size={20} fill={isFavorite(player.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{
                  background: getPositionColor(player.position),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getPositionName(player.position)}
                </span>
                <span style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {player.overall} OVR
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b7280' }}>
                <span>🏴 {player.nationality}</span>
                <span>👤 {player.age} лет</span>
                <span># {player.shirtNumber || 'N/A'}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '10px',
                padding: '8px',
                background: '#f9fafb',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                <span>⚽ {player.goals} Голов</span>
                <span>🎯 {player.assists} Ассистов</span>
                <span>🏆 {player.matches} Матчей</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#6b7280'
        }}>
          <Search size={48} style={{ marginBottom: '16px' }} />
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