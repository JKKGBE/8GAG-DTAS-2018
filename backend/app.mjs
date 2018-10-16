import * as hapi from './hapi';
import * as mongoose from './db/mongoose';
import config from './config';
import findRoutes from './utils/routes';

// Catch unhandled
process.on(
  'uncaughtException',
  e => console.error('uncaughtException:', e)
);

process.on(
  'unhandledRejection',
  (reason, p) => console.error('Unhandled Rejection at:', p, 'reason:', reason)
);

(async () => {
  try {
    await hapi.startServer(config.hapi);
    hapi.registerRoutes(await findRoutes(config.servicesRoot));
    await mongoose.connectToMongo(config.db.mongoose);
    console.log('API server running');
  } catch (e) {
    console.error(e);
  }
})();