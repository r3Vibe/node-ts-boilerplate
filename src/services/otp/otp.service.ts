import mongoose from 'mongoose';
import { Otp } from '../../models';
import { otpSchemaInterface } from '../../@types';

const saveOtp = async (
  otp: string,
  userId: string,
): Promise<otpSchemaInterface> => {
  return Otp.create({ otp, user: userId });
};

const getOtp = async (
  userId: string,
  otp: string,
): Promise<otpSchemaInterface | null> => {
  return Otp.findOne({ user: new mongoose.Types.ObjectId(userId), otp });
};

const deleteOtp = async (userId: string, otp: string): Promise<void> => {
  await Otp.deleteOne({ user: new mongoose.Types.ObjectId(userId), otp });
};

export default {
  saveOtp,
  getOtp,
  deleteOtp,
};
