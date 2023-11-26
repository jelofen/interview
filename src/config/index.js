export default {
  origin: process.env.ORIGIN || '*',
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'localhost',

  mongAddress: process.env.MONGO_ADDRESS || 'mongo',
  mongName: process.env.MONGO_NAME || 'pim',
  mongPort: process.env.MONGO_PORT || 27017,
};
