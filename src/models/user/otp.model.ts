import { Schema, model } from 'mongoose';
import { otpSchemaInterface } from '../../@types';

/**
 * Token Model to store and blacklist some tokens
 */
const otpSchema = new Schema<otpSchemaInterface>(
  {
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const otp = model<otpSchemaInterface>('otp', otpSchema);

export default otp;
