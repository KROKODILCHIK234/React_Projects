import React from 'react';
import { Database, Download, RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useDataParser } from '../hooks/useDataParser';
import ScrollAnimation from './ScrollAnimation';

const DataManagement: React.FC = () => {
  const { isParsing, lastResult, parsePremierLeague, parseAllLeagues } = useDataParser();

  const handleParsePremierLeague = async () => {
    const result = await parsePremierLeague();
    console.log('Результат парсинга Premier League:', result);
  };

  const handleParseAllLeagues = async () => {
    const result = await parseAllLeagues();
    console.log('Результат парсинга всех лиг:', result);
  };

  return (
    <div className="data-management">
      <div className="container">
        <ScrollAnimation animation="fadeInUp">
          <div className="page-header">
            <h1>
              <span className="gradient-text">Управление данными</span>
            </h1>
            <p>Загружайте актуальные данные команд и игроков из реальных источников</p>
          </div>
        </ScrollAnimation>

        <div className="data-management-content">
          {/* Статус парсинга */}
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="status-card">
              <div className="status-header">
                <Database size={24} />
                <h3>Статус парсинга</h3>
              </div>
              
              <div className="status-content">
                {isParsing ? (
                  <div className="status-loading">
                    <RefreshCw size={20} className="animate-spin" />
                    <span>Парсинг данных...</span>
                  </div>
                ) : lastResult ? (
                  <div className={`status-result ${lastResult.success ? 'success' : 'error'}`}>
                    {lastResult.success ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <AlertCircle size={20} className="text-red-500" />
                    )}
                    <span>{lastResult.message}</span>
                  </div>
                ) : (
                  <div className="status-idle">
                    <Info size={20} />
                    <span>Готов к парсингу данных</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>

          {/* Кнопки парсинга */}
          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="parse-actions">
              <h3>Выберите что парсить:</h3>
              
              <div className="action-buttons">
                <button
                  onClick={handleParsePremierLeague}
                  disabled={isParsing}
                  className="action-btn primary"
                >
                  {isParsing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Парсинг...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Premier League
                    </>
                  )}
                </button>

                <button
                  onClick={handleParseAllLeagues}
                  disabled={isParsing}
                  className="action-btn secondary"
                >
                  {isParsing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Парсинг...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Все лиги
                    </>
                  )}
                </button>
              </div>
            </div>
          </ScrollAnimation>

          {/* Информация о парсере */}
          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="parser-info">
              <h3>О парсере</h3>
              <div className="info-grid">
                <div className="info-item">
                  <h4>Источник данных</h4>
                  <p>FBref.com - один из самых полных источников футбольной статистики</p>
                </div>
                
                <div className="info-item">
                  <h4>Что парсится</h4>
                  <ul>
                    <li>Статистика команд</li>
                    <li>Данные игроков</li>
                    <li>Таблицы лиг</li>
                    <li>Результаты матчей</li>
                  </ul>
                </div>
                
                <div className="info-item">
                  <h4>Обновление</h4>
                  <p>Данные обновляются в реальном времени с официальных источников</p>
                </div>
                
                <div className="info-item">
                  <h4>Формат данных</h4>
                  <p>JSON и CSV форматы для легкой интеграции</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Инструкции */}
          <ScrollAnimation animation="fadeInUp" delay={800}>
            <div className="instructions">
              <h3>Как использовать</h3>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Выберите лигу</h4>
                    <p>Нажмите на кнопку для парсинга конкретной лиги или всех лиг</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Дождитесь завершения</h4>
                    <p>Парсинг может занять несколько минут в зависимости от объема данных</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Используйте данные</h4>
                    <p>Загруженные данные автоматически появятся в соответствующих разделах</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
