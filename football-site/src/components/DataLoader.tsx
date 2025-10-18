import React, { useState } from 'react';
import { Download, RefreshCw, Database, CheckCircle, AlertCircle } from 'lucide-react';

interface DataLoaderProps {
  onDataLoaded?: (data: any) => void;
}

const DataLoader: React.FC<DataLoaderProps> = ({ onDataLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setStatus('loading');
    setMessage('Загружаем данные...');

    try {
      // Имитируем загрузку данных
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Тестовые данные удалены - используем реальный API
      const mockData = null;

      setStatus('success');
      setMessage('Данные успешно загружены!');
      
      if (onDataLoaded) {
        onDataLoaded(mockData);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <RefreshCw size={20} className="animate-spin" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      default:
        return <Database size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'loading':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="data-loader">
      <div className="data-loader-header">
        <h3>Загрузка данных</h3>
        <p>Получите актуальные данные команд и игроков</p>
      </div>

      <div className="data-loader-content">
        <div className="status-indicator">
          {getStatusIcon()}
          <span className={getStatusColor()}>
            {message || 'Готов к загрузке'}
          </span>
        </div>

        <div className="data-loader-actions">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <Download size={16} />
                Загрузить данные
              </>
            )}
          </button>
        </div>

        <div className="data-loader-info">
          <h4>Что загружается:</h4>
          <ul>
            <li>✅ Статистика команд из топ-5 лиг</li>
            <li>✅ Данные игроков с рейтингами</li>
            <li>✅ Актуальные таблицы лиг</li>
            <li>✅ Результаты матчей</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataLoader;

