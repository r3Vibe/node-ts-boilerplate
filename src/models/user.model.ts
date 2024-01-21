import { Schema, model } from 'mongoose';

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  first_name: { type: String, trim: true, required: true },
  last_name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
});

const User = model<IUser>('User', userSchema);

export default User;
