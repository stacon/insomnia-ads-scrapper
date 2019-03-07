const {
  email,
  adsCheckIntervalInMinutes,
  windowsPopUpNotifications,
} = require('./../configuration.json');

const Mailer = require('./Mailer.class');
/**
 * Class Log for logging specific information in the console
 */
class Log {
  /**
  * @param {String} categoryName
  * @param {Number} newAdsNumber
  * @return {Function} a log of new adds in the console
  */
  static incomingAds(categoryName, newAdsNumber) {
    return Log.general(`${categoryName} have ${newAdsNumber} NEW ads`);
  }

  /**
  * @param {String} text
  */
  static general(text) {
    console.log(new Date().toUTCString() + ' - ' + text);
  }

  /**
  * @param {String} text
  * @return {Function} a log of new adds in the console
  */
  static error(text) {
    return Log.general(`ERROR: ${text}`);
  }

  /**
  * Server Initialization message
  */
  static serverInitialization() {
    console.log('\n');
    Log.general('Server is starting up...');
    Log.general('Server configuration');
    Log.general(`E-mail to notify: ${email}`);
    Log.general(`Ads Check Interval: ${adsCheckIntervalInMinutes}`);
    if (windowsPopUpNotifications.enabled) {
      Log.general('Notifications are enabled with' +
        (windowsPopUpNotifications.withSound ? '' : 'out') +
        ' sound'
      );
    }
    Log.general(
        'This window needs to remain open (or minimized)' +
        ', in order to keep the service running'
    );
    console.log('\n');
    const mailer = new Mailer;
    mailer.sendCustomMail('Insomnia Ads Notification Server Started');
  }
}

module.exports = Log;
