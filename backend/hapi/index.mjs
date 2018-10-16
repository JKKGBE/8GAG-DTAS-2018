import Hapi from 'hapi';

import { getUniqueId } from '../utils/uniques';
// import errorHandler from '../utils/errors';

let server = undefined;

async function startServer(config) {
  server = Hapi.server(config);
  await server.start();
  
  console.log(`Hapi running at: ${server.info.uri}`);
}

function registerRoutes(routes) {
  routes.forEach(route => {
    server.route({
      method: route.method,
      path: route.path,
      handler: handleRequest(route),
    });
  });
}

function handleRequest(route) {
  return async req => {
    try {
      req.requestId = getUniqueId();
  
      if (route.config.auth) {
        // TODO
        // req.credentials = await checkToken;
      }
  
      const response = await route.config.handler(req);
      
      return response === undefined
        ? {}
        : response;
    } catch (e) {
      console.error(`Error on route: ${route.path}, reason: ${e}`);
      throw e;
      // throw errorHandler(e, req.requestId);
    }
  };
}

export {
  startServer,
  registerRoutes,
};