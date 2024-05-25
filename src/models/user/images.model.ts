import { Schema, model } from 'mongoose';
import { IImages } from '../../@types';
import { toJSON } from '../plugin/private';

/**
 * Images Model contains all user images
 */
const imagesSchema = new Schema<IImages>(
  {
    image_url: {
      type: String,
      required: true,
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

imagesSchema.plugin(toJSON);

// Images model
const Images = model<IImages>('Images', imagesSchema);

// export model
export default Images;
