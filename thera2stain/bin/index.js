#!/usr/bin/env node

const CronJob = require('cron').CronJob;
const Axios = require('axios');
const Nodemailer = require('nodemailer');

console.log('thera2stain connection search running, hit ctrl + c to stop...');

const job = new CronJob('0 */4 * * *', function() {
  Axios.get('https://www.eve-scout.com/api/wormholes', {
    params: {
      systemSearch: 'Jita',
      limit: 1000,
      offset: 0,
      sort: 'asc',
    }
  })
    .then(function (response) {
      const filtered = filterData(response.data)
      if (filtered.length > 0) {
        sendMail(filtered).catch(console.error);
        console.log('E-Mail sent at ', new Date());
      } else {
        console.log('Nothing so far...')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * @param {object} data
 * @return [?{object}]
 */
function filterData(data) {
    return data.filter((elem) => elem.destinationSolarSystem.region.name === 'Stain');
}

/**
 * Send mail using the default SMTP transport of Mailcatcher.
 *
 * @param {Array.<Object>} bodyData
 * @returns {Promise<void>}
 */
async function sendMail(bodyData) {
  // transporter object using mailcatcher credentials.
  let transporter = Nodemailer.createTransport({
    host: "127.0.0.1",
    port: 1025,
  });

  let info = await transporter.sendMail({
    from: 'thera2stain', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Thera connection to Stain detected', // Subject line
    text: composeMailBody(bodyData), // plain text body
    html: composeMailBody(bodyData, 'html'), // html body
  });
}


/**
 *
 * @param {Array.<Object>} filteredData
 * @param {string} mode defaults to 'plain', can also be 'html'
 * @returns {string}
 */
function composeMailBody(filteredData, mode = 'plain') {
  let str = '';
  const resultData = filteredData.map((data) => {
    return {
      signatureId: data.signatureId,
      solarSystemName: data.destinationSolarSystem.name,
    }
  });

  if (mode === 'plain') {
    resultData.forEach((signal) => {
      str += `System: ${signal.solarSystemName} with signature: ${signal.signatureId} \n`;
    });
  }

  if (mode === 'html') {
    resultData.forEach((signal) => {
      str += `<p>System: ${signal.solarSystemName} with signature: ${signal.signatureId}</p>`;
    });
  }

  return str;
}

job.start();
