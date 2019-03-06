const Log = require('./Log.class');
const nodemailer = require('nodemailer');
const config = require('./../configuration.json');

const transporter = nodemailer.createTransport({
  host: 'mail.stacon.space',
  port: 465,
  secure: true,
  auth: {
    user: 'insomniads@stacon.space',
    pass: '5sKT2HMzTF5m',
  },
});

const mailOptions = {
  from: 'Insomnia Ads Notifier <insomniads@stacon.space>',
  to: config.email,
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
      'Σύνδεσμος αγγελίας: ' +ad.link
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
}

module.exports = Mailer;
