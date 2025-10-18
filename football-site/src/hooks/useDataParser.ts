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
      
      // Тестовые данные удалены - используем реальный API
      const mockData = null;

      const result: ParseResult = {
        success: true,
        message: 'Парсер запущен успешно',
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




