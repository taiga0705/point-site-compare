// ポイントサイトの初期データ
const pointSites = [
  {
    name: 'ポイントインカム',
    url: 'https://pointi.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 10
  },
  {
    name: 'ハピタス',
    url: 'https://hapitas.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 9
  },
  {
    name: 'モッピー',
    url: 'https://moppy.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 8
  },
  {
    name: 'ECナビ',
    url: 'https://ecnavi.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 7
  },
  {
    name: 'アメフリ',
    url: 'https://amefri.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 6
  },
  {
    name: 'ワラウ',
    url: 'https://www.warau.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 5
  },
  {
    name: 'ポイントタウン',
    url: 'https://pointtown.com/',
    affiliate_url_template: '',
    active: true,
    priority: 4
  },
  {
    name: 'ニフティポイントクラブ',
    url: 'https://point.nifty.com/',
    affiliate_url_template: '',
    active: true,
    priority: 3
  },
  {
    name: 'GetMoney!',
    url: 'https://getmoney.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 2
  },
  {
    name: 'Powl',
    url: 'https://powl.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 1
  },
  {
    name: 'ちょびリッチ',
    url: 'https://www.chobirich.com/',
    affiliate_url_template: '',
    active: true,
    priority: 0
  },
  {
    name: 'げん玉',
    url: 'https://www.gendama.jp/',
    affiliate_url_template: '',
    active: true,
    priority: 0
  }
];

// アフィリエイトリンクの初期データ
// ユーザーから提供されたアフィリエイトリンク
const affiliateLinks = [
  {
    point_site_name: 'ポイントインカム',
    affiliate_url: 'https://sp.pointi.jp/p/?a=rbf880940292',
    active: true,
    description: 'ポイントインカムのアフィリエイトリンク'
  },
  {
    point_site_name: 'ハピタス',
    affiliate_url: 'https://hapitas.jp/register/?i=20366638&route=text',
    active: true,
    description: 'ハピタスのアフィリエイトリンク'
  },
  {
    point_site_name: 'モッピー',
    affiliate_url: 'https://pc.moppy.jp/entry/invite.php?invite=ydb8e161',
    active: true,
    description: 'モッピーのアフィリエイトリンク'
  },
  {
    point_site_name: 'ECナビ',
    affiliate_url: 'https://ecnavi.jp/invite/?id=v89si',
    active: true,
    description: 'ECナビのアフィリエイトリンク'
  },
  {
    point_site_name: 'アメフリ',
    affiliate_url: 'https://www.amefri.net/register?inv=f193193',
    active: true,
    description: 'アメフリのアフィリエイトリンク'
  },
  {
    point_site_name: 'ワラウ',
    affiliate_url: 'https://www.warau.jp/friend/reg/5PB1',
    active: true,
    description: 'ワラウのアフィリエイトリンク'
  },
  {
    point_site_name: 'ポイントタウン',
    affiliate_url: 'https://www.pointtown.com/registration?intrid=nMe9z9Q4nVAtY',
    active: true,
    description: 'ポイントタウンのアフィリエイトリンク'
  },
  {
    point_site_name: 'ニフティポイントクラブ',
    affiliate_url: 'https://lifemedia.jp/entry/3523358/welcome',
    active: true,
    description: 'ニフティポイントのアフィリエイトリンク'
  },
  {
    point_site_name: 'GetMoney!',
    affiliate_url: 'https://dietnavi.com/pc/special/startup/sp/?id=3339572',
    active: true,
    description: 'げっとまのアフィリエイトリンク'
  },
  {
    point_site_name: 'Powl',
    affiliate_url: 'https://web.powl.jp/?invite_code=PYPDUQB8P8B',
    active: true,
    description: 'Powlのアフィリエイトリンク'
  },
  {
    point_site_name: 'ちょびリッチ',
    affiliate_url: 'https://www.chobirich.com/cm/ad/?p=8225208671&i=4070561',
    active: true,
    description: 'ちょびリッチのアフィリエイトリンク'
  },
  {
    point_site_name: 'げん玉',
    affiliate_url: 'https://www.gendama.jp/invite/?frid=6369092&ref=90000-url',
    active: true,
    description: 'げん玉のアフィリエイトリンク'
  }
];

module.exports = {
  pointSites,
  affiliateLinks
};
