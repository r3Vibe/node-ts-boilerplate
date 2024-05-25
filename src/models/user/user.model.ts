import { Schema, model } from 'mongoose';
import validator from 'validator';
import passHelper from '../../helpers/passwordHelper';
import { IUser } from '../../@types';
import { toJSON } from '../plugin/private';

/**
 * User Model contains all user basic info
 */
const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      trim: true,
      required: false,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Email');
        }
      },
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (
          !value.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};':"\\|,.<>?]).{8,}$/,
          )
        ) {
          throw new Error('Password');
        }
      },
      private: true,
    },
    profile_image: {
      type: String,
      required: false,
      default: '',
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    has_social_login: {
      type: Boolean,
      default: false,
    },
    verification_token: {
      type: String,
      required: true,
      default: () => passHelper.generateToken(),
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'superadmin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = passHelper.hashPassword(String(this.password));
  }
  next();
});

// text index for names
userSchema.index({ first_name: 'text' });
userSchema.index({ last_name: 'text' });

// private plugin
userSchema.plugin(toJSON);

// User model
const User = model<IUser>('User', userSchema);

// export model
export default User;
