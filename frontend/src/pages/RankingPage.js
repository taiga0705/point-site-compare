import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RankingContainer = styled.div`
  padding: 1rem;
`;

const RankingTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const RankingDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const PeriodSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const PeriodButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#4a6da7' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4a6da7' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.active ? '#3a5d97' : '#e0e0e0'};
  }
`;

const RankingList = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const RankingItem = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  background-color: white;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const RankNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4a6da7;
  width: 40px;
  text-align: center;
`;

const RankContent = styled.div`
  flex: 1;
`;

const SearchTerm = styled(Link)`
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #4a6da7;
    text-decoration: underline;
  }
`;

const SearchCount = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: #d9534f;
  background-color: #f9f2f2;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #666;
`;

// APIのベースURL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const RankingPage = () => {
  const [period, setPeriod] = useState('day');
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 実際のAPIが実装されるまでのモックデータ
        // 実装後は以下のコメントアウトを解除してAPIを呼び出す
        /*
        const response = await axios.get(`${API_BASE_URL}/ranking`, {
          params: { period, limit: 50 }
        });
        setRanking(response.data.ranking);
        */
        
        // モックデータ（開発用）
        setTimeout(() => {
          const mockRanking = [
            { search_term: '楽天カード', count: 120 },
            { search_term: 'Amazonプライム', count: 98 },
            { search_term: 'U-NEXT', count: 87 },
            { search_term: 'dカード', count: 76 },
            { search_term: 'PayPayカード', count: 65 },
            { search_term: 'ビックカメラ', count: 54 },
            { search_term: 'ふるさと納税', count: 43 },
            { search_term: 'Hulu', count: 32 },
            { search_term: 'ソフトバンク光', count: 21 },
            { search_term: 'auひかり', count: 19 },
            { search_term: 'イオンカード', count: 18 },
            { search_term: 'dポイントカード', count: 17 },
            { search_term: 'ドコモ光', count: 16 },
            { search_term: 'ヤフーカード', count: 15 },
            { search_term: 'メルカリ', count: 14 }
          ];
          setRanking(mockRanking);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching ranking:', err);
        setError('ランキング情報の取得中にエラーが発生しました。');
        setLoading(false);
      }
    };
    
    fetchRanking();
  }, [period]);
  
  // 期間の表示名を取得
  const getPeriodName = () => {
    switch (period) {
      case 'am':
        return '午前';
      case 'pm':
        return '午後';
      case 'day':
        return '今日';
      case 'week':
        return '今週';
      default:
        return '今日';
    }
  };
  
  return (
    <RankingContainer>
      <RankingTitle>検索ランキング</RankingTitle>
      <RankingDescription>
        {getPeriodName()}の人気検索キーワードランキングです。
      </RankingDescription>
      
      <PeriodSelector>
        <PeriodButton 
          active={period === 'am'} 
          onClick={() => setPeriod('am')}
        >
          午前
        </PeriodButton>
        <PeriodButton 
          active={period === 'pm'} 
          onClick={() => setPeriod('pm')}
        >
          午後
        </PeriodButton>
        <PeriodButton 
          active={period === 'day'} 
          onClick={() => setPeriod('day')}
        >
          今日
        </PeriodButton>
        <PeriodButton 
          active={period === 'week'} 
          onClick={() => setPeriod('week')}
        >
          今週
        </PeriodButton>
      </PeriodSelector>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {loading ? (
        <LoadingMessage>ランキング情報を読み込んでいます...</LoadingMessage>
      ) : ranking.length === 0 ? (
        <NoDataMessage>
          ランキングデータがありません。
        </NoDataMessage>
      ) : (
        <RankingList>
          {ranking.map((item, index) => (
            <RankingItem key={index}>
              <RankNumber>{index + 1}</RankNumber>
              <RankContent>
                <SearchTerm to={`/search?q=${encodeURIComponent(item.search_term)}`}>
                  {item.search_term}
                </SearchTerm>
                <SearchCount>検索数: {item.count}回</SearchCount>
              </RankContent>
            </RankingItem>
          ))}
        </RankingList>
      )}
    </RankingContainer>
  );
};

export default RankingPage;
