import moment from 'moment';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, required: true, default: moment() },
  isAdmin: { type: Number, enum: [0, 1], default: 0 },
});

export default mongoose.model('User', userSchema);
