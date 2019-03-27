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

  // Notifications, Logs and e-mails are disabled on the first fetch
  if (firstTime) return;
  Log.general(
      `${numberOfNewAds} NEW ${categoryName} ads. Sending notification...`
  );
  SystemNotification.newAds(numberOfNewAds, categoryName);
  Mailer.sendNewAds(categoryName, newAds);
};

module.exports = {newDataHandler};
