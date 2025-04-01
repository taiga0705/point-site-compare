const mongoose = require('mongoose');
const PointSite = require('../models/pointSite');
const Offer = require('../models/offer');
const Reward = require('../models/reward');
const AffiliateLink = require('../models/affiliateLink');
const SearchLog = require('../models/searchLog');

class SearchEngine {
  constructor() {
    // キーワード正規化のための置換マップ
    this.replacementMap = {
      // 全角→半角
      'ａ': 'a', 'ｂ': 'b', 'ｃ': 'c', 'ｄ': 'd', 'ｅ': 'e', 'ｆ': 'f', 'ｇ': 'g', 'ｈ': 'h', 'ｉ': 'i', 'ｊ': 'j',
      'ｋ': 'k', 'ｌ': 'l', 'ｍ': 'm', 'ｎ': 'n', 'ｏ': 'o', 'ｐ': 'p', 'ｑ': 'q', 'ｒ': 'r', 'ｓ': 's', 'ｔ': 't',
      'ｕ': 'u', 'ｖ': 'v', 'ｗ': 'w', 'ｘ': 'x', 'ｙ': 'y', 'ｚ': 'z',
      'Ａ': 'A', 'Ｂ': 'B', 'Ｃ': 'C', 'Ｄ': 'D', 'Ｅ': 'E', 'Ｆ': 'F', 'Ｇ': 'G', 'Ｈ': 'H', 'Ｉ': 'I', 'Ｊ': 'J',
      'Ｋ': 'K', 'Ｌ': 'L', 'Ｍ': 'M', 'Ｎ': 'N', 'Ｏ': 'O', 'Ｐ': 'P', 'Ｑ': 'Q', 'Ｒ': 'R', 'Ｓ': 'S', 'Ｔ': 'T',
      'Ｕ': 'U', 'Ｖ': 'V', 'Ｗ': 'W', 'Ｘ': 'X', 'Ｙ': 'Y', 'Ｚ': 'Z',
      '０': '0', '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
      '　': ' ', '！': '!', '＃': '#', '＄': '$', '％': '%', '＆': '&', '（': '(', '）': ')', '＊': '*', '＋': '+',
      '，': ',', '－': '-', '．': '.', '／': '/',
      
      // ひらがな→カタカナ変換は省略（実際の実装では追加）
      
      // 濁点処理
      'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
      'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
      'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
      'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
      'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ',
      'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
      'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
      'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
      'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ',
      'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ'
    };
  }

  // キーワード正規化
  normalizeKeywords(query) {
    // 小文字に変換
    let normalizedQuery = query.toLowerCase();
    
    // 全角→半角、ひらがな→カタカナ、濁点除去などの変換
    for (const [key, value] of Object.entries(this.replacementMap)) {
      normalizedQuery = normalizedQuery.replace(new RegExp(key, 'g'), value);
    }
    
    return normalizedQuery;
  }
  
  // 検索実行
  async search(query, siteIds = []) {
    try {
      const normalizedQuery = this.normalizeKeywords(query);
      const keywords = normalizedQuery.split(' ').filter(k => k.length > 0);
      
      // キーワードに基づいてオファーを検索
      const searchConditions = {
        $or: [
          { keywords: { $regex: keywords.join('|'), $options: 'i' } },
          { name: { $regex: keywords.join('|'), $options: 'i' } }
        ]
      };
      
      const offers = await Offer.find(searchConditions);
      
      if (offers.length === 0) {
        return [];
      }
      
      // 検索結果のオファーIDを取得
      const offerIds = offers.map(offer => offer._id);
      
      // 報酬情報を取得するための条件
      const rewardConditions = {
        offer_id: { $in: offerIds }
      };
      
      // 特定のポイントサイトに限定する場合
      if (siteIds && siteIds.length > 0) {
        rewardConditions.point_site_id = { $in: siteIds };
      }
      
      // 報酬情報を取得し、ポイントサイト情報とオファー情報を結合
      const rewards = await Reward.find(rewardConditions)
        .populate('point_site_id')
        .populate('offer_id')
        .sort({ reward_amount: -1 }); // 報酬額の降順でソート
      
      // アフィリエイトリンク情報を取得
      const pointSiteIds = rewards.map(reward => reward.point_site_id._id);
      const affiliateLinks = await AffiliateLink.find({
        point_site_id: { $in: pointSiteIds },
        active: true
      });
      
      // 結果を整形
      const results = rewards.map(reward => {
        // 該当するアフィリエイトリンクを探す
        const affiliateLink = affiliateLinks.find(
          link => link.point_site_id.toString() === reward.point_site_id._id.toString()
        );
        
        return {
          id: reward._id,
          point_site: {
            id: reward.point_site_id._id,
            name: reward.point_site_id.name,
            url: reward.point_site_id.url
          },
          offer: {
            id: reward.offer_id._id,
            name: reward.offer_id.name,
            description: reward.offer_id.description
          },
          reward_amount: reward.reward_amount,
          reward_unit: reward.reward_unit,
          device_type: reward.device_type,
          offer_url: reward.offer_url,
          affiliate_url: affiliateLink ? affiliateLink.affiliate_url : null,
          last_checked: reward.last_checked
        };
      });
      
      return results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }
  
  // 検索ログを記録
  async logSearch(query, ipHash) {
    try {
      const searchLog = new SearchLog({
        search_term: query,
        search_time: new Date(),
        ip_hash: ipHash
      });
      
      await searchLog.save();
    } catch (error) {
      console.error('Log search error:', error);
      // ログ記録のエラーは無視して検索処理は続行
    }
  }
  
  // ランキングを取得
  async getSearchRanking(period = 'day', limit = 50) {
    try {
      const now = new Date();
      let startDate;
      
      // 期間に応じて開始日時を設定
      switch (period) {
        case 'am':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
          now.setHours(11, 59, 59, 999);
          break;
        case 'pm':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
          break;
        case 'day':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
          break;
        case 'week':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 7);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      }
      
      // 検索ログから集計
      const ranking = await SearchLog.aggregate([
        {
          $match: {
            search_time: { $gte: startDate, $lte: now }
          }
        },
        {
          $group: {
            _id: '$search_term',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: limit
        }
      ]);
      
      return ranking.map(item => ({
        search_term: item._id,
        count: item.count
      }));
    } catch (error) {
      console.error('Get ranking error:', error);
      throw error;
    }
  }
}

module.exports = SearchEngine;
