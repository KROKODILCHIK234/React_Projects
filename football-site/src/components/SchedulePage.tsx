import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  league: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
}

const matchesData: Match[] = [
  {
    id: 'm1', homeTeam: 'Manchester Utd', awayTeam: 'Liverpool', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', league: 'Premier League', date: '2025-01-15', time: '15:00', venue: 'Old Trafford', status: 'upcoming'
  },
  {
    id: 'm2', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', awayLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', league: 'La Liga', date: '2025-01-16', time: '20:00', venue: 'Santiago Bernabéu', status: 'upcoming'
  },
  {
    id: 'm3', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg', awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg', league: 'Bundesliga', date: '2025-01-17', time: '18:30', venue: 'Allianz Arena', status: 'upcoming'
  },
  {
    id: 'm4', homeTeam: 'PSG', awayTeam: 'Marseille', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png', awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png', league: 'Ligue 1', date: '2025-01-18', time: '21:00', venue: 'Parc des Princes', status: 'upcoming'
  },
  {
    id: 'm5', homeTeam: 'Juventus', awayTeam: 'Inter Milan', homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png', awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', league: 'Serie A', date: '2025-01-19', time: '19:45', venue: 'Allianz Stadium', status: 'upcoming'
  },
  {
    id: 'm6', homeTeam: 'Chelsea', awayTeam: 'Arsenal', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png', awayLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', league: 'Premier League', date: '2025-01-20', time: '17:30', venue: 'Stamford Bridge', status: 'upcoming'
  },
  {
    id: 'm7', homeTeam: 'Manchester City', awayTeam: 'Tottenham', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg', awayLogo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', league: 'Premier League', date: '2025-01-21', time: '16:00', venue: 'Etihad Stadium', status: 'upcoming'
  },
  {
    id: 'm8', homeTeam: 'Atlético Madrid', awayTeam: 'Sevilla', homeLogo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png', league: 'La Liga', date: '2025-01-22', time: '19:00', venue: 'Cívitas Metropolitano', status: 'upcoming'
  },
];

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');

  const filteredMatches = matchesData.filter(match => {
    const dateMatch = selectedDate === 'all' || match.date === selectedDate;
    const leagueMatch = selectedLeague === 'all' || match.league === selectedLeague;
    return dateMatch && leagueMatch;
  });

  const leagues = ['all', ...Array.from(new Set(matchesData.map(match => match.league)))];

  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'live': return 'var(--green-bright)';
      case 'upcoming': return 'var(--purple-bright)';
      case 'finished': return 'var(--text-muted)';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusText = (status: Match['status'], minute?: number) => {
    switch (status) {
      case 'live': return `LIVE ${minute}'`;
      case 'upcoming': return 'Предстоящий';
      case 'finished': return 'Завершен';
      default: return status;
    }
  };

  return (
    <div className="schedule-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1>
              <span className="gradient-text">Расписание</span>
            </h1>
            <p>Следите за матчами из топ-5 лиг мира</p>
          </div>
        </ScrollAnimation>

        {/* Filters */}
        <div className="schedule-filters">
          <div className="filter-group">
            <label>Лига:</label>
            <div className="filter-buttons">
              {leagues.map(league => (
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
        </div>

        {/* Matches List */}
        <div className="schedule-matches">
          {filteredMatches.map((match, index) => (
            <ScrollAnimation key={match.id} animation="fadeInUp" delay={index * 100}>
              <div className="match-card">
                <div className="match-header">
                  <div className="match-league">
                    <Star size={16} />
                    <span>{match.league}</span>
                  </div>
                  <div className="match-status" style={{ color: getStatusColor(match.status) }}>
                    {getStatusText(match.status, match.minute)}
                  </div>
                </div>

                <div className="match-teams">
                  <div className="team">
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
                      <span className="score">{match.homeScore} - {match.awayScore}</span>
                    )}
                  </div>

                  <div className="team">
                    <img
                      src={match.awayLogo}
                      alt={match.awayTeam}
                      className="team-logo"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <span className="team-name">{match.awayTeam}</span>
                  </div>
                </div>

                <div className="match-info">
                  <div className="match-date">
                    <Calendar size={14} />
                    <span>{new Date(match.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="match-venue">
                    <MapPin size={14} />
                    <span>{match.venue}</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="no-results">
            <h3>Матчи не найдены</h3>
            <p>Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
