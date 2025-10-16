import React, { useState } from 'react';
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

const leaguesData: League[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'Англия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    founded: 1992,
    teamsCount: 20,
    description: 'Высший дивизион английского футбола',
    teams: [
      { id: 'arsenal', name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', matches: 20, wins: 15, draws: 3, losses: 2, goalsFor: 45, goalsAgainst: 18, points: 48, form: ['W', 'W', 'D', 'W', 'W'] },
      { id: 'man-city', name: 'Manchester City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg', matches: 20, wins: 14, draws: 4, losses: 2, goalsFor: 42, goalsAgainst: 16, points: 46, form: ['W', 'D', 'W', 'W', 'D'] },
      { id: 'liverpool', name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', matches: 20, wins: 13, draws: 5, losses: 2, goalsFor: 38, goalsAgainst: 20, points: 44, form: ['W', 'W', 'D', 'W', 'L'] },
      { id: 'man-utd', name: 'Manchester Utd', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', matches: 20, wins: 12, draws: 4, losses: 4, goalsFor: 35, goalsAgainst: 22, points: 40, form: ['W', 'D', 'W', 'L', 'W'] },
      { id: 'chelsea', name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png', matches: 20, wins: 11, draws: 5, losses: 4, goalsFor: 32, goalsAgainst: 25, points: 38, form: ['D', 'W', 'L', 'W', 'D'] },
    ],
    matches: []
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    country: 'Испания',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaLiga.svg/1200px-LaLiga.svg.png',
    founded: 1929,
    teamsCount: 20,
    description: 'Высший дивизион испанского футбола',
    teams: [
      { id: 'real-madrid', name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', matches: 20, wins: 16, draws: 2, losses: 2, goalsFor: 48, goalsAgainst: 15, points: 50, form: ['W', 'W', 'W', 'D', 'W'] },
      { id: 'barcelona', name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', matches: 20, wins: 14, draws: 4, losses: 2, goalsFor: 42, goalsAgainst: 18, points: 46, form: ['W', 'D', 'W', 'W', 'W'] },
      { id: 'atletico-madrid', name: 'Atlético Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', matches: 20, wins: 12, draws: 5, losses: 3, goalsFor: 35, goalsAgainst: 20, points: 41, form: ['D', 'W', 'W', 'D', 'W'] },
    ],
    matches: []
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Германия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
    founded: 1963,
    teamsCount: 18,
    description: 'Высший дивизион немецкого футбола',
    teams: [
      { id: 'bayern-munich', name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg', matches: 18, wins: 15, draws: 2, losses: 1, goalsFor: 45, goalsAgainst: 12, points: 47, form: ['W', 'W', 'W', 'D', 'W'] },
      { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg', matches: 18, wins: 12, draws: 4, losses: 2, goalsFor: 38, goalsAgainst: 20, points: 40, form: ['W', 'D', 'W', 'W', 'D'] },
    ],
    matches: []
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    country: 'Италия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Serie_A_logo_%282019%29.svg/1200px-Serie_A_logo_%282019%29.svg.png',
    founded: 1929,
    teamsCount: 20,
    description: 'Высший дивизион итальянского футбола',
    teams: [
      { id: 'juventus', name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png', matches: 20, wins: 14, draws: 4, losses: 2, goalsFor: 40, goalsAgainst: 18, points: 46, form: ['W', 'D', 'W', 'W', 'W'] },
      { id: 'inter-milan', name: 'Inter Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', matches: 20, wins: 13, draws: 5, losses: 2, goalsFor: 38, goalsAgainst: 20, points: 44, form: ['W', 'W', 'D', 'W', 'W'] },
      { id: 'ac-milan', name: 'AC Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png', matches: 20, wins: 12, draws: 5, losses: 3, goalsFor: 35, goalsAgainst: 22, points: 41, form: ['W', 'D', 'W', 'D', 'W'] },
    ],
    matches: []
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    country: 'Франция',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
    founded: 1932,
    teamsCount: 20,
    description: 'Высший дивизион французского футбола',
    teams: [
      { id: 'psg', name: 'Paris Saint-Germain', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png', matches: 20, wins: 16, draws: 2, losses: 2, goalsFor: 48, goalsAgainst: 15, points: 50, form: ['W', 'W', 'W', 'D', 'W'] },
    ],
    matches: []
  },
];

const LeaguesPage: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

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
