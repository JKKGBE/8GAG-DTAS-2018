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
    port: process.env.RN_HAPI_PORT || 4000,
    host: process.env.RN_HAPI_HOST || 'localhost',
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
  servicesRoot: './services',
};