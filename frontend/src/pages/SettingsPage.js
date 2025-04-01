import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SettingsContainer = styled.div`
  padding: 1rem;
`;

const SettingsTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const SettingsDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const SiteListContainer = styled.div`
  margin-bottom: 2rem;
`;

const SiteListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SiteListTitle = styled.h2`
  font-size: 1.4rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.primary ? '#4a6da7' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: 1px solid ${props => props.primary ? '#4a6da7' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a5d97' : '#e0e0e0'};
  }
`;

const SiteList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SiteItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: ${props => props.selected ? '#f0f7ff' : 'white'};
  border-color: ${props => props.selected ? '#4a6da7' : '#ddd'};
`;

const Checkbox = styled.input`
  margin-right: 0.8rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const SiteName = styled.label`
  font-size: 1rem;
  cursor: pointer;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SaveButton = styled(Button)`
  padding: 0.8rem 2rem;
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
  padding: 1rem;
  font-size: 1rem;
  color: #d9534f;
  background-color: #f9f2f2;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: #28a745;
  background-color: #f0fff4;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// APIのベースURL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SettingsPage = () => {
  const [sites, setSites] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // ポイントサイト一覧を取得
  useEffect(() => {
    const fetchSites = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 実際のAPIが実装されるまでのモックデータ
        // 実装後は以下のコメントアウトを解除してAPIを呼び出す
        /*
        const response = await axios.get(`${API_BASE_URL}/sites`);
        setSites(response.data);
        */
        
        // モックデータ（開発用）
        setTimeout(() => {
          const mockSites = [
            { id: '1', name: 'ポイントインカム', url: 'https://pointi.jp/', active: true, priority: 10 },
            { id: '2', name: 'ハピタス', url: 'https://hapitas.jp/', active: true, priority: 9 },
            { id: '3', name: 'モッピー', url: 'https://moppy.jp/', active: true, priority: 8 },
            { id: '4', name: 'ECナビ', url: 'https://ecnavi.jp/', active: true, priority: 7 },
            { id: '5', name: 'アメフリ', url: 'https://amefri.jp/', active: true, priority: 6 },
            { id: '6', name: 'ワラウ', url: 'https://www.warau.jp/', active: true, priority: 5 },
            { id: '7', name: 'ポイントタウン', url: 'https://pointtown.com/', active: true, priority: 4 },
            { id: '8', name: 'ニフティポイントクラブ', url: 'https://point.nifty.com/', active: true, priority: 3 },
            { id: '9', name: 'GetMoney!', url: 'https://getmoney.jp/', active: true, priority: 2 },
            { id: '10', name: 'Powl', url: 'https://powl.jp/', active: true, priority: 1 },
            { id: '11', name: 'ちょびリッチ', url: 'https://www.chobirich.com/', active: true, priority: 0 },
            { id: '12', name: 'げん玉', url: 'https://www.gendama.jp/', active: true, priority: 0 }
          ];
          setSites(mockSites);
          
          // ローカルストレージから選択状態を復元
          const savedSites = localStorage.getItem('selectedSites');
          if (savedSites) {
            setSelectedSites(JSON.parse(savedSites));
          } else {
            // デフォルトですべて選択
            setSelectedSites(mockSites.map(site => site.id));
          }
          
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching sites:', err);
        setError('ポイントサイト情報の取得中にエラーが発生しました。');
        setLoading(false);
      }
    };
    
    fetchSites();
  }, []);
  
  // サイト選択の切り替え
  const handleSiteToggle = (siteId) => {
    setSelectedSites(prevSelected => {
      if (prevSelected.includes(siteId)) {
        return prevSelected.filter(id => id !== siteId);
      } else {
        return [...prevSelected, siteId];
      }
    });
  };
  
  // すべて選択
  const selectAll = () => {
    setSelectedSites(sites.map(site => site.id));
  };
  
  // すべて解除
  const deselectAll = () => {
    setSelectedSites([]);
  };
  
  // 設定を保存
  const saveSettings = () => {
    try {
      // ローカルストレージに保存
      localStorage.setItem('selectedSites', JSON.stringify(selectedSites));
      
      // 実際のAPIが実装されたら以下のコメントアウトを解除
      /*
      await axios.post(`${API_BASE_URL}/settings`, {
        sites: selectedSites
      });
      */
      
      setSuccessMessage('設定を保存しました');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('設定の保存中にエラーが発生しました。');
    }
  };
  
  return (
    <SettingsContainer>
      <SettingsTitle>検索対象ポイントサイト設定</SettingsTitle>
      <SettingsDescription>
        検索対象とするポイントサイトを選択してください。選択したポイントサイトのみが検索結果に表示されます。
      </SettingsDescription>
      
      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {loading ? (
        <LoadingMessage>ポイントサイト情報を読み込んでいます...</LoadingMessage>
      ) : (
        <>
          <SiteListContainer>
            <SiteListHeader>
              <SiteListTitle>ポイントサイト一覧</SiteListTitle>
              <ButtonGroup>
                <Button onClick={selectAll}>すべて選択</Button>
                <Button onClick={deselectAll}>すべて解除</Button>
              </ButtonGroup>
            </SiteListHeader>
            
            <SiteList>
              {sites.map(site => (
                <SiteItem 
                  key={site.id} 
                  selected={selectedSites.includes(site.id)}
                >
                  <Checkbox
                    type="checkbox"
                    id={`site-${site.id}`}
                    checked={selectedSites.includes(site.id)}
                    onChange={() => handleSiteToggle(site.id)}
                  />
                  <SiteName htmlFor={`site-${site.id}`}>
                    {site.name}
                  </SiteName>
                </SiteItem>
              ))}
            </SiteList>
          </SiteListContainer>
          
          <SaveButtonContainer>
            <SaveButton primary onClick={saveSettings}>
              設定を保存
            </SaveButton>
          </SaveButtonContainer>
        </>
      )}
    </SettingsContainer>
  );
};

export default SettingsPage;
