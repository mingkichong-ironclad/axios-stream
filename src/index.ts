import axios from 'axios';
import * as fs from 'fs';

import { logger } from './logger';

const fileUrl = 'https://ironcladapp.com/wp-content/uploads/2019/10/Ironclad_logo_twitter_med.png';
const requestConfig = { responseType: 'stream' as const }; // so data is a readable stream

const output = fs.createWriteStream('test.png');

const main = async () => {
  logger.debug('--- START ---');
  try {
    const { data, status, statusText, headers, config, request } = await axios.get(fileUrl, requestConfig);
    logger.info(status);
    logger.info(statusText);
    logger.info(JSON.stringify(headers, null, 2));
    logger.info(JSON.stringify(config, null, 2));

    let sum = 0;
    data.on('data', (chunk: any) => {
      console.log(`Received ${chunk.length} bytes of data.`);
      sum += chunk.length;
      console.log(`total so far: ${sum}`);
      output.write(chunk);
    });
  } catch (err) {
    logger.error('ERR', err);
  }


  logger.debug('---  END  ---');
};

main();
