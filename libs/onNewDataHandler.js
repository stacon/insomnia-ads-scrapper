const Log = require('./Log.class');
const _ = require('lodash');
const SystemNotification = require('./SystemNotification.class');
const Mailer = require('./Mailer.class');

/**
 * @void Void actions to be taken upon new Ads arrival
 * @param {any} incomingAds Object as defined on scrapeIt from scrapeInsomniaAdsFrom function
 * @param {String} categoryName Category mail to be attached to the notifications and to classiffy the ads
 * @param {any} dataScraped Object that hold existing data by mutating dataScraped Object
 * @param {boolean} firstTime When it's the first time that this function is used notifications will not trigger
 */
const onNewDataHandler = (
    incomingAds,
    categoryName,
    dataScraped,
    firstTime = false
) => {
  const existingAds = _.cloneDeep(dataScraped[categoryName]);

  // The line below avoids title changes to be considered as new ads
  const newAds = _.differenceBy(incomingAds, existingAds, 'link');
  const numberOfNewAds = newAds.length;

  // Flow stops if there are no new ads in the category
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

module.exports = {onNewDataHandler};
