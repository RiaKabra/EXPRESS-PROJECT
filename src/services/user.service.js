import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSender } from '../helper/mail.helper';
import { sendMessage } from '../utils/rabbitmq';

export const createUser = async (userDetails) => {
  const saltRounds = 10;
  // eslint-disable-next-line prettier/prettier
  console.log('Message: User details under User Service', userDetails);
  const hashed_password = await bcrypt.hash(userDetails.password, saltRounds);
  userDetails.password = hashed_password;
  const data = await User.create(userDetails);
  // eslint-disable-next-line prettier/prettier
  console.log('Database response: @service ', data);
  sendMessage('UserQueue', JSON.stringify({ action: 'signup', data }));
  return data;
};

export const loginUser = async (body) => {
  try {
    const login = await User.findOne({ email: body.email });

    if (!login) {
      throw new Error('Invalid email');
    }

    const passwordMatch = await bcrypt.compare(body.password, login.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { firstname: login.firstname, email: login.email, id: login._id },
        process.env.secret_key
      );
      return token;
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const forget_pswd = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new Error('User not found');
  }
  // eslint-disable-next-line max-len, prettier/prettier
  const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY_NEW);
  await mailSender(user.email, token);
  return token;
};

export const reset_pswd = async (body, token) => {
  try {
    if (!token) {
      throw new Error('Token not provided');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_NEW);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    if (!body.password || typeof body.password !== 'string') {
      throw new Error('Invalid password format');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  } catch (error) {
    console.error('Error in reset_pswd service:', error);
    throw new Error('Password reset failed: ' + error.message);
  }
};
