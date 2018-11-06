import moment from 'moment';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdOn: { type: Date, required: true, default: moment() },
  accepted: { type: Number, enum: [0, 1], default: 0 },
  comments: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    createdOn: { type: Date, required: true, default: moment() },
    content: { type: String, required: true },
  }],
  ratings: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rate: { type: Number, enum: [1, 2, 3, 4, 5], default: 0 },
    createdOn: { type: Date, required: true, default: moment() },
  }],
});

postSchema.index({ createdOn: -1, userId: 1 });

export default mongoose.model('Post', postSchema);
