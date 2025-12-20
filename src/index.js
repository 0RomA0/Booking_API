import { initMongoDbConection } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoDbConection();
  startServer();
};

bootstrap();
