const {
  receiverEmail,
  adsCheckIntervalInMinutes,
  windowsPopUpNotifications,
} = require('./../configuration.json');

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
    console.log(`${new Date().toLocaleString()} - ${text}`);
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
  static serverInitialization(callBackFn = null) {
    console.log('\n');
    Log.general('Server is starting up...');
    Log.general('Server configuration');
    Log.general(`E-mail to notify: ${receiverEmail}`);
    Log.general(`Ads Check Interval (in minutes): ${adsCheckIntervalInMinutes}`);
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
    callBackFn ? callBackFn() : null;
  }
}

module.exports = Log;
