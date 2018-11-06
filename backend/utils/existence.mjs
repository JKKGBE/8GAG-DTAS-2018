import Boom from 'boom';
import { commonErrors } from './errors';

function propertyCheck(object, properties) {
  properties.forEach(element => {
    if (!object[element]) {
      throw Boom.badRequest(commonErrors.propertyNotPresent, { element });
    }
  });
}

export {
  propertyCheck,
};
