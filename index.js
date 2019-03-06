const scrapeInsomniaAdsFrom = require('./libs/scrapeInsomniaAdsFrom');
const Log = require('./libs/Log.class');
const _ = require('lodash');
const SystemNotification = require('./libs/SystemNotification.class');
const Mailer = require('./libs/Mailer.class');

const nintendoConsolesURL = 'https://www.insomnia.gr/classifieds/category/32-nintendo-consoles/?filter=classifieds_type_1';
const nintendoGamesURL = 'https://www.insomnia.gr/classifieds/category/96-nintendo-games/?filter=classifieds_type_1';

const dataScraped = {
  consolesScrapped: [],
  gamesScrapped: [],
};

const newDataHandler = (incomingAds, categoryName, firstTime = false) => {
  const existingAds = _.cloneDeep((categoryName === 'Consoles') ?
    dataScraped.consolesScrapped : dataScraped.gamesScrapped);
  const newAds = _.differenceBy(incomingAds, existingAds, 'link');
  const numberOfNewAds = newAds.length;

  if (numberOfNewAds === 0) return;

  (categoryName === 'Consoles') ?
    dataScraped.consolesScrapped = incomingAds :
    dataScraped.gamesScrapped = incomingAds;
  Log.general(
      `${numberOfNewAds} NEW ${categoryName} ads. Sending notification...`
  );
  SystemNotification.newAds(numberOfNewAds, categoryName);

  if (firstTime) return;
  const mailer = new Mailer;
  mailer.sendNewAds(categoryName, newAds);
};

scrapeInsomniaAdsFrom(nintendoConsolesURL).then((c) =>
  newDataHandler(c.data.ads, 'Consoles', true));
scrapeInsomniaAdsFrom(nintendoGamesURL).then((c) =>
  newDataHandler(c.data.ads, 'Games', true));

setInterval(() => {
  scrapeInsomniaAdsFrom(nintendoConsolesURL).then((c) =>
    newDataHandler(c.data.ads, 'Consoles'));
  scrapeInsomniaAdsFrom(nintendoGamesURL).then((c) =>
    newDataHandler(c.data.ads, 'Games'));
}, 300000);
