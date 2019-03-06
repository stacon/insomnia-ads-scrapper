const notifier = require('node-notifier');

/**
 * Class to raise System Notifications for new Ads
 */
class SystemNotification {
  /**
   * @param {Number} numberOfNewAds A number representing the number of new ads
   * @param {*} categoryName Category name string
   */
  static newAds(numberOfNewAds, categoryName) {
    notifier.notify({
      title: `New Insomnia Ads`,
      message: `${numberOfNewAds} new ads appeared at Insomnia Nintendo ${categoryName}`,
      sound: true,
    });
  }
}

module.exports = SystemNotification;
