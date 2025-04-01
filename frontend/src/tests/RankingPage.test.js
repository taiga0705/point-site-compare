import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RankingPage from '../pages/RankingPage';

test('ランキングページが正しくレンダリングされる', () => {
  render(
    <BrowserRouter>
      <RankingPage />
    </BrowserRouter>
  );
  
  // タイトルが表示されていることを確認
  expect(screen.getByText(/検索ランキング/i)).toBeInTheDocument();
  
  // 期間選択ボタンが表示されていることを確認
  expect(screen.getByRole('button', { name: /午前/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /午後/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /今日/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /今週/i })).toBeInTheDocument();
  
  // 読み込み中のメッセージが表示されていることを確認
  expect(screen.getByText(/ランキング情報を読み込んでいます/i)).toBeInTheDocument();
});
