import { useState, useCallback } from 'react';

interface ParseResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export const useDataParser = () => {
  const [isParsing, setIsParsing] = useState(false);
  const [lastResult, setLastResult] = useState<ParseResult | null>(null);

  const parseData = useCallback(async (league?: string): Promise<ParseResult> => {
    setIsParsing(true);
    
    try {
      // Имитируем вызов Python скрипта
      console.log(`🔄 Запуск парсера для лиги: ${league || 'все лиги'}`);
      
      // В реальном приложении здесь был бы вызов API или Python скрипта
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Моковые данные
      const mockData = {
        leagues: [
          {
            id: 'premier-league',
            name: 'Premier League',
            country: 'Англия',
            teams: [
              {
                id: 'arsenal',
                name: 'Arsenal',
                position: 1,
                points: 44,
                matches: 18,
                wins: 14,
                draws: 2,
                losses: 2,
                goalsFor: 45,
                goalsAgainst: 10,
                goalDifference: 35
              },
              {
                id: 'man-city',
                name: 'Manchester City',
                position: 2,
                points: 42,
                matches: 18,
                wins: 13,
                draws: 3,
                losses: 2,
                goalsFor: 48,
                goalsAgainst: 15,
                goalDifference: 33
              }
            ],
            players: [
              {
                id: 'saka',
                name: 'Букайо Сака',
                team: 'Arsenal',
                position: 'RW',
                goals: 15,
                assists: 12,
                matches: 35,
                rating: 8.2
              },
              {
                id: 'haaland',
                name: 'Эрлинг Холанд',
                team: 'Manchester City',
                position: 'ST',
                goals: 25,
                assists: 3,
                matches: 30,
                rating: 8.7
              }
            ]
          }
        ],
        totalTeams: 2,
        totalPlayers: 2,
        lastUpdated: new Date().toISOString()
      };

      const result: ParseResult = {
        success: true,
        message: `Данные успешно загружены: ${mockData.totalTeams} команд, ${mockData.totalPlayers} игроков`,
        data: mockData
      };

      setLastResult(result);
      return result;

    } catch (error) {
      const result: ParseResult = {
        success: false,
        message: 'Ошибка загрузки данных',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };

      setLastResult(result);
      return result;
    } finally {
      setIsParsing(false);
    }
  }, []);

  const parsePremierLeague = useCallback(() => {
    return parseData('Premier League');
  }, [parseData]);

  const parseAllLeagues = useCallback(() => {
    return parseData();
  }, [parseData]);

  return {
    isParsing,
    lastResult,
    parseData,
    parsePremierLeague,
    parseAllLeagues
  };
};
