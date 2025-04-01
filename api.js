const express = require('express');
const router = express.Router();
const SearchEngine = require('../utils/searchEngine');
const searchEngine = new SearchEngine();

// 検索API
router.get('/search', async (req, res) => {
  try {
    const { q, sites } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: '検索クエリが必要です' });
    }
    
    // IPアドレスのハッシュ化（実際の実装ではより安全な方法を使用）
    const ipHash = req.ip.replace(/\./g, '');
    
    // 検索ログを記録
    await searchEngine.logSearch(q, ipHash);
    
    // サイトIDの配列を作成
    const siteIds = sites ? sites.split(',') : [];
    
    // 検索を実行
    const results = await searchEngine.search(q, siteIds);
    
    res.json({
      query: q,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: '検索中にエラーが発生しました' });
  }
});

// ポイントサイト一覧API
router.get('/sites', async (req, res) => {
  try {
    const PointSite = require('../models/pointSite');
    const sites = await PointSite.find({ active: true }).sort({ priority: -1, name: 1 });
    
    res.json(sites);
  } catch (error) {
    console.error('Sites API error:', error);
    res.status(500).json({ error: 'ポイントサイト情報の取得中にエラーが発生しました' });
  }
});

// ランキング取得API
router.get('/ranking', async (req, res) => {
  try {
    const { period = 'day', limit = 50 } = req.query;
    
    // 有効な期間かチェック
    const validPeriods = ['am', 'pm', 'day', 'week'];
    if (!validPeriods.includes(period)) {
      return res.status(400).json({ error: '無効な期間パラメータです' });
    }
    
    // 有効な上限値かチェック
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum <= 0 || limitNum > 100) {
      return res.status(400).json({ error: '無効な上限パラメータです' });
    }
    
    // ランキングを取得
    const ranking = await searchEngine.getSearchRanking(period, limitNum);
    
    res.json({
      period,
      count: ranking.length,
      ranking
    });
  } catch (error) {
    console.error('Ranking API error:', error);
    res.status(500).json({ error: 'ランキング情報の取得中にエラーが発生しました' });
  }
});

module.exports = router;
