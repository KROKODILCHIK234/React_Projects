import React from 'react';
import { Star, Target, Zap, Users } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  photo: string;
  position: string;
  overall: number;
  rating: number;
  goals: number;
  assists: number;
  matches: number;
  nationality: string;
  nationalityFlag: string;
}

interface TeamPlayersProps {
  teamId: string;
  teamName: string;
}

const TeamPlayers: React.FC<TeamPlayersProps> = ({ teamId, teamName }) => {
  // Данные игроков для каждой команды
  const teamPlayers: { [key: string]: Player[] } = {
    'arsenal': [
      { id: 'saka', name: 'Букайо Сака', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bukayo_Saka_2021.jpg/1200px-Bukayo_Saka_2021.jpg', position: 'RW', overall: 87, rating: 8.2, goals: 15, assists: 12, matches: 35, nationality: 'Англия', nationalityFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { id: 'odegaard', name: 'Мартин Эдегор', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Martin_%C3%98degaard_2021.jpg/1200px-Martin_%C3%98degaard_2021.jpg', position: 'CAM', overall: 88, rating: 8.4, goals: 12, assists: 15, matches: 35, nationality: 'Норвегия', nationalityFlag: '🇳🇴' },
      { id: 'saliba', name: 'Уильям Салиба', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/William_Saliba_2022.jpg/1200px-William_Saliba_2022.jpg', position: 'CB', overall: 85, rating: 8.0, goals: 2, assists: 1, matches: 30, nationality: 'Франция', nationalityFlag: '🇫🇷' },
    ],
    'man-city': [
      { id: 'haaland', name: 'Эрлинг Холанд', photo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Erling_Haaland_2023_%28cropped%29.jpg', position: 'ST', overall: 91, rating: 8.7, goals: 25, assists: 3, matches: 30, nationality: 'Норвегия', nationalityFlag: '🇳🇴' },
      { id: 'de-bruyne', name: 'Кевин Де Брюйне', photo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Kevin_De_Bruyne_2018.jpg', position: 'CM', overall: 91, rating: 8.9, goals: 8, assists: 18, matches: 28, nationality: 'Бельгия', nationalityFlag: '🇧🇪' },
      { id: 'rodri', name: 'Родри', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rodri_2021.jpg/1200px-Rodri_2021.jpg', position: 'CDM', overall: 89, rating: 8.5, goals: 5, assists: 8, matches: 32, nationality: 'Испания', nationalityFlag: '🇪🇸' },
    ],
    'liverpool': [
      { id: 'salah', name: 'Мохамед Салах', photo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mohamed_Salah_2018.jpg', position: 'RW', overall: 89, rating: 8.6, goals: 18, assists: 10, matches: 33, nationality: 'Египет', nationalityFlag: '🇪🇬' },
      { id: 'van-dijk', name: 'Вирджил ван Дейк', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Virgil_van_Dijk_2021.jpg/1200px-Virgil_van_Dijk_2021.jpg', position: 'CB', overall: 90, rating: 8.7, goals: 3, assists: 2, matches: 30, nationality: 'Нидерланды', nationalityFlag: '🇳🇱' },
      { id: 'mane', name: 'Садио Мане', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sadio_Man%C3%A9_2018.jpg/1200px-Sadio_Man%C3%A9_2018.jpg', position: 'LW', overall: 88, rating: 8.4, goals: 16, assists: 8, matches: 32, nationality: 'Сенегал', nationalityFlag: '🇸🇳' },
    ],
    'real-madrid': [
      { id: 'benzema', name: 'Карим Бензема', photo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Karim_Benzema_wearing_Real_Madrid_kit_2021.jpg', position: 'ST', overall: 89, rating: 8.4, goals: 20, assists: 8, matches: 30, nationality: 'Франция', nationalityFlag: '🇫🇷' },
      { id: 'modric', name: 'Лука Модрич', photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Luka_Modri%C4%87_2022.jpg', position: 'CM', overall: 88, rating: 8.5, goals: 5, assists: 12, matches: 28, nationality: 'Хорватия', nationalityFlag: '🇭🇷' },
      { id: 'vinicius', name: 'Винисиус Жуниор', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Vinicius_Jr._2021.jpg/1200px-Vinicius_Jr._2021.jpg', position: 'LW', overall: 87, rating: 8.3, goals: 15, assists: 10, matches: 32, nationality: 'Бразилия', nationalityFlag: '🇧🇷' },
    ],
    'barcelona': [
      { id: 'pedri', name: 'Педри', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Pedri_2021.jpg/1200px-Pedri_2021.jpg', position: 'CM', overall: 86, rating: 8.1, goals: 8, assists: 12, matches: 30, nationality: 'Испания', nationalityFlag: '🇪🇸' },
      { id: 'gavi', name: 'Гави', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gavi_2022.jpg/1200px-Gavi_2022.jpg', position: 'CM', overall: 84, rating: 7.9, goals: 5, assists: 8, matches: 28, nationality: 'Испания', nationalityFlag: '🇪🇸' },
      { id: 'ter-stegen', name: 'Марк-Андре тер Штеген', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Marc-Andr%C3%A9_ter_Stegen_2021.jpg/1200px-Marc-Andr%C3%A9_ter_Stegen_2021.jpg', position: 'GK', overall: 88, rating: 8.4, goals: 0, assists: 0, matches: 30, nationality: 'Германия', nationalityFlag: '🇩🇪' },
    ],
  };

  const players = teamPlayers[teamId] || [];

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

  if (players.length === 0) {
    return (
      <div className="team-players">
        <h3>Игроки команды {teamName}</h3>
        <p>Информация об игроках недоступна</p>
      </div>
    );
  }

  return (
    <div className="team-players">
      <h3>Игроки команды {teamName}</h3>
      <div className="players-grid">
        {players.map((player, index) => (
          <div key={player.id} className="player-card">
            <div className="player-card-header">
              <img
                src={player.photo}
                alt={player.name}
                className="player-photo"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/200x200/333333/FFFFFF?text=' + player.name.charAt(0);
                }}
              />
              <div className="player-badges">
                <span 
                  className="position-badge"
                  style={{ backgroundColor: getPositionColor(player.position) }}
                >
                  {player.position}
                </span>
                <span className="rating-badge">
                  <Star size={12} fill="var(--football-gold)" color="var(--football-gold)" />
                  {player.rating}
                </span>
              </div>
            </div>
          
            <div className="player-card-content">
              <h4 className="player-name">{player.name}</h4>
              <div className="player-nationality">
                <span>{player.nationalityFlag}</span>
                <span>{player.nationality}</span>
              </div>
              
              <div className="player-stats">
                <div className="stat-item">
                  <Target size={14} />
                  <span>{player.goals}</span>
                  <small>Голы</small>
                </div>
                <div className="stat-item">
                  <Zap size={14} />
                  <span>{player.assists}</span>
                  <small>Ассисты</small>
                </div>
                <div className="stat-item">
                  <Users size={14} />
                  <span>{player.matches}</span>
                  <small>Матчи</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPlayers;
