import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResultsPage from '../pages/SearchResultsPage';

// モックのuseLocationを作成
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?q=テスト検索'
  })
}));

test('検索結果ページが正しくレンダリングされる', () => {
  render(
    <BrowserRouter>
      <SearchResultsPage />
    </BrowserRouter>
  );
  
  // 検索クエリが表示されていることを確認
  expect(screen.getByText(/「テスト検索」の検索結果/i)).toBeInTheDocument();
  
  // 読み込み中のメッセージが表示されていることを確認
  expect(screen.getByText(/検索結果を読み込んでいます/i)).toBeInTheDocument();
});
