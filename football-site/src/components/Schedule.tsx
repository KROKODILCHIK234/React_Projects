import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

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

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');

  const matches: Match[] = [
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
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png',
      awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png',
      date: '2024-01-15',
      time: '21:00',
      venue: 'Santiago Bernabéu',
      league: 'La Liga',
      status: 'live',
      homeScore: 2,
      awayScore: 1,
      minute: 67
    },
    {
      id: '3',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png',
      awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Borussia-Dortmund-Logo.png',
      date: '2024-01-14',
      time: '18:30',
      venue: 'Allianz Arena',
      league: 'Bundesliga',
      status: 'finished',
      homeScore: 3,
      awayScore: 0
    },
    {
      id: '4',
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Paris-Saint-Germain-Logo.png',
      awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Olympique-Marseille-Logo.png',
      date: '2024-01-16',
      time: '20:45',
      venue: 'Parc des Princes',
      league: 'Ligue 1',
      status: 'upcoming'
    },
    {
      id: '5',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      homeLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Juventus-Logo.png',
      awayLogo: 'https://logos-world.net/wp-content/uploads/2020/06/AC-Milan-Logo.png',
      date: '2024-01-17',
      time: '19:00',
      venue: 'Allianz Stadium',
      league: 'Serie A',
      status: 'upcoming'
    }
  ];

  const leagues = ['all', 'Premier League', 'La Liga', 'Bundesliga', 'Ligue 1', 'Serie A'];
  const dates = [
    { id: 'yesterday', label: 'Вчера', date: '2024-01-13' },
    { id: 'today', label: 'Сегодня', date: '2024-01-14' },
    { id: 'tomorrow', label: 'Завтра', date: '2024-01-15' },
    { id: 'week', label: 'Неделя', date: 'week' }
  ];

  const filteredMatches = matches.filter(match => {
    const leagueMatch = selectedLeague === 'all' || match.league === selectedLeague;
    const dateMatch = selectedDate === 'week' || match.date === dates.find(d => d.id === selectedDate)?.date;
    return leagueMatch && dateMatch;
  });

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
    <section id="schedule" className="schedule-section">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="gradient-text">Расписание матчей</span>
          </h2>
          <p>
            Следите за всеми матчами топ-5 лиг в режиме реального времени
          </p>
        </div>

        {/* Filters */}
        <div className="schedule-filters">
          <div className="filters-container">
            <div className="date-filters">
              <h4>Дата:</h4>
              <div className="filter-buttons">
                {dates.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`date-filter ${selectedDate === date.id ? 'active' : ''}`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="league-filters">
              <h4>Лига:</h4>
              <div className="filter-buttons">
                {leagues.map((league) => (
                  <button
                    key={league}
                    onClick={() => setSelectedLeague(league)}
                    className={`league-filter ${selectedLeague === league ? 'active' : ''}`}
                  >
                    {league === 'all' ? 'Все лиги' : league}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Matches List */}
        <div className="matches-list">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <div className="match-league">{match.league}</div>
                  <div 
                    className="match-status"
                    style={{ color: getStatusColor(match.status) }}
                  >
                    {match.status === 'live' && match.minute && (
                      <span className="live-indicator">●</span>
                    )}
                    {getStatusText(match.status)}
                    {match.status === 'live' && match.minute && (
                      <span className="match-minute">{match.minute}'</span>
                    )}
                  </div>
                </div>

                <div className="match-content">
                  <div className="match-teams">
                    <div className="match-team home-team">
                      <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="team-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <span className="team-name">{match.homeTeam}</span>
                    </div>

                    <div className="match-score">
                      {match.status === 'upcoming' ? (
                        <div className="match-time">
                          <Clock size={16} />
                          <span>{match.time}</span>
                        </div>
                      ) : (
                        <div className="score">
                          <span className="score-number">{match.homeScore || 0}</span>
                          <span className="score-separator">:</span>
                          <span className="score-number">{match.awayScore || 0}</span>
                        </div>
                      )}
                    </div>

                    <div className="match-team away-team">
                      <span className="team-name">{match.awayTeam}</span>
                      <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="team-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="match-info">
                    <div className="match-venue">
                      <MapPin size={16} />
                      <span>{match.venue}</span>
                    </div>
                    <div className="match-date">
                      <Calendar size={16} />
                      <span>{new Date(match.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-matches">
              <Users size={48} color="var(--gray-500)" />
              <h3>Нет матчей</h3>
              <p>На выбранную дату матчей не найдено</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
