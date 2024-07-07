import { Schema, model } from 'mongoose';
import validator from 'validator';
import passHelper from '../../helpers/passwordHelper';
import { IUser } from '../../@types';

/**
 * User Model contains all user basic info
 */
const userSchema = new Schema<IUser>(
  {
    name: {
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
    bio: {
      type: String,
      required: false,
      default: '',
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
      enum: ['admin', 'user'],
      default: 'user',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    recent: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

/**
 * Schema Statics available through the User Object
 * @author Arnab Gupta
 * @param phone
 * @returns {Promise<boolean>} True/False
 */
userSchema.statics.accountExists = async function (
  phone: number,
): Promise<boolean> {
  const user = await this.findOne({ phone });
  return !!user;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = passHelper.hashPassword(String(this.password));
  }
  next();
});

userSchema.index({ name: 'text' });

// User model
const User = model<IUser>('User', userSchema);

// export model
export default User;
