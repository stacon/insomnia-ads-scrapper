const scrapeInsomniaAdsFrom = require('./scrapeInsomniaAdsFrom');
const Log = require('./Log.class');
const https = require("https");
const { newDataHandler } = require('./newDataHandler');
const {
  adUrls,
  adsCheckIntervalInMinutes,
} = require('./../configuration.json');

const serverStart = () => {
  Log.serverInitialization();
  const dataScraped = {};
  adUrls.forEach((url) => scrapeInsomniaAdsFrom(url).then((c) =>
    newDataHandler(c.data.ads, c.data.categoryName, dataScraped, true)));

  setInterval(() => {
    adUrls.forEach((url) => scrapeInsomniaAdsFrom(url).then((c) => {
      https.get("https://intense-ridge-99767.herokuapp.com");
      newDataHandler(c.data.ads, c.data.categoryName, dataScraped)
    }));
  }, adsCheckIntervalInMinutes * 60000);
};

module.exports = { serverStart };
