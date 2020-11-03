import axios from 'axios';
import * as fs from 'fs';

import { logger } from './logger';

const fileUrl = 'https://ironcladapp.com/wp-content/uploads/2019/10/Ironclad_logo_twitter_med.png';
const requestConfig = { responseType: 'stream' as const }; // so data is a readable stream

const output = fs.createWriteStream('test.png');

const main = async () => {
  logger.debug('--- START ---');
  try {
    const response = await axios.get(fileUrl, requestConfig);
    const { status, statusText, headers, config, request } = response;
    logger.info(JSON.stringify({ status, statusText, headers, config }, null, 2));

    let sum = 0;
    for await (const chunk of (response.data as NodeJS.ReadableStream)) {
      logger.debug(`Received ${chunk.length} bytes of data.`);
      output.write(chunk);
      logger.debug(`total so far: ${sum += chunk.length}`);
    }
    output.close();
  } catch (err) {
    logger.error('ERR', err);
  }
  logger.debug('---  END  ---');
};

main();
