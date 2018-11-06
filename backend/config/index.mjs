import Boom from 'boom';

export default {
  db: {
    mongoose: {
      uri: process.env.MONGOOSE_URI || 'mongodb://localhost:27017/8gag',
      debug: process.env.MONGOOSE_DEBUG || true,
      options: {
        keepAlive: 1,
        useNewUrlParser: true,
      },
    },
  },
  hapi: {
    port: process.env.HAPI_PORT || 4000,
    host: process.env.HAPI_HOST || 'localhost',
    routes: {
      cors: true,
      validate: {
        failAction(request, h, e) {
          console.error(e);
          throw Boom.badRequest(e.message);
        },
      },
    },
  },
  crypto: {
    jwtSecret: process.env.JWT_SECRET || 'notsosecret',
    saltRounds: 10,
  },
  servicesRoot: './services',
};
