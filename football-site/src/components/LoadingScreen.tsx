import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
          <Trophy size={40} color="#000" />
        </div>
        
        <h2 className="loading-title gradient-text">Football League</h2>
        
        <div className="loading-progress">
          <div 
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="loading-percentage">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;