import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  logo: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  league?: string;
  country?: string;
}

interface LeagueTableProps {
  leagueId: string;
  leagueName: string;
  onTeamSelect?: (teamId: string) => void;
}

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueId, leagueName, onTeamSelect }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  // Статические данные для разных лиг
  const getStaticTeams = (leagueId: string): Team[] => {
    const teamsData: { [key: string]: Team[] } = {
      'premier-league': [
        { id: 'arsenal', name: 'Arsenal FC', logo: 'https://crests.football-data.org/57.png', position: 1, played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 14, goalsAgainst: 3, goalDifference: 11, points: 16, form: ['W', 'W', 'D', 'W', 'W'], league: 'pl', country: 'England' },
        { id: 'liverpool', name: 'Liverpool FC', logo: 'https://crests.football-data.org/64.png', position: 2, played: 7, won: 4, drawn: 3, lost: 0, goalsFor: 13, goalsAgainst: 9, goalDifference: 4, points: 15, form: ['W', 'W', 'D', 'W', 'D'], league: 'pl', country: 'England' },
        { id: 'tottenham', name: 'Tottenham Hotspur FC', logo: 'https://crests.football-data.org/73.png', position: 3, played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 13, goalsAgainst: 5, goalDifference: 8, points: 14, form: ['W', 'D', 'W', 'W', 'D'], league: 'pl', country: 'England' },
        { id: 'man-city', name: 'Manchester City FC', logo: 'https://crests.football-data.org/65.png', position: 4, played: 7, won: 4, drawn: 1, lost: 2, goalsFor: 15, goalsAgainst: 6, goalDifference: 9, points: 13, form: ['W', 'D', 'W', 'L', 'W'], league: 'pl', country: 'England' },
        { id: 'chelsea', name: 'Chelsea FC', logo: 'https://crests.football-data.org/61.png', position: 5, played: 7, won: 3, drawn: 2, lost: 2, goalsFor: 13, goalsAgainst: 9, goalDifference: 4, points: 11, form: ['D', 'W', 'L', 'W', 'D'], league: 'pl', country: 'England' }
      ],
      'la-liga': [
        { id: 'real-madrid', name: 'Real Madrid CF', logo: 'https://crests.football-data.org/86.png', position: 1, played: 8, won: 7, drawn: 1, lost: 0, goalsFor: 22, goalsAgainst: 5, goalDifference: 17, points: 22, form: ['W', 'W', 'W', 'D', 'W'], league: 'pd', country: 'Spain' },
        { id: 'barcelona', name: 'FC Barcelona', logo: 'https://crests.football-data.org/81.png', position: 2, played: 8, won: 6, drawn: 2, lost: 0, goalsFor: 20, goalsAgainst: 8, goalDifference: 12, points: 20, form: ['W', 'D', 'W', 'W', 'W'], league: 'pd', country: 'Spain' },
        { id: 'atletico', name: 'Atlético de Madrid', logo: 'https://crests.football-data.org/78.png', position: 3, played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 16, goalsAgainst: 7, goalDifference: 9, points: 17, form: ['W', 'D', 'W', 'D', 'W'], league: 'pd', country: 'Spain' },
        { id: 'real-sociedad', name: 'Real Sociedad', logo: 'https://crests.football-data.org/559.png', position: 4, played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 15, goalsAgainst: 10, goalDifference: 5, points: 16, form: ['W', 'W', 'D', 'L', 'W'], league: 'pd', country: 'Spain' },
        { id: 'athletic', name: 'Athletic Club', logo: 'https://crests.football-data.org/77.png', position: 5, played: 8, won: 4, drawn: 3, lost: 1, goalsFor: 12, goalsAgainst: 8, goalDifference: 4, points: 15, form: ['D', 'W', 'D', 'W', 'D'], league: 'pd', country: 'Spain' }
      ],
      'bundesliga': [
        { id: 'bayern', name: 'FC Bayern München', logo: 'https://crests.football-data.org/5.png', position: 1, played: 7, won: 6, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 4, goalDifference: 14, points: 19, form: ['W', 'W', 'W', 'D', 'W'], league: 'bl1', country: 'Germany' },
        { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://crests.football-data.org/4.png', position: 2, played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 15, goalsAgainst: 8, goalDifference: 7, points: 16, form: ['W', 'D', 'W', 'W', 'L'], league: 'bl1', country: 'Germany' },
        { id: 'leipzig', name: 'RB Leipzig', logo: 'https://crests.football-data.org/721.png', position: 3, played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 6, goalDifference: 6, points: 14, form: ['W', 'D', 'W', 'D', 'W'], league: 'bl1', country: 'Germany' }
      ],
      'serie-a': [
        { id: 'juventus', name: 'Juventus FC', logo: 'https://crests.football-data.org/109.png', position: 1, played: 7, won: 6, drawn: 1, lost: 0, goalsFor: 16, goalsAgainst: 4, goalDifference: 12, points: 19, form: ['W', 'W', 'W', 'D', 'W'], league: 'sa', country: 'Italy' },
        { id: 'inter', name: 'Inter Milan', logo: 'https://crests.football-data.org/108.png', position: 2, played: 7, won: 5, drawn: 2, lost: 0, goalsFor: 14, goalsAgainst: 6, goalDifference: 8, points: 17, form: ['W', 'D', 'W', 'W', 'D'], league: 'sa', country: 'Italy' },
        { id: 'milan', name: 'AC Milan', logo: 'https://crests.football-data.org/98.png', position: 3, played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 8, goalDifference: 4, points: 14, form: ['W', 'D', 'W', 'D', 'W'], league: 'sa', country: 'Italy' }
      ],
      'ligue-1': [
        { id: 'psg', name: 'Paris Saint-Germain', logo: 'https://crests.football-data.org/524.png', position: 1, played: 7, won: 6, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 5, goalDifference: 13, points: 19, form: ['W', 'W', 'W', 'D', 'W'], league: 'fl1', country: 'France' },
        { id: 'monaco', name: 'AS Monaco FC', logo: 'https://crests.football-data.org/548.png', position: 2, played: 7, won: 5, drawn: 1, lost: 1, goalsFor: 15, goalsAgainst: 8, goalDifference: 7, points: 16, form: ['W', 'D', 'W', 'W', 'L'], league: 'fl1', country: 'France' },
        { id: 'marseille', name: 'Olympique de Marseille', logo: 'https://crests.football-data.org/516.png', position: 3, played: 7, won: 4, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 7, goalDifference: 5, points: 14, form: ['W', 'D', 'W', 'D', 'W'], league: 'fl1', country: 'France' }
      ]
    };

    return teamsData[leagueId] || [];
  };

  // Загружаем команды при изменении лиги
  React.useEffect(() => {
    const teamsData = getStaticTeams(leagueId);
    setTeams(teamsData);
  }, [leagueId]);

  const handleTeamClick = (teamId: string) => {
    setSelectedTeam(teamId);
    if (onTeamSelect) {
      onTeamSelect(teamId);
    }
  };

  if (teams.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500 mb-4">📊 Нет данных для отображения</div>
        <p className="text-sm text-gray-400">
          Команды для лиги "{leagueName}" не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="league-table bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-2xl">
      {/* Заголовок */}
      <div className="px-6 py-5 border-b border-gray-600 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <span className="mr-3">🏆</span>
            Standings:
          </h3>
          <div className="flex space-x-2">
            <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-semibold shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
              TOTAL
            </button>
            <button className="px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition-all duration-200">
              HOME
            </button>
            <button className="px-5 py-2.5 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition-all duration-200">
              AWAY
            </button>
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Pos</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">Team</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">Matches</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">Points</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">+/-</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">Goals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {teams.map((team, index) => (
              <tr 
                key={team.id} 
                className={`hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 cursor-pointer transition-all duration-200 ${
                  selectedTeam === team.id ? 'bg-gradient-to-r from-gray-700 to-gray-600' : ''
                } ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}`}
                onClick={() => handleTeamClick(team.id)}
              >
                <td className="px-6 py-4 text-sm font-bold text-white">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    team.position <= 4 ? 'bg-green-600' : 
                    team.position <= 6 ? 'bg-blue-600' : 
                    team.position >= 18 ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {team.position}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-8 h-8 rounded-full object-contain bg-white p-1 shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/32x32/cccccc/666666?text=FC';
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white truncate max-w-48">
                      {team.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium text-gray-300">
                  {team.played}
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-white">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                    {team.points}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm">
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-full font-bold ${
                    team.goalDifference >= 0 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium text-gray-300">
                  <span className="bg-gray-700 px-3 py-1 rounded-full">
                    {team.goalsFor}:{team.goalsAgainst}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Подвал таблицы */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-700 border-t border-gray-600">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>📊 {leagueName} 2024/25 Season</span>
          <span>For the 💙 of the game</span>
        </div>
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTeam(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={teams.find(t => t.id === selectedTeam)?.logo} 
                    alt={teams.find(t => t.id === selectedTeam)?.name}
                    className="w-16 h-16 rounded-full object-contain bg-white p-2 shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/64x64/cccccc/666666?text=FC';
                    }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {teams.find(t => t.id === selectedTeam)?.name}
                    </h2>
                    <p className="text-gray-400">{leagueName} 2024/25</p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200"
                  onClick={() => setSelectedTeam(null)}
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">📊</span>
                    Статистика матчей
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Игры:</span>
                      <span className="text-white font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.played}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Победы:</span>
                      <span className="text-green-400 font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.won}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Ничьи:</span>
                      <span className="text-yellow-400 font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.drawn}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-300">Поражения:</span>
                      <span className="text-red-400 font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.lost}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-700 to-gray-600 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">⚽</span>
                    Голы и очки
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Забито:</span>
                      <span className="text-green-400 font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.goalsFor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Пропущено:</span>
                      <span className="text-red-400 font-bold text-lg">{teams.find(t => t.id === selectedTeam)?.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-500">
                      <span className="text-gray-300">Разность:</span>
                      <span className={`font-bold text-lg ${
                        (teams.find(t => t.id === selectedTeam)?.goalDifference || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {teams.find(t => t.id === selectedTeam)?.goalDifference || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg px-4 py-3">
                      <span className="text-white font-bold">Очки:</span>
                      <span className="text-white font-bold text-2xl">{teams.find(t => t.id === selectedTeam)?.points}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Позиция в лиге */}
              <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Позиция в лиге</h3>
                    <p className="text-gray-200">Текущее место в турнирной таблице</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">
                      {teams.find(t => t.id === selectedTeam)?.position}
                    </div>
                    <div className="text-sm text-gray-200">
                      из {teams.length} команд
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueTable;