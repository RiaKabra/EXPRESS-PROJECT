import User from '../models/user.model';
import bcrypt from 'bcrypt';
//const bcrypt2 = require('bcrypt');
//create new user
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
  const login = await User.findOne({email: body.email});
  console.log(login);
  if(login==null)
  {
    throw new Error("Invalid email");
  }
  else{
    if(bcrypt.compare(body.password,login.password))
      {
        return login
      }
      else{
        throw new Error("Invalid password");
      }
  }
}

