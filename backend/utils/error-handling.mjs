import Boom from 'boom';
import _ from 'lodash';

export default (e, route, requestId) => {
  const modifiedError = Boom.isBoom(e)
    ? e
    : e.name === 'ValidationError' || e.name === 'MongoError'
      ? getMongooseError(e)
      : getFatalError(e);

  modifiedError.output.payload = {
    ...modifiedError.output.payload,
    requestId,
    status: false,
  };

  const errorLogData = {
    error: {
      route,
      requestId,
      message: modifiedError.message,
      additionalData: modifiedError.data,
      status: modifiedError.output.payload.status,
      stack: modifiedError.stack,
    },
  };

  return { modifiedError, errorLogData };
};

function getMongooseError(e) {
  const data = e.name === 'ValidationError'
    ? _.pick(Object.values(e.errors)[0], ['kind', 'path'])
    : 'E11000';

  const error = new Boom('databaseError', { statusCode: 400, data });
  error.output.payload.additionalData = data;

  return error;
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
