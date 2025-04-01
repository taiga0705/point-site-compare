import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// ページコンポーネントのインポート
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import SettingsPage from './pages/SettingsPage';
import RankingPage from './pages/RankingPage';

// 共通コンポーネントのインポート
import Header from './components/Header';
import Footer from './components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
