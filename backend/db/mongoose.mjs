import mongoose from 'mongoose';

async function connectToMongo(config) {
  try {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', config.debug);
    await mongoose.connect(config.uri, config.options);
    
    console.log('Mongoose connected to MongoDB');
  } catch (e) {
    throw new Error(`Mongoose couldn't connect to MongoDB, reason: ${e}`);
  }
}

export {
  connectToMongo,
};