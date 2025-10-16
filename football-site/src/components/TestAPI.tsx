import React, { useState, useEffect } from 'react';
import { getAllPlayers, getAllTeams, getLeagues } from '../services/footballApi';

const TestAPI: React.FC = () => {
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    const testAPI = async () => {
      console.log('🧪 Тестируем API...');
      
      try {
        console.log('1. Тестируем getLeagues...');
        const leagues = await getLeagues();
        console.log('✅ Лиги:', leagues.length);
        
        console.log('2. Тестируем getAllTeams...');
        const teams = await getAllTeams();
        console.log('✅ Команды:', teams.length);
        
        console.log('3. Тестируем getAllPlayers...');
        const players = await getAllPlayers();
        console.log('✅ Игроки:', players.length);
        
        setResults({
          leagues: leagues.length,
          teams: teams.length,
          players: players.length,
          leaguesData: leagues.slice(0, 3),
          teamsData: teams.slice(0, 3),
          playersData: players.slice(0, 3)
        });
        
      } catch (error) {
        console.error('❌ Ошибка:', error);
        setResults({ error: error instanceof Error ? error.message : 'Неизвестная ошибка' });
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', background: 'white', color: 'black' }}>
      <h2>🧪 Тест API</h2>
      <div>
        <p>Лиги: {results.leagues || 'загрузка...'}</p>
        <p>Команды: {results.teams || 'загрузка...'}</p>
        <p>Игроки: {results.players || 'загрузка...'}</p>
        
        {results.error && <p style={{ color: 'red' }}>Ошибка: {results.error}</p>}
        
        {results.leaguesData && (
          <div>
            <h3>Первые лиги:</h3>
            <pre>{JSON.stringify(results.leaguesData, null, 2)}</pre>
          </div>
        )}
        
        {results.teamsData && (
          <div>
            <h3>Первые команды:</h3>
            <pre>{JSON.stringify(results.teamsData, null, 2)}</pre>
          </div>
        )}
        
        {results.playersData && (
          <div>
            <h3>Первые игроки:</h3>
            <pre>{JSON.stringify(results.playersData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAPI;
