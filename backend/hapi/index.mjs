import Hapi from 'hapi';

import * as authApi from '../services/auth/api/api';
import errorHandler from '../utils/error-handling';
import { getUniqueId } from '../utils/uniques';
import { propertyCheck } from '../utils/existence';

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
        propertyCheck(req.payload, ['token']);

        req.payload = {
          ...req.payload,
          ...(await authApi.checkToken(req.payload.token)),
        };
      }

      const response = await route.config.handler(req);

      return response === undefined
        ? { status: true }
        : { ...response, status: true };
    } catch (e) {
      const { modifiedError, errorLogData } = errorHandler(e, route.path, req.requestId);
      console.error(errorLogData);
      throw modifiedError;
    }
  };
}

export {
  startServer,
  registerRoutes,
};
