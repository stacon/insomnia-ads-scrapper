const Log = require('./Log.class');
const _ = require('lodash');
const SystemNotification = require('./SystemNotification.class');
const Mailer = require('./Mailer.class');

const newDataHandler = (
    incomingAds,
    categoryName,
    dataScraped,
    firstTime = false
) => {
  const existingAds = _.cloneDeep(dataScraped[categoryName]);
  const newAds = _.differenceBy(incomingAds, existingAds, 'link');
  const numberOfNewAds = newAds.length;

  if (numberOfNewAds === 0) return;

  dataScraped[categoryName] = incomingAds;
  Log.general(
      `${numberOfNewAds} NEW ${categoryName} ads. Sending notification...`
  );
  SystemNotification.newAds(numberOfNewAds, categoryName);

  if (firstTime) return;
  const mailer = new Mailer;
  mailer.sendNewAds(categoryName, newAds);
};

module.exports = {newDataHandler};
