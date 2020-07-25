// @TODO
// use proper types
// error handling
// get this darn mailer to work

import { Cron } from 'https://deno.land/x/cron/cron.ts';
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';

const URL = 'https://www.eve-scout.com/api/wormholes?systemSearch=Jita&limit=1000&offset=0&order=asc';
const cron = new Cron();

console.log('thera2stain connection search running, hit ctrl + c to stop...');

cron.add('0 */4 * * *', () => {
  const scoutData = fetchData(URL)
    .then((data) => {
      const filtered = filterforStain(data);

      if (filtered.length > 0) {

        let mailBody = '';
        filtered.forEach((signal: any) => {
          mailBody += `System: ${signal.solarSystemName} with signature: ${signal.signatureId} \n`;
        });

        console.log('Mailing results')
        // connect to smtp client with default mailcatcher credentials.
        const client = new SmtpClient();
        client.connect({
          hostname: '127.0.0.1',
          port: 1025,
        });

        client.send({
          from: 'thera2stain@example.com',
          to: 'to-address@xx.com',
          subject: 'Thera connection to Stain detected',
          content: mailBody,
        });

        client.close();

      } else {
        console.log('Nothing so far...');
      }
    });
});

function fetchData(url: string): Promise<{}> {
  return fetch(url).then((response) => response.json());
}

function filterforStain(data: any) {
  return data.filter((elem: any) => elem.destinationSolarSystem.region.name === 'Stain');
}

console.table(cron.cronJobs);

cron.start();

export { };
