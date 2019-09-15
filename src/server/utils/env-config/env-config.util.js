import dotenv from 'dotenv';
import Logger from 'src/common/utils/logger';

const logger = new Logger({
  name: 'Env configuration',
});

const dotEnvConfig = dotenv.config();
const { error, parsed } = dotEnvConfig;

if (error) {
  logger.error(error);
}

const envConfig = error ? {} : parsed;

export default envConfig;
