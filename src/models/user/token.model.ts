import { Schema, model } from 'mongoose';
import { tokenSchemaInterface } from '../../@types';

/**
 * Token Model to store and blacklist some tokens
 */
const tokenSchema = new Schema<tokenSchemaInterface>(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Token = model<tokenSchemaInterface>('Token', tokenSchema);

export default Token;
