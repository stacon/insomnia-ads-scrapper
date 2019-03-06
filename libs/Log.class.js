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
}

module.exports = Log;
