const scrapeInsomniaAdsFrom = require('./scrapeInsomniaAdsFrom');
const {herokuApp} = require('../configuration.json');
const Log = require('./Log.class');
const Mailer = require('./Mailer.class');
const https = require('https');
const {newDataHandler} = require('./newDataHandler');
const {
  adUrls,
  adsCheckIntervalInMinutes,
} = require('./../configuration.json');

const serverStart = () => {
  Log.serverInitialization(Mailer.serverStartUpMail);
  const dataScraped = {};
  adUrls.forEach((url) => scrapeInsomniaAdsFrom(url).then((c) =>
    onNewDataHandler(c.data.ads, c.data.categoryName, dataScraped, true)));


  setInterval(() => {
    adUrls.forEach((url) => scrapeInsomniaAdsFrom(url).then((c) => {
      // If Heroku app is enabled it will ping it self to keep it's dyno awake
      if (herokuApp.enabled) {
        https.get(herokuApp.url);
      }
      newDataHandler(c.data.ads, c.data.categoryName, dataScraped);
    }));
  }, adsCheckIntervalInMinutes * 60000);
};

module.exports = {serverStart};
