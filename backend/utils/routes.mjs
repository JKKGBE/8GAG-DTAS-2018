import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default async servicesRoot => {
  const dirs = getDirs(servicesRoot);
  const routes = await Promise.all(readRoutes(dirs, servicesRoot));

  return _.flatten(routes);
};

function getDirs(dir) {
  return fs
    .readdirSync(path.resolve(dir))
    .filter(file => fs
      .statSync(path.join(dir, file))
      .isDirectory());
}

function readRoutes(dirs, servicesRoot) {
  return _.map(dirs, async dir => {
    const restApiPath = evalRestApiPath(dir, servicesRoot);
    
    if (fs.existsSync(restApiPath)) {
      return (await import(restApiPath)).default;
    }

    return [];
  });
}

function evalRestApiPath(dir, servicesRoot) {
  return path.resolve(`${servicesRoot}/${dir}/api/rest-api.mjs`);
}