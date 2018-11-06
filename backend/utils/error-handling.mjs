import Boom from 'boom';
import _ from 'lodash';

export default (e, route, requestId) => {
  const modifiedError = Boom.isBoom(e)
    ? { ...e }
    : e.name === 'ValidationError'
      ? getDbError(e)
      : getFatalError(e);

  modifiedError.output.payload.requestId = requestId;

  const errorLogData = {
    route,
    requestId,
    message: modifiedError.message,
    additionalData: modifiedError.data,
    stack: modifiedError.stack,
  };

  return { modifiedError, errorLogData };
};

function getDbError(e) {
  const data = _.pick(Object.values(e.errors)[0], ['kind', 'path']);

  return new Boom('databaseError', { statusCode: 400, data });
}

function getFatalError(e) {
  return new Boom('fatalError', { statusCode: 500, data: e.message });
}

const commonErrors = {
  propertyNotPresent: 'propertyNotPresent',
};

export {
  commonErrors,
};
