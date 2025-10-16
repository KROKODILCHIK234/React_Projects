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
  position?: number;
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
  founded: number;
  teamsCount: number;
  description: string;
  teams: Team[];
  matches: any[];
}

// 🌐 Базовый URL для API (мы будем использовать бесплатный API)
const API_BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = '2eb61d4c24554dcca5ea5aa0076abcf1'; // Ваш API ключ

// 🔧 Функция для создания заголовков запроса
const createHeaders = () => ({
  'X-Auth-Token': API_KEY,
  'Content-Type': 'application/json',
});

// ⚠️ Обработка ошибок API
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error(`Ошибка загрузки данных: ${error.message}`);
};

// 🐍 Загрузка данных из API парсера
const loadPythonData = async (): Promise<any> => {
  try {
    // Пытаемся загрузить данные из файла, созданного API парсером
    const response = await fetch('/api_football_data.json');
    if (!response.ok) {
      throw new Error('API данные недоступны');
    }
    
    const data = await response.json();
    console.log('🐍 Данные загружены из API парсера');
    return data.data || data; // Поддерживаем оба формата
    
  } catch (error) {
    console.log('🐍 API данные недоступны, используем моковые данные');
    return null;
  }
};

// 🏆 Получение данных лиг
export const getLeagues = async (): Promise<League[]> => {
  try {
    // Сначала пытаемся загрузить данные из API парсера
    console.log('🔄 Загружаем данные лиг...');
    const pythonData = await loadPythonData();
    
    if (pythonData && pythonData.leagues && pythonData.leagues.length > 0) {
      console.log('✅ Получено лиг из API парсера:', pythonData.leagues.length);
      return pythonData.leagues;
    }
    
    // Если API данные недоступны, используем моковые данные
    console.log('⚠️ Используем моковые данные лиг');
    return mockLeaguesData;
  } catch (error) {
    handleApiError(error);
    return mockLeaguesData;
  }
};

// ⚽ Получение команд лиги
export const getTeamsByLeague = async (leagueId: string): Promise<Team[]> => {
  try {
    console.log(`🔄 Загружаем команды лиги: ${leagueId}`);
    
    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Возвращаем команды для конкретной лиги
    const leagueTeams = mockTeamsData.filter(team => team.league === leagueId);
    return leagueTeams;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// 👤 Получение игроков команды
export const getPlayersByTeam = async (teamId: string): Promise<Player[]> => {
  try {
    console.log(`🔄 Загружаем игроков команды: ${teamId}`);
    
    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Возвращаем игроков для конкретной команды
    const teamPlayers = mockPlayersData.filter(player => player.team === teamId);
    return teamPlayers;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// 📊 Получение всех команд
export const getAllTeams = async (): Promise<Team[]> => {
  try {
    // Сначала пытаемся загрузить данные из API парсера
    console.log('🔄 Загружаем все команды...');
    const pythonData = await loadPythonData();
    
    if (pythonData && pythonData.teams && pythonData.teams.length > 0) {
      console.log('✅ Получено команд из API парсера:', pythonData.teams.length);
      return pythonData.teams;
    }
    
    // Если API данные недоступны, используем моковые данные
    console.log('⚠️ Используем моковые данные команд');
    console.log('📊 mockTeamsData длина:', mockTeamsData.length);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Возвращаем команды:', mockTeamsData.length);
    return mockTeamsData;
  } catch (error) {
    console.error('❌ Ошибка в getAllTeams:', error);
    handleApiError(error);
    return mockTeamsData;
  }
};

// 🌟 Получение всех игроков
export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    // Сначала пытаемся загрузить данные из API парсера
    console.log('🔄 Загружаем всех игроков...');
    const pythonData = await loadPythonData();
    
    if (pythonData && pythonData.players && pythonData.players.length > 0) {
      console.log('✅ Получено игроков из API парсера:', pythonData.players.length);
      return pythonData.players;
    }
    
    // Если API данные недоступны, используем моковые данные
    console.log('⚠️ Используем моковые данные игроков');
    console.log('📊 mockPlayersData длина:', mockPlayersData.length);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Возвращаем игроков:', mockPlayersData.length);
    return mockPlayersData;
  } catch (error) {
    console.error('❌ Ошибка в getAllPlayers:', error);
    handleApiError(error);
    return mockPlayersData;
  }
};

// 📅 Получение матчей
export const getMatches = async (leagueId?: string): Promise<any[]> => {
  try {
    console.log('🔄 Загружаем матчи...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockMatchesData;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// 🎯 Моковые данные (временные, пока не подключим реальный API)
const mockLeaguesData: League[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    country: 'Англия',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaLiga.svg/1200px-LaLiga.svg.png',
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
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
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
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Serie_A_logo_%282019%29.svg/1200px-Serie_A_logo_%282019%29.svg.png',
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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
    founded: 1932,
    teamsCount: 20,
    description: 'Высший дивизион французского футбола',
    teams: [],
    matches: []
  }
];

const mockTeamsData: Team[] = [
  // Premier League
  {
    id: 'arsenal',
    name: 'Arsenal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    league: 'Premier League',
    country: 'Англия',
    stadium: 'Emirates Stadium',
    coach: 'Mikel Arteta',
    playersCount: 25,
    titles: 3,
    description: 'Один из самых успешных клубов Англии',
    founded: 1886,
    position: 1,
    played: 18,
    won: 14,
    drawn: 2,
    lost: 2,
    goalsFor: 45,
    goalsAgainst: 10,
    goalDifference: 35,
    points: 44,
    form: ['W', 'W', 'D', 'W', 'L']
  },
  {
    id: 'man-city',
    name: 'Manchester City',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg',
    league: 'Premier League',
    country: 'Англия',
    stadium: 'Etihad Stadium',
    coach: 'Pep Guardiola',
    playersCount: 27,
    titles: 9,
    description: 'Действующие чемпионы Премьер-лиги',
    founded: 1880,
    position: 2,
    played: 18,
    won: 13,
    drawn: 3,
    lost: 2,
    goalsFor: 48,
    goalsAgainst: 15,
    goalDifference: 33,
    points: 42,
    form: ['W', 'L', 'W', 'W', 'D']
  },
  {
    id: 'liverpool',
    name: 'Liverpool',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    league: 'Premier League',
    country: 'Англия',
    stadium: 'Anfield',
    coach: 'Jürgen Klopp',
    playersCount: 25,
    titles: 19,
    description: 'Исторический клуб с богатой историей',
    founded: 1892,
    position: 3,
    played: 18,
    won: 12,
    drawn: 4,
    lost: 2,
    goalsFor: 40,
    goalsAgainst: 18,
    goalDifference: 22,
    points: 40,
    form: ['D', 'W', 'W', 'L', 'W']
  },
  // La Liga
  {
    id: 'real-madrid',
    name: 'Real Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    league: 'La Liga',
    country: 'Испания',
    stadium: 'Santiago Bernabéu',
    coach: 'Carlo Ancelotti',
    playersCount: 25,
    titles: 35,
    description: 'Самый титулованный клуб Испании',
    founded: 1902,
    position: 1,
    played: 18,
    won: 15,
    drawn: 2,
    lost: 1,
    goalsFor: 42,
    goalsAgainst: 10,
    goalDifference: 32,
    points: 47,
    form: ['W', 'W', 'W', 'D', 'W']
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    league: 'La Liga',
    country: 'Испания',
    stadium: 'Spotify Camp Nou',
    coach: 'Xavi',
    playersCount: 24,
    titles: 27,
    description: 'Каталонский гранд',
    founded: 1899,
    position: 2,
    played: 18,
    won: 13,
    drawn: 3,
    lost: 2,
    goalsFor: 38,
    goalsAgainst: 12,
    goalDifference: 26,
    points: 42,
    form: ['W', 'D', 'L', 'W', 'W']
  },
  // Bundesliga
  {
    id: 'bayern-munich',
    name: 'Bayern Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg',
    league: 'Bundesliga',
    country: 'Германия',
    stadium: 'Allianz Arena',
    coach: 'Thomas Tuchel',
    playersCount: 28,
    titles: 33,
    description: 'Рекордмайстер Германии',
    founded: 1900,
    position: 1,
    played: 18,
    won: 15,
    drawn: 2,
    lost: 1,
    goalsFor: 45,
    goalsAgainst: 12,
    goalDifference: 33,
    points: 47,
    form: ['W', 'W', 'W', 'D', 'W']
  },
  {
    id: 'dortmund',
    name: 'Borussia Dortmund',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    league: 'Bundesliga',
    country: 'Германия',
    stadium: 'Signal Iduna Park',
    coach: 'Edin Terzić',
    playersCount: 26,
    titles: 8,
    description: 'Один из самых популярных клубов Германии',
    founded: 1909,
    position: 2,
    played: 18,
    won: 12,
    drawn: 4,
    lost: 2,
    goalsFor: 38,
    goalsAgainst: 20,
    goalDifference: 18,
    points: 40,
    form: ['W', 'D', 'W', 'W', 'D']
  },
  // Serie A
  {
    id: 'inter-milan',
    name: 'Inter Milan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    league: 'Serie A',
    country: 'Италия',
    stadium: 'San Siro',
    coach: 'Simone Inzaghi',
    playersCount: 25,
    titles: 19,
    description: 'Чемпионы Серии А',
    founded: 1908,
    position: 1,
    played: 18,
    won: 14,
    drawn: 3,
    lost: 1,
    goalsFor: 40,
    goalsAgainst: 10,
    goalDifference: 30,
    points: 45,
    form: ['W', 'W', 'D', 'W', 'W']
  },
  {
    id: 'juventus',
    name: 'Juventus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png',
    league: 'Serie A',
    country: 'Италия',
    stadium: 'Allianz Stadium',
    coach: 'Massimiliano Allegri',
    playersCount: 26,
    titles: 36,
    description: 'Старая синьора итальянского футбола',
    founded: 1897,
    position: 2,
    played: 18,
    won: 12,
    drawn: 4,
    lost: 2,
    goalsFor: 35,
    goalsAgainst: 15,
    goalDifference: 20,
    points: 40,
    form: ['D', 'W', 'W', 'D', 'L']
  },
  // Ligue 1
  {
    id: 'psg',
    name: 'Paris Saint-Germain',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
    league: 'Ligue 1',
    country: 'Франция',
    stadium: 'Parc des Princes',
    coach: 'Luis Enrique',
    playersCount: 27,
    titles: 11,
    description: 'Доминирующий клуб во Франции',
    founded: 1970,
    position: 1,
    played: 18,
    won: 16,
    drawn: 1,
    lost: 1,
    goalsFor: 50,
    goalsAgainst: 10,
    goalDifference: 40,
    points: 49,
    form: ['W', 'W', 'W', 'W', 'D']
  },
  {
    id: 'monaco',
    name: 'AS Monaco',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/AS_Monaco_FC.svg/1200px-AS_Monaco_FC.svg.png',
    league: 'Ligue 1',
    country: 'Франция',
    stadium: 'Stade Louis II',
    coach: 'Adi Hütter',
    playersCount: 25,
    titles: 8,
    description: 'Княжеский клуб из Монако',
    founded: 1924,
    position: 2,
    played: 18,
    won: 11,
    drawn: 4,
    lost: 3,
    goalsFor: 35,
    goalsAgainst: 18,
    goalDifference: 17,
    points: 37,
    form: ['W', 'L', 'D', 'W', 'W']
  }
];

const mockPlayersData: Player[] = [
  // Premier League Players
  {
    id: 'saka',
    name: 'Букайо Сака',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bukayo_Saka_2021.jpg/1200px-Bukayo_Saka_2021.jpg',
    team: 'Arsenal',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    league: 'Premier League',
    nationality: 'Англия',
    nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'RW',
    overall: 87,
    rating: 8.2,
    goals: 15,
    assists: 12,
    matches: 35,
    description: 'Молодой талант Арсенала',
    age: 22,
    height: '178 см',
    weight: '70 кг'
  },
  {
    id: 'odegaard',
    name: 'Мартин Эдегор',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Martin_%C3%98degaard_2021.jpg/1200px-Martin_%C3%98degaard_2021.jpg',
    team: 'Arsenal',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    league: 'Premier League',
    nationality: 'Норвегия',
    nationalityFlag: '🇳🇴',
    position: 'CAM',
    overall: 88,
    rating: 8.4,
    goals: 12,
    assists: 15,
    matches: 35,
    description: 'Капитан и плеймейкер Арсенала',
    age: 25,
    height: '178 см',
    weight: '68 кг'
  },
  {
    id: 'haaland',
    name: 'Эрлинг Холанд',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Erling_Haaland_2023_%28cropped%29.jpg/1200px-Erling_Haaland_2023_%28cropped%29.jpg',
    team: 'Manchester City',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg',
    league: 'Premier League',
    nationality: 'Норвегия',
    nationalityFlag: '🇳🇴',
    position: 'ST',
    overall: 91,
    rating: 8.7,
    goals: 27,
    assists: 5,
    matches: 31,
    description: 'Феноменальный нападающий',
    age: 24,
    height: '194 см',
    weight: '88 кг'
  },
  {
    id: 'de-bruyne',
    name: 'Кевин Де Брюйне',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Kevin_De_Bruyne_2018.jpg/1200px-Kevin_De_Bruyne_2018.jpg',
    team: 'Manchester City',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg',
    league: 'Premier League',
    nationality: 'Бельгия',
    nationalityFlag: '🇧🇪',
    position: 'CAM',
    overall: 91,
    rating: 8.9,
    goals: 6,
    assists: 18,
    matches: 25,
    description: 'Лучший плеймейкер мира',
    age: 32,
    height: '181 см',
    weight: '70 кг'
  },
  {
    id: 'salah',
    name: 'Мохамед Салах',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mohamed_Salah_2018.jpg/1200px-Mohamed_Salah_2018.jpg',
    team: 'Liverpool',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    league: 'Premier League',
    nationality: 'Египет',
    nationalityFlag: '🇪🇬',
    position: 'RW',
    overall: 89,
    rating: 8.6,
    goals: 18,
    assists: 12,
    matches: 34,
    description: 'Король Египта',
    age: 31,
    height: '175 см',
    weight: '71 кг'
  },
  {
    id: 'van-dijk',
    name: 'Вирджил ван Дейк',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Virgil_van_Dijk_2018.jpg/1200px-Virgil_van_Dijk_2018.jpg',
    team: 'Liverpool',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    league: 'Premier League',
    nationality: 'Нидерланды',
    nationalityFlag: '🇳🇱',
    position: 'CB',
    overall: 90,
    rating: 8.5,
    goals: 3,
    assists: 1,
    matches: 33,
    description: 'Лучший защитник мира',
    age: 32,
    height: '193 см',
    weight: '92 кг'
  },
  {
    id: 'rashford',
    name: 'Маркус Рашфорд',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Marcus_Rashford_2021.jpg/1200px-Marcus_Rashford_2021.jpg',
    team: 'Manchester United',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    league: 'Premier League',
    nationality: 'Англия',
    nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'LW',
    overall: 85,
    rating: 8.0,
    goals: 16,
    assists: 6,
    matches: 32,
    description: 'Быстрый вингер',
    age: 26,
    height: '180 см',
    weight: '70 кг'
  },
  {
    id: 'fernandes',
    name: 'Бруну Фернандеш',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bruno_Fernandes_2021.jpg/1200px-Bruno_Fernandes_2021.jpg',
    team: 'Manchester United',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    league: 'Premier League',
    nationality: 'Португалия',
    nationalityFlag: '🇵🇹',
    position: 'CAM',
    overall: 87,
    rating: 8.3,
    goals: 8,
    assists: 12,
    matches: 30,
    description: 'Креативный полузащитник',
    age: 29,
    height: '179 см',
    weight: '69 кг'
  },
  // La Liga Players
  {
    id: 'vinicius',
    name: 'Винисиус Жуниор',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Vinicius_Jr_2021.jpg/1200px-Vinicius_Jr_2021.jpg',
    team: 'Real Madrid',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    league: 'La Liga',
    nationality: 'Бразилия',
    nationalityFlag: '🇧🇷',
    position: 'LW',
    overall: 89,
    rating: 8.5,
    goals: 15,
    assists: 10,
    matches: 34,
    description: 'Быстрый бразильский вингер',
    age: 23,
    height: '176 см',
    weight: '73 кг'
  },
  {
    id: 'bellingham',
    name: 'Джуд Беллингем',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jude_Bellingham_2022.jpg/1200px-Jude_Bellingham_2022.jpg',
    team: 'Real Madrid',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    league: 'La Liga',
    nationality: 'Англия',
    nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'CM',
    overall: 90,
    rating: 8.8,
    goals: 19,
    assists: 6,
    matches: 28,
    description: 'Молодой лидер полузащиты',
    age: 20,
    height: '186 см',
    weight: '75 кг'
  },
  {
    id: 'lewa',
    name: 'Роберт Левандовски',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Robert_Lewandowski_2018.jpg/1200px-Robert_Lewandowski_2018.jpg',
    team: 'Barcelona',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    league: 'La Liga',
    nationality: 'Польша',
    nationalityFlag: '🇵🇱',
    position: 'ST',
    overall: 88,
    rating: 8.2,
    goals: 13,
    assists: 4,
    matches: 29,
    description: 'Опытный нападающий',
    age: 35,
    height: '185 см',
    weight: '81 кг'
  },
  {
    id: 'pedri',
    name: 'Педри',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pedri_2021.jpg/1200px-Pedri_2021.jpg',
    team: 'Barcelona',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    league: 'La Liga',
    nationality: 'Испания',
    nationalityFlag: '🇪🇸',
    position: 'CM',
    overall: 86,
    rating: 8.1,
    goals: 2,
    assists: 8,
    matches: 25,
    description: 'Талантливый испанский полузащитник',
    age: 21,
    height: '174 см',
    weight: '60 кг'
  },
  // Bundesliga Players
  {
    id: 'kane',
    name: 'Гарри Кейн',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Harry_Kane_2018.jpg/1200px-Harry_Kane_2018.jpg',
    team: 'Bayern Munich',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg',
    league: 'Bundesliga',
    nationality: 'Англия',
    nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'ST',
    overall: 90,
    rating: 8.7,
    goals: 36,
    assists: 8,
    matches: 32,
    description: 'Лучший нападающий Англии',
    age: 30,
    height: '188 см',
    weight: '86 кг'
  },
  {
    id: 'musiala',
    name: 'Джамал Мусиала',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jamal_Musiala_2021.jpg/1200px-Jamal_Musiala_2021.jpg',
    team: 'Bayern Munich',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg',
    league: 'Bundesliga',
    nationality: 'Германия',
    nationalityFlag: '🇩🇪',
    position: 'CAM',
    overall: 86,
    rating: 8.1,
    goals: 12,
    assists: 6,
    matches: 30,
    description: 'Молодой немецкий талант',
    age: 21,
    height: '184 см',
    weight: '75 кг'
  },
  {
    id: 'sancho',
    name: 'Джадон Санчо',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jadon_Sancho_2021.jpg/1200px-Jadon_Sancho_2021.jpg',
    team: 'Borussia Dortmund',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
    league: 'Bundesliga',
    nationality: 'Англия',
    nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    position: 'LW',
    overall: 84,
    rating: 7.9,
    goals: 8,
    assists: 12,
    matches: 28,
    description: 'Техничный вингер',
    age: 24,
    height: '180 см',
    weight: '76 кг'
  },
  // Serie A Players
  {
    id: 'osimhen',
    name: 'Виктор Осимхен',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Victor_Osimhen_2021.jpg/1200px-Victor_Osimhen_2021.jpg',
    team: 'Napoli',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_logo.svg/1200px-SSC_Napoli_logo.svg.png',
    league: 'Serie A',
    nationality: 'Нигерия',
    nationalityFlag: '🇳🇬',
    position: 'ST',
    overall: 89,
    rating: 8.6,
    goals: 26,
    assists: 4,
    matches: 32,
    description: 'Мощный нигерийский нападающий',
    age: 25,
    height: '185 см',
    weight: '78 кг'
  },
  {
    id: 'kvaratskhelia',
    name: 'Хвича Кварацхелия',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Khvicha_Kvaratskhelia_2022.jpg/1200px-Khvicha_Kvaratskhelia_2022.jpg',
    team: 'Napoli',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_logo.svg/1200px-SSC_Napoli_logo.svg.png',
    league: 'Serie A',
    nationality: 'Грузия',
    nationalityFlag: '🇬🇪',
    position: 'LW',
    overall: 87,
    rating: 8.3,
    goals: 11,
    assists: 14,
    matches: 30,
    description: 'Грузинский виртуоз',
    age: 23,
    height: '183 см',
    weight: '75 кг'
  },
  {
    id: 'lautaro',
    name: 'Лаутаро Мартинес',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lautaro_Mart%C3%ADnez_2021.jpg/1200px-Lautaro_Mart%C3%ADnez_2021.jpg',
    team: 'Inter Milan',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
    league: 'Serie A',
    nationality: 'Аргентина',
    nationalityFlag: '🇦🇷',
    position: 'ST',
    overall: 88,
    rating: 8.4,
    goals: 24,
    assists: 2,
    matches: 33,
    description: 'Аргентинский нападающий',
    age: 26,
    height: '174 см',
    weight: '72 кг'
  },
  // Ligue 1 Players
  {
    id: 'mbappe',
    name: 'Килиан Мбаппе',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mbapp%C3%A9_2022.jpg/1200px-Mbapp%C3%A9_2022.jpg',
    team: 'Paris Saint-Germain',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
    league: 'Ligue 1',
    nationality: 'Франция',
    nationalityFlag: '🇫🇷',
    position: 'ST',
    overall: 91,
    rating: 8.8,
    goals: 29,
    assists: 7,
    matches: 29,
    description: 'Самый быстрый нападающий мира',
    age: 25,
    height: '178 см',
    weight: '73 кг'
  },
  {
    id: 'dembele',
    name: 'Усман Дембеле',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ousmane_Demb%C3%A9l%C3%A9_2021.jpg/1200px-Ousmane_Demb%C3%A9l%C3%A9_2021.jpg',
    team: 'Paris Saint-Germain',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
    league: 'Ligue 1',
    nationality: 'Франция',
    nationalityFlag: '🇫🇷',
    position: 'RW',
    overall: 85,
    rating: 7.9,
    goals: 5,
    assists: 10,
    matches: 25,
    description: 'Техничный французский вингер',
    age: 26,
    height: '178 см',
    weight: '67 кг'
  },
  {
    id: 'hakimi',
    name: 'Ашраф Хакими',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Achraf_Hakimi_2021.jpg/1200px-Achraf_Hakimi_2021.jpg',
    team: 'Paris Saint-Germain',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png',
    league: 'Ligue 1',
    nationality: 'Марокко',
    nationalityFlag: '🇲🇦',
    position: 'RB',
    overall: 87,
    rating: 8.2,
    goals: 4,
    assists: 8,
    matches: 31,
    description: 'Быстрый марокканский защитник',
    age: 25,
    height: '181 см',
    weight: '73 кг'
  },
  // Real Madrid players
  {
    id: 'benzema',
    name: 'Карим Бензема',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Karim_Benzema_wearing_Real_Madrid_kit_2021.jpg',
    team: 'Real Madrid',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    league: 'La Liga',
    nationality: 'Франция',
    nationalityFlag: '🇫🇷',
    position: 'ST',
    overall: 89,
    rating: 8.4,
    goals: 20,
    assists: 8,
    matches: 30,
    description: 'Элегантный нападающий',
    age: 36,
    height: '185 см',
    weight: '81 кг'
  },
  {
    id: 'modric',
    name: 'Лука Модрич',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Luka_Modri%C4%87_2022.jpg',
    team: 'Real Madrid',
    teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    league: 'La Liga',
    nationality: 'Хорватия',
    nationalityFlag: '🇭🇷',
    position: 'CM',
    overall: 88,
    rating: 8.5,
    goals: 5,
    assists: 12,
    matches: 28,
    description: 'Маэстро полузащиты',
    age: 38,
    height: '172 см',
    weight: '66 кг'
  }
];

const mockMatchesData: any[] = [
  {
    id: 'm1',
    homeTeam: 'Manchester Utd',
    awayTeam: 'Liverpool',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    league: 'Premier League',
    date: '2025-01-12',
    time: '15:00',
    venue: 'Old Trafford',
    status: 'finished',
    homeScore: 2,
    awayScore: 1
  },
  {
    id: 'm2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    league: 'La Liga',
    date: '2025-01-13',
    time: '20:00',
    venue: 'Santiago Bernabéu',
    status: 'live',
    homeScore: 1,
    awayScore: 1,
    minute: 65
  }
];
