import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsPage from '../pages/SettingsPage';

test('設定ページが正しくレンダリングされる', () => {
  render(<SettingsPage />);
  
  // タイトルが表示されていることを確認
  expect(screen.getByText(/検索対象ポイントサイト設定/i)).toBeInTheDocument();
  
  // 説明文が表示されていることを確認
  expect(screen.getByText(/検索対象とするポイントサイトを選択してください/i)).toBeInTheDocument();
  
  // 読み込み中のメッセージが表示されていることを確認
  expect(screen.getByText(/ポイントサイト情報を読み込んでいます/i)).toBeInTheDocument();
});
