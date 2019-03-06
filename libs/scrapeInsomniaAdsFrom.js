const scrapeIt = require('scrape-it');

const scrapeInsomniaAdsFrom = (url) => scrapeIt(url, {
  ads: {
    listItem: 'li.ipsDataItem',
    data: {
      title: {selector: 'a.ipsTruncate_line'},
      link: {selector: 'a.ipsTruncate_line', attr: 'href'},
      seller: {
        selector: 'a.ipsType_break',
      },
      profileLink: {
        selector: 'a.ipsType_break',
        attr: 'href',
      },
      price: {selector: 'span.cFilePrice'},
    },
  },
},);

module.exports = scrapeInsomniaAdsFrom;
