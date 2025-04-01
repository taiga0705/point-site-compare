import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ResultsContainer = styled.div`
  padding: 1rem;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ResultCount = styled.p`
  color: #666;
  font-size: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #d9534f;
  background-color: #f9f2f2;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #4a6da7;
  color: white;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SiteLink = styled.a`
  color: #4a6da7;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RewardAmount = styled.span`
  font-weight: bold;
  color: #28a745;
`;

const DeviceIcon = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-right: 0.5rem;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #666;
`;

// APIのベースURL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const selectedSites = queryParams.get('sites') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // 実際のAPIが実装されるまでのモックデータ
        // 実装後は以下のコメントアウトを解除してAPIを呼び出す
        /*
        const response = await axios.get(`${API_BASE_URL}/search`, {
          params: {
            q: searchQuery,
            sites: selectedSites
          }
        });
        setResults(response.data.results);
        */
        
        // モックデータ（開発用）
        setTimeout(() => {
          const mockResults = [
            {
              id: '1',
              point_site: {
                id: '1',
                name: 'ポイントインカム',
                url: 'https://pointi.jp/'
              },
              offer: {
                id: '1',
                name: searchQuery,
                description: `${searchQuery}の案件説明`
              },
              reward_amount: 10000,
              reward_unit: '円',
              device_type: null,
              offer_url: 'https://pointi.jp/offer/123',
              affiliate_url: 'https://pointi.jp/af/?siteID=●●●',
              last_checked: new Date().toISOString()
            },
            {
              id: '2',
              point_site: {
                id: '2',
                name: 'ハピタス',
                url: 'https://hapitas.jp/'
              },
              offer: {
                id: '1',
                name: searchQuery,
                description: `${searchQuery}の案件説明`
              },
              reward_amount: 9000,
              reward_unit: '円',
              device_type: null,
              offer_url: 'https://hapitas.jp/offer/123',
              affiliate_url: 'https://hapitas.jp/register?i=●●●',
              last_checked: new Date().toISOString()
            },
            {
              id: '3',
              point_site: {
                id: '3',
                name: 'モッピー',
                url: 'https://moppy.jp/'
              },
              offer: {
                id: '1',
                name: searchQuery,
                description: `${searchQuery}の案件説明`
              },
              reward_amount: 8500,
              reward_unit: '円',
              device_type: 'p',
              offer_url: 'https://moppy.jp/offer/123',
              affiliate_url: 'https://moppy.jp/invite/?invite=●●●',
              last_checked: new Date().toISOString()
            },
            {
              id: '4',
              point_site: {
                id: '4',
                name: 'ECナビ',
                url: 'https://ecnavi.jp/'
              },
              offer: {
                id: '1',
                name: searchQuery,
                description: `${searchQuery}の案件説明`
              },
              reward_amount: 7500,
              reward_unit: '円',
              device_type: 's',
              offer_url: 'https://ecnavi.jp/offer/123',
              affiliate_url: 'https://ecnavi.jp/invite/?id=●●●',
              last_checked: new Date().toISOString()
            }
          ];
          setResults(mockResults);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('検索結果の取得中にエラーが発生しました。しばらく経ってからもう一度お試しください。');
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [searchQuery, selectedSites]);
  
  // デバイスタイプのアイコンを取得
  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'p':
        return <DeviceIcon title="PC限定">💻</DeviceIcon>;
      case 's':
        return <DeviceIcon title="スマホ限定">📱</DeviceIcon>;
      case 'i':
        return <DeviceIcon title="iOS限定">🍎</DeviceIcon>;
      case 'a':
        return <DeviceIcon title="Android限定">🤖</DeviceIcon>;
      default:
        return null;
    }
  };
  
  return (
    <ResultsContainer>
      <SearchHeader>
        <SearchTitle>「{searchQuery}」の検索結果</SearchTitle>
        {!loading && !error && (
          <ResultCount>{results.length}件のポイントサイト案件が見つかりました</ResultCount>
        )}
      </SearchHeader>
      
      {loading && (
        <LoadingMessage>検索結果を読み込んでいます...</LoadingMessage>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {!loading && !error && results.length === 0 && (
        <NoResultsMessage>
          「{searchQuery}」に一致する案件は見つかりませんでした。
          <br />
          別のキーワードで検索してみてください。
        </NoResultsMessage>
      )}
      
      {!loading && !error && results.length > 0 && (
        <ResultsTable>
          <TableHead>
            <tr>
              <TableHeader>報酬額</TableHeader>
              <TableHeader>ポイントサイト</TableHeader>
              <TableHeader>案件名</TableHeader>
              <TableHeader>デバイス</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <RewardAmount>
                    {result.reward_amount.toLocaleString()} {result.reward_unit}
                  </RewardAmount>
                </TableCell>
                <TableCell>
                  <SiteLink 
                    href={result.affiliate_url || result.offer_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.point_site.name}
                  </SiteLink>
                </TableCell>
                <TableCell>{result.offer.name}</TableCell>
                <TableCell>{getDeviceIcon(result.device_type)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </ResultsTable>
      )}
    </ResultsContainer>
  );
};

export default SearchResultsPage;
