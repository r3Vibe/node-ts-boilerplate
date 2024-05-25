import mongoose, { Schema, model } from 'mongoose';
import { ISocial } from '../../@types';
import { toJSON } from '../plugin/private';

/**
 * Social Model to store social login information
 */
const socialSchema = new Schema<ISocial>(
  {
    social_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ['facebook', 'apple', 'google'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

socialSchema.plugin(toJSON);

const Social = model<ISocial>('Social', socialSchema);

export default Social;
