import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

test('ホームページが正しくレンダリングされる', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  
  // タイトルが表示されていることを確認
  expect(screen.getByText(/ポイントサイト比較 \| どこがお得？/i)).toBeInTheDocument();
  
  // 検索フォームが表示されていることを確認
  expect(screen.getByPlaceholderText(/案件名を入力/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /検索/i })).toBeInTheDocument();
  
  // 人気の検索が表示されていることを確認
  expect(screen.getByText(/人気の検索/i)).toBeInTheDocument();
});
