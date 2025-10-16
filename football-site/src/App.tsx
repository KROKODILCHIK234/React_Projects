import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Leagues from './components/Leagues';
import LeaguesPage from './components/LeaguesPage';
import SchedulePage from './components/SchedulePage';
import TeamsPage from './components/TeamsPage';
import PlayersPage from './components/PlayersPage';
import FavoritesPage from './components/FavoritesPage';
import RightSidebar from './components/RightSidebar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import TestAPI from './components/TestAPI';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-layout">
          <main className="main-content">
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <Leagues />
                    </>
                  } />
                  <Route path="/leagues" element={<LeaguesPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                          <Route path="/teams" element={<TeamsPage />} />
                          <Route path="/players" element={<PlayersPage />} />
                          <Route path="/favorites" element={<FavoritesPage />} />
                          <Route path="/test" element={<TestAPI />} />
                </Routes>
          </main>
          <RightSidebar />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;