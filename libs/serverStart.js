const scrapeInsomniaAdsFrom = require('./scrapeInsomniaAdsFrom');
const Log = require('./Log.class');
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
    adUrls.forEach((url) => scrapeInsomniaAdsFrom(url).then((c) =>
      newDataHandler(c.data.ads, c.data.categoryName, dataScraped)));
  }, adsCheckIntervalInMinutes * 60000);

  const http = require("http");
  setInterval(() => {
    http.get("https://intense-ridge-99767.herokuapp.com");
  }, 300000)
};

module.exports = { serverStart };
