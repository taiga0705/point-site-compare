import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
  
  &:focus {
    border-color: #4a6da7;
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
`;

const SearchButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a6da7;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a5d97;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 4px;
  }
`;

const ExampleSearches = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ExampleTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ExampleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const ExampleItem = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleExampleClick = (example) => {
    setSearchQuery(example);
    navigate(`/search?q=${encodeURIComponent(example)}`);
  };
  
  const exampleSearches = [
    '楽天カード',
    'Amazonプライム',
    'U-NEXT',
    'dカード',
    'PayPayカード',
    'ビックカメラ',
    'ふるさと納税',
    'Hulu',
    'ソフトバンク光'
  ];
  
  return (
    <HomeContainer>
      <Title>ポイントサイト比較 | どこがお得？</Title>
      <Subtitle>
        案件名を検索すると、各ポイントサイトの報酬額を一覧表示。
        どのポイントサイト経由がお得か簡単に比較できます。
      </Subtitle>
      
      <SearchForm onSubmit={handleSubmit}>
        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder="案件名を入力（例：楽天カード、Amazonプライム）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">検索</SearchButton>
        </SearchInputContainer>
      </SearchForm>
      
      <ExampleSearches>
        <ExampleTitle>人気の検索</ExampleTitle>
        <ExampleList>
          {exampleSearches.map((example, index) => (
            <ExampleItem
              key={index}
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </ExampleItem>
          ))}
        </ExampleList>
      </ExampleSearches>
    </HomeContainer>
  );
};

export default HomePage;
