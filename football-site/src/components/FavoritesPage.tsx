import React, { useState, useEffect } from 'react';
import { Search, Heart, Users, Star, X, MapPin } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface Team {
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
}

interface Player {
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
}

// Mock data (should be consistent with TeamsPage and PlayersPage)
const allTeams: Team[] = [
  { id: 'arsenal', name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', league: 'Premier League', country: 'Англия', stadium: 'Emirates Stadium', coach: 'Mikel Arteta', playersCount: 25, titles: 3, description: 'Один из самых успешных клубов Англии.' },
  { id: 'man-city', name: 'Manchester City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg', league: 'Premier League', country: 'Англия', stadium: 'Etihad Stadium', coach: 'Pep Guardiola', playersCount: 27, titles: 9, description: 'Действующие чемпионы Премьер-лиги.' },
  { id: 'liverpool', name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', league: 'Premier League', country: 'Англия', stadium: 'Anfield', coach: 'Jürgen Klopp', playersCount: 25, titles: 19, description: 'Исторический клуб с богатой историей.' },
  { id: 'real-madrid', name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', league: 'La Liga', country: 'Испания', stadium: 'Santiago Bernabéu', coach: 'Carlo Ancelotti', playersCount: 25, titles: 35, description: 'Самый титулованный клуб Испании.' },
  { id: 'barcelona', name: 'Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', league: 'La Liga', country: 'Испания', stadium: 'Spotify Camp Nou', coach: 'Xavi', playersCount: 24, titles: 27, description: 'Каталонский гранд.' },
  { id: 'bayern-munich', name: 'Bayern Munich', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg', league: 'Bundesliga', country: 'Германия', stadium: 'Allianz Arena', coach: 'Thomas Tuchel', playersCount: 28, titles: 33, description: 'Рекордмайстер Германии.' },
  { id: 'psg', name: 'Paris Saint-Germain', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png', league: 'Ligue 1', country: 'Франция', stadium: 'Parc des Princes', coach: 'Luis Enrique', playersCount: 27, titles: 11, description: 'Доминирующий клуб во Франции.' },
  { id: 'juventus', name: 'Juventus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png', league: 'Serie A', country: 'Италия', stadium: 'Allianz Stadium', coach: 'Massimiliano Allegri', playersCount: 26, titles: 36, description: 'Старая синьора итальянского футбола.' },
  { id: 'man-utd', name: 'Manchester Utd', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', league: 'Premier League', country: 'Англия', stadium: 'Old Trafford', coach: 'Erik ten Hag', playersCount: 26, titles: 20, description: 'Один из самых титулованных клубов Англии.' },
  { id: 'chelsea', name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png', league: 'Premier League', country: 'Англия', stadium: 'Stamford Bridge', coach: 'Mauricio Pochettino', playersCount: 27, titles: 6, description: 'Один из ведущих клубов Лондона.' },
  { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg', league: 'Bundesliga', country: 'Германия', stadium: 'Signal Iduna Park', coach: 'Edin Terzić', playersCount: 26, titles: 8, description: 'Один из самых популярных клубов Германии.' },
  { id: 'inter-milan', name: 'Inter Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', league: 'Serie A', country: 'Италия', stadium: 'San Siro', coach: 'Simone Inzaghi', playersCount: 25, titles: 19, description: 'Чемпионы Серии А.' },
  { id: 'ac-milan', name: 'AC Milan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png', league: 'Serie A', country: 'Италия', stadium: 'San Siro', coach: 'Stefano Pioli', playersCount: 24, titles: 19, description: 'Один из самых успешных клубов Италии.' },
  { id: 'atletico-madrid', name: 'Atlético Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', league: 'La Liga', country: 'Испания', stadium: 'Cívitas Metropolitano', coach: 'Diego Simeone', playersCount: 25, titles: 11, description: 'Мадридский клуб с сильной обороной.' },
  { id: 'tottenham', name: 'Tottenham Hotspur', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', league: 'Premier League', country: 'Англия', stadium: 'Tottenham Hotspur Stadium', coach: 'Ange Postecoglou', playersCount: 26, titles: 0, description: 'Лондонский клуб с амбициозными планами.' },
];

const allPlayers: Player[] = [
  { id: 'messi', name: 'Лионель Месси', photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel_Messi_2023.jpg', team: 'Inter Miami CF', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Inter_Miami_CF_logo.svg/1200px-Inter_Miami_CF_logo.svg.png', league: 'MLS', nationality: 'Аргентина', nationalityFlag: '🇦🇷', position: 'CAM', overall: 93, rating: 8.9, goals: 820, assists: 360, matches: 1045, description: 'Один из величайших футболистов всех времен.' },
  { id: 'ronaldo', name: 'Криштиану Роналду', photo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Cristiano_Ronaldo_2018.jpg', team: 'Al Nassr FC', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Al_Nassr_FC_logo.svg/1200px-Al_Nassr_FC_logo.svg.png', league: 'Saudi Pro League', nationality: 'Португалия', nationalityFlag: '🇵🇹', position: 'ST', overall: 90, rating: 8.5, goals: 870, assists: 270, matches: 1200, description: 'Рекордсмен по голам в истории футбола.' },
  { id: 'mbappe', name: 'Килиан Мбаппе', photo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Mbapp%C3%A9_2022.jpg', team: 'Paris Saint-Germain', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png', league: 'Ligue 1', nationality: 'Франция', nationalityFlag: '🇫🇷', position: 'ST', overall: 91, rating: 8.8, goals: 300, assists: 150, matches: 400, description: 'Один из самых быстрых и талантливых нападающих мира.' },
  { id: 'haaland', name: 'Эрлинг Холанд', photo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Erling_Haaland_2023_%28cropped%29.jpg', team: 'Manchester City', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg', league: 'Premier League', nationality: 'Норвегия', nationalityFlag: '🇳🇴', position: 'ST', overall: 91, rating: 8.7, goals: 200, assists: 40, matches: 250, description: 'Молодой феномен, забивающий голы пачками.' },
  { id: 'salah', name: 'Мохамед Салах', photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mohamed_Salah_2018.jpg', team: 'Liverpool', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', league: 'Premier League', nationality: 'Египет', nationalityFlag: '🇪🇬', position: 'RW', overall: 89, rating: 8.6, goals: 200, assists: 100, matches: 450, description: 'Один из лучших вингеров в мире.' },
  { id: 'benzema', name: 'Карим Бензема', photo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Karim_Benzema_wearing_Real_Madrid_kit_2021.jpg', team: 'Al-Ittihad Club', teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Al-Ittihad_Club_logo.svg/1200px-Al-Ittihad_Club_logo.svg.png', league: 'Saudi Pro League', nationality: 'Франция', nationalityFlag: '🇫🇷', position: 'ST', overall: 89, rating: 8.4, goals: 400, assists: 180, matches: 800, description: 'Элегантный нападающий с отличным завершением.' },
  { id: 'modric', name: 'Лука Модрич', photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Luka_Modri%C4%87_2022.jpg', team: 'Real Madrid', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', league: 'La Liga', nationality: 'Хорватия', nationalityFlag: '🇭🇷', position: 'CM', overall: 88, rating: 8.5, goals: 100, assists: 150, matches: 750, description: 'Маэстро полузащиты, обладатель Золотого мяча.' },
  { id: 'kane', name: 'Гарри Кейн', photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Harry_Kane_2018.jpg', team: 'Bayern Munich', teamLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/FC_Bayern_Munich_logo_%282017%29.svg', league: 'Bundesliga', nationality: 'Англия', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', position: 'ST', overall: 90, rating: 8.7, goals: 300, assists: 80, matches: 500, description: 'Один из лучших центральных нападающих мира.' },
  { id: 'neymar', name: 'Неймар', photo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Neymar_Jr._with_PSG%2C_2022.jpg', team: 'Al Hilal SFC', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Al-Hilal_FC_logo.svg/1200px-Al-Hilal_FC_logo.svg.png', league: 'Saudi Pro League', nationality: 'Бразилия', nationalityFlag: '🇧🇷', position: 'LW', overall: 89, rating: 8.6, goals: 350, assists: 200, matches: 600, description: 'Бразильский виртуоз с невероятной техникой.' },
  { id: 'de-bruyne', name: 'Кевин Де Брюйне', photo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Kevin_De_Bruyne_2018.jpg', team: 'Manchester City', teamLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_logo.svg', league: 'Premier League', nationality: 'Бельгия', nationalityFlag: '🇧🇪', position: 'CM', overall: 91, rating: 8.9, goals: 150, assists: 250, matches: 600, description: 'Один из лучших плеймейкеров современности.' },
];

const FavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'players'>('teams');
  const [searchTermTeam, setSearchTermTeam] = useState<string>('');
  const [searchTermPlayer, setSearchTermPlayer] = useState<string>('');
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteTeams');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [favoritePlayers, setFavoritePlayers] = useState<Player[]>(() => {
    const savedFavorites = localStorage.getItem('favoritePlayers');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteTeams', JSON.stringify(favoriteTeams));
    if (favoriteTeams.length > 0) {
      localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeams[0]));
    } else {
      localStorage.removeItem('favoriteTeam');
    }
    window.dispatchEvent(new Event('storage'));
  }, [favoriteTeams]);

  useEffect(() => {
    localStorage.setItem('favoritePlayers', JSON.stringify(favoritePlayers));
    window.dispatchEvent(new Event('storage'));
  }, [favoritePlayers]);

  const filteredAvailableTeams = allTeams.filter(team =>
    !favoriteTeams.some(fav => fav.id === team.id) &&
    (team.name.toLowerCase().includes(searchTermTeam.toLowerCase()) ||
      team.league.toLowerCase().includes(searchTermTeam.toLowerCase()) ||
      team.country.toLowerCase().includes(searchTermTeam.toLowerCase()))
  );

  const filteredAvailablePlayers = allPlayers.filter(player =>
    !favoritePlayers.some(fav => fav.id === player.id) &&
    (player.name.toLowerCase().includes(searchTermPlayer.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTermPlayer.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTermPlayer.toLowerCase()))
  );

  const handleAddFavoriteTeam = (team: Team) => {
    setFavoriteTeams(prevFavorites => [...prevFavorites, team]);
    setSearchTermTeam('');
  };

  const handleRemoveFavoriteTeam = (teamId: string) => {
    setFavoriteTeams(prevFavorites => prevFavorites.filter(team => team.id !== teamId));
  };

  const handleAddFavoritePlayer = (player: Player) => {
    setFavoritePlayers(prevFavorites => [...prevFavorites, player]);
    setSearchTermPlayer('');
  };

  const handleRemoveFavoritePlayer = (playerId: string) => {
    setFavoritePlayers(prevFavorites => prevFavorites.filter(player => player.id !== playerId));
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'ST': return '#ef4444'; // Red
      case 'RW':
      case 'LW': return '#f59e0b'; // Orange
      case 'CAM':
      case 'CM':
      case 'CDM': return '#8b5cf6'; // Purple
      case 'CB':
      case 'LB':
      case 'RB': return '#10b981'; // Green
      case 'GK': return '#3b82f6'; // Blue
      default: return '#64748b'; // Gray
    }
  };

  return (
    <section className="favorites-page">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1><span className="gradient-text">Избранное</span></h1>
            <p>Управляйте вашими любимыми командами и игроками</p>
          </div>
        </ScrollAnimation>

        <div className="favorites-tabs">
          <button
            className={`favorites-tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            <Users size={20} />
            <span>Команды</span>
          </button>
          <button
            className={`favorites-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            <Star size={20} />
            <span>Игроки</span>
          </button>
        </div>

        {activeTab === 'teams' && (
          <div className="favorite-section-content">
            <h3>Мои избранные команды</h3>
            {favoriteTeams.length > 0 ? (
              <div className="teams-grid">
                {favoriteTeams.map((team, index) => (
                  <ScrollAnimation key={team.id} animation="scaleIn" delay={index * 100}>
                    <div className="team-card">
                      <div className="team-card-header">
                        <img src={team.logo} alt={team.name} className="team-logo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="team-badge">
                          <span className="team-league">{team.league}</span>
                        </div>
                      </div>
                      <div className="team-card-content">
                        <h3 className="team-name">{team.name}</h3>
                        <div className="team-location">
                          <MapPin size={16} />
                          <span>{team.country}</span>
                        </div>
                        <button className="add-to-favorites-btn remove" onClick={() => handleRemoveFavoriteTeam(team.id)}>
                          <X size={20} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>У вас пока нет избранных команд.</p>
              </div>
            )}

            <h3>Добавить команду в избранное</h3>
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск команды по названию, лиге или стране..."
                className="search-input"
                value={searchTermTeam}
                onChange={(e) => setSearchTermTeam(e.target.value)}
              />
            </div>
            <div className="teams-grid">
              {filteredAvailableTeams.length > 0 ? (
                filteredAvailableTeams.map((team, index) => (
                  <ScrollAnimation key={team.id} animation="scaleIn" delay={index * 100}>
                    <div className="team-card">
                      <div className="team-card-header">
                        <img src={team.logo} alt={team.name} className="team-logo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                        <div className="team-badge">
                          <span className="team-league">{team.league}</span>
                        </div>
                      </div>
                      <div className="team-card-content">
                        <h3 className="team-name">{team.name}</h3>
                        <div className="team-location">
                          <MapPin size={16} />
                          <span>{team.country}</span>
                        </div>
                        <button className="add-to-favorites-btn" onClick={() => handleAddFavoriteTeam(team)}>
                          <Heart size={20} />
                          Добавить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))
              ) : (
                <div className="no-results">
                  <p>Команды не найдены или уже добавлены в избранное.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="favorite-section-content">
            <h3>Мои избранные игроки</h3>
            {favoritePlayers.length > 0 ? (
              <div className="players-grid">
                {favoritePlayers.map((player, index) => (
                  <ScrollAnimation key={player.id} animation="scaleIn" delay={index * 100}>
                    <div className="player-card">
                      <div className="player-card-header">
                        <img src={player.photo} alt={player.name} className="player-photo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
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
                          <img src={player.teamLogo} alt={player.team} className="team-logo-small" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                          <span>{player.team}</span>
                        </div>
                        <button className="add-to-favorites-btn remove" onClick={() => handleRemoveFavoritePlayer(player.id)}>
                          <X size={20} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>У вас пока нет избранных игроков.</p>
              </div>
            )}

            <h3>Добавить игрока в избранное</h3>
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск игрока по имени, команде или позиции..."
                className="search-input"
                value={searchTermPlayer}
                onChange={(e) => setSearchTermPlayer(e.target.value)}
              />
            </div>
            <div className="players-grid">
              {filteredAvailablePlayers.length > 0 ? (
                filteredAvailablePlayers.map((player, index) => (
                  <ScrollAnimation key={player.id} animation="scaleIn" delay={index * 100}>
                    <div className="player-card">
                      <div className="player-card-header">
                        <img src={player.photo} alt={player.name} className="player-photo" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
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
                          <img src={player.teamLogo} alt={player.team} className="team-logo-small" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none'; }} />
                          <span>{player.team}</span>
                        </div>
                        <button className="add-to-favorites-btn" onClick={() => handleAddFavoritePlayer(player)}>
                          <Heart size={20} />
                          Добавить
                        </button>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))
              ) : (
                <div className="no-results">
                  <p>Игроки не найдены или уже добавлены в избранное.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;