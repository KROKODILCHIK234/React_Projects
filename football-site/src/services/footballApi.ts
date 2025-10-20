// 🚀 API сервис для получения футбольных данных
// Этот файл содержит функции для загрузки данных с сервера

// 📝 Интерфейсы (типы данных) - это как "чертежи" для наших данных
export interface Team {
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
  founded: number;
  position: number;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  points?: number;
  form?: string[];
}

export interface Player {
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
  age?: number;
  height?: string;
  weight?: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  founded?: number;
  teamsCount?: number;
  playersCount?: number;
  description?: string;
  season?: string;
  teams?: Team[];
  matches?: any[];
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  league?: string;
  homeScore?: number;
  awayScore?: number;
}

// 🔧 Вспомогательные функции
const handleApiError = (error: any) => {
  console.error('❌ API Error:', error);
};

// 📊 Загрузка данных из Python API
const loadPythonData = async () => {
  try {
    // Получаем данные с backend API
    const response = await fetch('http://localhost:8000/standings');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('🔍 Backend data:', data);
    console.log('🔍 First team data:', data.table?.[0]);
    console.log('🔍 First team keys:', data.table?.[0] ? Object.keys(data.table[0]) : 'No data');
    
    // Преобразуем данные в формат, ожидаемый фронтендом
    return {
      leagues: [{
        id: 'premier-league',
        name: data.competition,
        country: 'Англия',
        logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
        season: data.season,
        teamsCount: data.table.length,
        playersCount: 0
      }],
      teams: data.table.map((team: any, index: number) => ({
        id: team.name.toLowerCase().replace(/\s+/g, '-'),
        name: team.name,
        logo: team.crest,
        league: 'Premier League',
        country: 'Англия',
        stadium: 'Unknown',
        coach: 'Unknown',
        playersCount: 25,
        titles: 0,
        description: `${team.name} - команда из Premier League`,
        founded: 1900,
        position: team.position,
        played: team.played,
        won: team.won,
        drawn: team.drawn,
        lost: team.lost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        points: team.points,
        form: ['W', 'W', 'D', 'W', 'W'] // Заглушка
      })),
      players: [],
      matches: []
    };
  } catch (error) {
    console.error('❌ Ошибка загрузки данных из Python API:', error);
    return null;
  }
};

// ⚽ Получение лиг
export const getLeagues = async (): Promise<League[]> => {
  try {
    console.log('🔄 Загружаем данные лиг...');
    const pythonData = await loadPythonData();
    
    if (pythonData && pythonData.leagues && pythonData.leagues.length > 0) {
      console.log('✅ Получено лиг из API парсера:', pythonData.leagues.length);
      return pythonData.leagues;
    }
    
    console.log('⚠️ API данные недоступны, возвращаем пустой массив');
    return [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// ⚽ Получение команд лиги
export const getTeamsByLeague = async (leagueId: string): Promise<Team[]> => {
  try {
    console.log(`🔄 Загружаем команды лиги: ${leagueId}`);
    
    const pythonData = await loadPythonData();
    if (pythonData && pythonData.teams) {
      // Маппинг названий лиг
      const leagueMapping: { [key: string]: string } = {
        'premier-league': 'Premier League',
        'la-liga': 'La Liga',
        'bundesliga': 'Bundesliga',
        'serie-a': 'Serie A',
        'ligue-1': 'Ligue 1'
      };
      
      const leagueName = leagueMapping[leagueId] || leagueId;
      const leagueTeams = pythonData.teams.filter((team: Team) => team.league === leagueName);
      console.log(`✅ Найдено команд для лиги ${leagueName}: ${leagueTeams.length}`);
      return leagueTeams;
    }
    
    return [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// ⚽ Получение игроков команды
export const getPlayersByTeam = async (teamId: string): Promise<Player[]> => {
  try {
    console.log(`🔄 Загружаем игроков команды: ${teamId}`);
    
    const pythonData = await loadPythonData();
    if (pythonData && pythonData.players) {
      const teamPlayers = pythonData.players.filter((player: Player) => player.team === teamId);
      return teamPlayers;
    }
    
    return [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// ⚽ Получение всех команд
export const getAllTeams = async (): Promise<Team[]> => {
  try {
    console.log('🔄 Загружаем все команды...');
    
    const pythonData = await loadPythonData();
    if (pythonData && pythonData.teams && pythonData.teams.length > 0) {
      console.log('✅ Получено команд из API:', pythonData.teams.length);
      return pythonData.teams;
    }
    
    console.log('⚠️ API данные недоступны, возвращаем пустой массив');
    return [];
  } catch (error) {
    console.error('❌ Ошибка в getAllTeams:', error);
    handleApiError(error);
    return [];
  }
};

// ⚽ Получение всех игроков
export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    console.log('🔄 Загружаем всех игроков...');
    
    const pythonData = await loadPythonData();
    if (pythonData && pythonData.players && pythonData.players.length > 0) {
      console.log('✅ Получено игроков из API:', pythonData.players.length);
      return pythonData.players;
    }
    
    console.log('⚠️ API данные недоступны, возвращаем пустой массив');
    return [];
  } catch (error) {
    console.error('❌ Ошибка в getAllPlayers:', error);
    handleApiError(error);
    return [];
  }
};

// ⚽ Получение матчей лиги
export const getMatchesByLeague = async (leagueId: string): Promise<Match[]> => {
  try {
    console.log(`🔄 Загружаем матчи лиги: ${leagueId}`);
    
    const pythonData = await loadPythonData();
    if (pythonData && pythonData.matches) {
      const leagueMatches = pythonData.matches.filter((match: Match) => match.league === leagueId);
      return leagueMatches;
    }
    
    return [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// 🔍 Поиск
export const search = async (term: string) => {
  try {
    console.log(`🔍 Поиск: ${term}`);
    
    const pythonData = await loadPythonData();
    if (pythonData) {
      const results = {
        teams: pythonData.teams?.filter((team: Team) => 
          team.name.toLowerCase().includes(term.toLowerCase()) ||
          team.country.toLowerCase().includes(term.toLowerCase())
        ) || [],
        players: pythonData.players?.filter((player: Player) => 
          player.name.toLowerCase().includes(term.toLowerCase()) ||
          player.team.toLowerCase().includes(term.toLowerCase()) ||
          player.nationality.toLowerCase().includes(term.toLowerCase())
        ) || [],
        leagues: pythonData.leagues?.filter((league: League) => 
          league.name.toLowerCase().includes(term.toLowerCase()) ||
          league.country.toLowerCase().includes(term.toLowerCase())
        ) || []
      };
      
      return results;
    }
    
    return { teams: [], players: [], leagues: [] };
  } catch (error) {
    handleApiError(error);
    return { teams: [], players: [], leagues: [] };
  }
};