import config from 'config';
import cors from 'cors';

export default (app) => {
  app.use(cors({ origin: config.origin }));
};
