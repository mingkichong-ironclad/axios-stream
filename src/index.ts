import axios from 'axios';

import { logger } from './logger';

const fileUrl = 'https://ironclad.design/assets/logo/ironclad-logo.svg';

const main = () => {
  logger.debug('--- START ---');
  logger.info(fileUrl);
  logger.debug('---  END  ---');
};

main();
