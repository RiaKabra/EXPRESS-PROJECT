import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSender } from '../helper/mail.helper';

export const createUser = async (userDetails) => {
  const saltRounds = 10;
  console.log("Message: User details under User Service", userDetails);
  const hashed_password = await bcrypt.hash(userDetails.password,saltRounds);
  userDetails.password = hashed_password;
  const data = await User.create(userDetails);
  console.log("Database response: @service ",data);
  return data;
};

export const loginUser = async (body)=>
{
  try {
    const login = await User.findOne({ email: body.email });
    
    if (!login) {
      throw new Error("Invalid email");
    }
    const passwordMatch = await bcrypt.compare(body.password, login.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { firstname: login.firstname, email: login.email, id: login._id },process.env.secret_key,);
      return token;
    } 
    else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

//, {expiresIn: 300}

export const forget_pswd = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
      throw new Error('User not found');
  }
  console.log("SECRET KEY in user service -----",process.env.SECRET_KEY_NEW);
  const token = jwt.sign({ email: user.email ,id:user._id}, process.env.SECRET_KEY_NEW);
  await mailSender(user.email,token);
  console.log('Token generated:', token);

  return token;
};

export const reset_pswd = async (body) => {
  try {
    const user = await User.findOne({_id:body.UserID});
  if (!user) {
    throw new Error('User not found');
  }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error resetting password: ${error.message}`);
  }
};