const Log = require('./Log.class');
const nodemailer = require('nodemailer');
const config = require('./../configuration.json');

const {
  host, port, secure, username: user, password: pass, receiverEmail,
} = config.transporter;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
});

const mailOptions = {
  from: `Insomnia Ads Notifier <${user}>`,
  to: receiverEmail,
};

/**
 * Mailer Sends notification emails
 */
class Mailer {
  /**
   * @param {String} categoryName Category name string
   * @param {Ads} newAds A number of new Ads
   */
  sendNewAds(categoryName, newAds) {
    const text = newAds.map((ad) => (
      'Τίτλος: ' + ad.title + '\n' +
      'Τιμή: ' + ad.price + '\n' +
      'Πωλητής: ' + ad.seller + '\n' +
      'Σύνδεσμος αγγελίας: ' +ad.link + '\n\n'
    )).join('');

    const mailOptionsToSend = {
      ...mailOptions,
      subject: `${newAds.length} new ads on ${categoryName}`,
      text,
    };

    transporter.sendMail(mailOptionsToSend)
        .then(() => Log.general(
            'Mail for ' +newAds.length +
            ' NEW ' + categoryName +
            ' Sent Successfully'))
        .catch((e) => Log.error(
            `Sending email for ${categoryName} ads failed reason: ${e}`
        ));
  }
  /**
   * @param {*} subject
   * @param {*} text
   */
  sendCustomMail(subject = '', text = '') {
    const mailOptionsToSend = {
      ...mailOptions,
      subject,
      text,
    };

    transporter.sendMail(mailOptionsToSend)
        .catch((e) => Log.error(
            `Sending email failed reason: ${e}`
        ));
  }
}

module.exports = Mailer;
