const scrapeInsomniaAdsFrom = require('./libs/scrapeInsomniaAdsFrom');
const _ = require('lodash');

const nintendoConsolesURL = 'https://www.insomnia.gr/classifieds/category/32-nintendo-consoles/?filter=classifieds_type_1';

const getNintendoConsoleAds = (scrapeInsomniaAdsFrom(nintendoConsolesURL));

const testHandler = (ads) => {
  const adsCopy = _.cloneDeep(ads);
  adsCopy[0].link = 'http://test.com';
  console.log(_.differenceBy(ads, adsCopy, 'link'));
};
getNintendoConsoleAds.then((c) => testHandler(c.data.ads));
