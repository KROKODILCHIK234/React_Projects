import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Trophy, Star, AlertCircle, Eye, Calendar, Target } from 'lucide-react';                                                                       
import ScrollAnimation from './ScrollAnimation';
import { useTeams, useLeagues } from '../hooks/useFootballData';
import { Team } from '../types/Team';

const TeamsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  // 🔧 Временно используем прямые вызовы API вместо хуков
  const [allTeams, setAllTeams] = useState<any[]>([]);
  const [leaguesData, setLeaguesData] = useState<any[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);
  const [leaguesError, setLeaguesError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // 🔄 Загружаем данные напрямую
  useEffect(() => {
    if (dataLoaded) return; // Предотвращаем двойную загрузку
    
    const loadData = async () => {
      try {
        console.log('🔄 Загружаем данные команд напрямую...');
        
        // Импортируем API функции
        const { getAllTeams, getLeagues } = await import('../services/footballApi');
        
        console.log('📊 Вызываем getAllTeams...');
        const teams = await getAllTeams();
        console.log('✅ Получили команды:', teams.length);
        setAllTeams(teams);
        setTeamsLoading(false);
        
        console.log('📊 Вызываем getLeagues...');
        const leagues = await getLeagues();
        console.log('✅ Получили лиги:', leagues.length);
        setLeaguesData(leagues);
        setLeaguesLoading(false);
        
        setDataLoaded(true);
        
      } catch (error) {
        console.error('❌ Ошибка загрузки данных команд:', error);
        setTeamsError(error instanceof Error ? error.message : 'Ошибка загрузки');
        setLeaguesError(error instanceof Error ? error.message : 'Ошибка загрузки');
        setTeamsLoading(false);
        setLeaguesLoading(false);
        setDataLoaded(true);
      }
    };

    loadData();
  }, [dataLoaded]);

  // 🔍 Отладочная информация
  console.log('🔍 TeamsPage - allTeams:', allTeams.length);
  console.log('🔍 TeamsPage - loading:', teamsLoading);
  console.log('🔍 TeamsPage - error:', teamsError);

  // Только 5 основных лиг
  const mainLeagues = ['pl', 'pd', 'bl1', 'sa', 'fl1'];
  const availableLeagues = ['all', ...mainLeagues];

  const filteredTeams = allTeams.filter(team => 
    (selectedLeague === 'all' || team.league === selectedLeague) &&
    (team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     team.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLeague === 'all' || mainLeagues.includes(team.league))
  );

  const getLeagueFullName = (leagueCode: string) => {
    switch (leagueCode) {
      case 'pl': return 'Premier League';
      case 'pd': return 'La Liga';
      case 'bl1': return 'Bundesliga';
      case 'sa': return 'Serie A';
      case 'fl1': return 'Ligue 1';
      default: return leagueCode;
    }
  };

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'pl':
      case 'Premier League': return '#37003C';
      case 'pd':
      case 'La Liga': return '#FF6900';
      case 'bl1':
      case 'Bundesliga': return '#D20515';
      case 'sa':
      case 'Serie A': return '#0068A8';
      case 'fl1':
      case 'Ligue 1': return '#241F20';
      default: return '#8b5cf6';
    }
  };

  if (teamsLoading || leaguesLoading) {
    return (
      <div className="teams-page">
        <div className="container">
          <div className="loading-container">
            <Star size={48} className="loading-spinner" />
            <p>Загрузка команд...</p>
          </div>
        </div>
      </div>
    );
  }

  if (teamsError || leaguesError) {
    return (
      <div className="teams-page">
        <div className="container">
          <div className="error-message">
            <AlertCircle size={24} />
            <p>{teamsError || leaguesError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teams-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1>
              <span className="gradient-text">Команды</span>
            </h1>
            <p>Исследуйте лучшие футбольные клубы мира с богатой историей и выдающимися достижениями</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="stats-row">
            <div className="stat-item">
              <Users size={32} />
              <div>
                <span className="stat-number">98</span>
                <span className="stat-label">Всего команд</span>
              </div>
            </div>
            <div className="stat-item">
              <Trophy size={32} />
              <div>
                <span className="stat-number">5</span>
                <span className="stat-label">Лиг</span>
              </div>
            </div>
            <div className="stat-item">
              <Star size={32} />
              <div>
                <span className="stat-number">{filteredTeams.length}</span>
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
              placeholder="Поиск команды по названию, стране или городу..."
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
                  {league === 'all' ? 'Все лиги' : getLeagueFullName(league)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="teams-grid">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team, index) => (
              <ScrollAnimation key={team.id} animation="scaleIn" delay={index * 100}>
                <div className="team-card" onClick={() => setSelectedTeam(team)}>
                  <div className="team-card-header">
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="team-logo"
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement; 
                        const firstChar = team.name.charAt(0).toUpperCase();
                        target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                          <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" fill="#10b981"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="30" fill="white" text-anchor="middle" dy=".3em">${firstChar}</text>
                          </svg>
                        `)}`; 
                      }} 
                    />
                    <div className="team-badges">
                      <span 
                        className="league-badge"
                        style={{ backgroundColor: getLeagueColor(team.league) }}
                      >
                        {team.league}
                      </span>
                      {team.position && (
                        <span className="position-badge">
                          #{team.position}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="team-card-content">
                    <h3 className="team-name">{team.name}</h3>
                    
                    <div className="team-info">
                      <div className="info-item">
                        <MapPin size={16} />
                        <span>{team.country}</span>
                      </div>
                      <div className="info-item">
                        <Users size={16} />
                        <span>{team.playersCount} игроков</span>
                      </div>
                      <div className="info-item">
                        <Trophy size={16} />
                        <span>{team.titles} титулов</span>
                      </div>
                    </div>
                    
                    <div className="team-stats">
                      <div className="stat">
                        <span className="stat-label">Основан</span>
                        <span className="stat-value">{team.founded}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Тренер</span>
                        <span className="stat-value">{team.coach}</span>
                      </div>
                    </div>
                    
                    <p className="team-description">{team.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))
          ) : (
            <div className="no-results">
              <Search size={48} />
              <h3>Команды не найдены</h3>
              <p>Попробуйте изменить критерии поиска или фильтры.</p>
            </div>
          )}
        </div>

        {/* Модальное окно с детальной информацией о команде */}
        {selectedTeam && (
          <div className="modal-overlay" onClick={() => setSelectedTeam(null)}>
            <div className="team-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedTeam.name}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedTeam(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="team-detail-header">
                  <img 
                    src={selectedTeam.logo} 
                    alt={selectedTeam.name} 
                    className="team-detail-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const firstChar = selectedTeam.name.charAt(0).toUpperCase();
                      target.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" fill="#10b981"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="60" fill="white" text-anchor="middle" dy=".3em">${firstChar}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="team-detail-info">
                    <div className="team-detail-league">
                      <span
                        className="league-badge-large"
                        style={{ backgroundColor: getLeagueColor(selectedTeam.league) }}
                      >
                        {getLeagueFullName(selectedTeam.league)}
                      </span>
                    </div>
                    <div className="team-detail-location">
                      <MapPin size={16} />
                      <span>{selectedTeam.city}, {selectedTeam.country}</span>
                    </div>
                    <div className="team-detail-stadium">
                      <Calendar size={16} />
                      <span>{selectedTeam.stadium}</span>
                    </div>
                  </div>
                </div>
                
                <div className="team-detail-stats">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Trophy size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedTeam.titles}</div>
                        <div className="stat-label">Титулы</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Users size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedTeam.playersCount}</div>
                        <div className="stat-label">Игроки</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Calendar size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedTeam.founded}</div>
                        <div className="stat-label">Основан</div>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Target size={24} />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{selectedTeam.coach}</div>
                        <div className="stat-label">Тренер</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="team-description">
                    <h3>О команде</h3>
                    <p>{selectedTeam.description}</p>
                  </div>
                  
                  {selectedTeam.position && (
                    <div className="team-position">
                      <h3>Позиция в лиге</h3>
                      <div className="position-info">
                        <span className="position-number">#{selectedTeam.position}</span>
                        <span className="position-points">{selectedTeam.points} очков</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;