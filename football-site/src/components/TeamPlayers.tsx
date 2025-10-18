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
  // Тестовые данные удалены - используем API
  const teamPlayers: { [key: string]: Player[] } = {};

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
