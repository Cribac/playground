#!/usr/bin/env node

const https = require('https');
const options = {
  hostname: 'esi.evetech.net',
  port: 443,
  path: '/v1/status',
  method: 'GET'
};

let rawOnly = false;

parseArgs(process.argv);
doRequest(options);

function parseArgs(argv) {
  if (argv.includes('-h') || argv.includes('--help')) {
    sendHelp();
  } else if (argv.includes('--raw')) {
    rawOnly = true;
  }
}

function doRequest(options) {
  https.get(options, (response) => {
    const { statusCode } = response;
    let error;
    let data = '';

    if (statusCode !== 200) {
      error = new Error('Probably dead!\n' +
        `Status Code: ${statusCode}`);
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      response.resume();
      return;
    }

    // A chunk of data has been recieved.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      if (rawOnly) {
        console.log(JSON.parse(data));
      } else {
        console.log('Nope!!!');
      }
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}

function sendHelp() {
  console.log('Usage and Options:\n' +
    'Run without options to receive a simple answer to the question if EVE is dead.\n' +
    '------------------------------------------------------------------------------\n' +
    '--raw      : Outputs only the raw JSON response\n' +
    '-h, --help : Prints this help message\n'
  );
  process.exit();
}