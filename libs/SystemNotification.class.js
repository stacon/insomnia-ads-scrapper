const notifier = require('node-notifier');
const {windowsPopUpNotifications} = require('./../configuration.json');

/**
 * Class to raise System Notifications for new Ads
 */
class SystemNotification {
  /**
   * @param {Number} numberOfNewAds A number representing the number of new ads
   * @param {*} categoryName Category name string
   */
  static newAds(numberOfNewAds, categoryName) {
    if (!windowsPopUpNotifications.enabled) return;
    notifier.notify({
      title: `New Insomnia Ads`,
      message:
        numberOfNewAds +
        'new ads appeared at Insomnia ' +
        categoryName,
      sound: windowsPopUpNotifications.withSound,
    });
  }
}

module.exports = SystemNotification;
