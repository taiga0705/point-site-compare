require('dotenv').config();
const mongoose = require('mongoose');
const { pointSites, affiliateLinks } = require('./data/initialData');
const PointSite = require('./models/pointSite');
const AffiliateLink = require('./models/affiliateLink');

// MongoDB接続
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/point-site-compare';

// アフィリエイトリンク管理システムの初期化
async function initializeAffiliateSystem() {
  try {
    // MongoDBに接続
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    // ポイントサイトの登録
    console.log('Registering point sites...');
    for (const site of pointSites) {
      // 既存のサイトを確認
      const existingSite = await PointSite.findOne({ name: site.name });
      
      if (existingSite) {
        console.log(`Point site ${site.name} already exists, updating...`);
        await PointSite.updateOne({ _id: existingSite._id }, site);
      } else {
        console.log(`Adding new point site: ${site.name}`);
        await PointSite.create(site);
      }
    }
    
    // 登録されたポイントサイトを取得
    const registeredSites = await PointSite.find();
    console.log(`${registeredSites.length} point sites registered`);
    
    // アフィリエイトリンクの登録
    console.log('Registering affiliate links...');
    for (const link of affiliateLinks) {
      // 対応するポイントサイトを検索
      const site = registeredSites.find(s => s.name === link.point_site_name);
      
      if (!site) {
        console.log(`Point site not found for affiliate link: ${link.point_site_name}`);
        continue;
      }
      
      // 既存のアフィリエイトリンクを確認
      const existingLink = await AffiliateLink.findOne({ point_site_id: site._id });
      
      if (existingLink) {
        console.log(`Affiliate link for ${link.point_site_name} already exists, updating...`);
        await AffiliateLink.updateOne(
          { _id: existingLink._id },
          { 
            affiliate_url: link.affiliate_url,
            active: link.active,
            description: link.description
          }
        );
      } else {
        console.log(`Adding new affiliate link for: ${link.point_site_name}`);
        await AffiliateLink.create({
          point_site_id: site._id,
          affiliate_url: link.affiliate_url,
          active: link.active,
          description: link.description
        });
      }
    }
    
    // 登録されたアフィリエイトリンクを取得
    const registeredLinks = await AffiliateLink.find();
    console.log(`${registeredLinks.length} affiliate links registered`);
    
    console.log('Affiliate system initialization completed');
  } catch (error) {
    console.error('Error initializing affiliate system:', error);
  } finally {
    // 接続を閉じる
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 初期化を実行
initializeAffiliateSystem();
