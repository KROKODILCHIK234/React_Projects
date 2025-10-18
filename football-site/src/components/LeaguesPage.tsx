import React, { useState, useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import LeagueTable from './LeagueTable';
import TeamPlayers from './TeamPlayers';

interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  founded: number;
  teamsCount: number;
  description: string;
  teams: any[];
  matches: any[];
}

const LeaguesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [leaguesData, setLeaguesData] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем реальные данные лиг
  useEffect(() => {
    const loadLeaguesData = async () => {
      try {
        setLoading(true);
        
        // Загружаем данные из API парсера
        const response = await fetch('/api_football_data.json');
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        
        const data = await response.json();
        const footballData = data.data || data;
        
        // Создаем список лиг на основе данных
        const leagues: League[] = [
          {
            id: 'premier-league',
            name: 'Premier League',
            country: 'Англия',
            logo: 'https://crests.football-data.org/PL.png',
            founded: 1992,
            teamsCount: 20,
            description: 'Высший дивизион английского футбола',
            teams: [],
            matches: []
          },
          {
            id: 'la-liga',
            name: 'La Liga',
            country: 'Испания',
            logo: 'https://crests.football-data.org/PD.png',
            founded: 1929,
            teamsCount: 20,
            description: 'Высший дивизион испанского футбола',
            teams: [],
            matches: []
          },
          {
            id: 'bundesliga',
            name: 'Bundesliga',
            country: 'Германия',
            logo: 'https://crests.football-data.org/BL1.png',
            founded: 1963,
            teamsCount: 18,
            description: 'Высший дивизион немецкого футбола',
            teams: [],
            matches: []
          },
          {
            id: 'serie-a',
            name: 'Serie A',
            country: 'Италия',
            logo: 'https://crests.football-data.org/SA.png',
            founded: 1929,
            teamsCount: 20,
            description: 'Высший дивизион итальянского футбола',
            teams: [],
            matches: []
          },
          {
            id: 'ligue-1',
            name: 'Ligue 1',
            country: 'Франция',
            logo: 'https://crests.football-data.org/FL1.png',
            founded: 1932,
            teamsCount: 20,
            description: 'Высший дивизион французского футбола',
            teams: [],
            matches: []
          }
        ];
        
        setLeaguesData(leagues);
        setLoading(false);
        
      } catch (err) {
        console.error('Ошибка загрузки данных лиг:', err);
        setLoading(false);
      }
    };

    loadLeaguesData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Загружаем лиги...</span>
      </div>
    );
  }

  return (
    <div className="leagues-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1>
              <span className="gradient-text">Лиги</span>
            </h1>
            <p>Исследуйте топ-5 футбольных лиг мира</p>
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
              <h2>Таблица {selectedLeague.name}</h2>
              <LeagueTable 
                leagueId={selectedLeague.id} 
                leagueName={selectedLeague.name} 
                onTeamSelect={setSelectedTeam}
              />
              
              {selectedTeam && (
                <div className="team-players-section">
                  <TeamPlayers teamId={selectedTeam} teamName={selectedTeam} />
                </div>
              )}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </div>
  );
};

export default LeaguesPage;
