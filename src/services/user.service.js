import User from '../models/user.model';
//create new user
export const createUser = async (userDetails) => {
  console.log("Message: User details under User Service", userDetails);
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
    if(body.password == login.password )
      {
        return login
      }
      else{
        throw new Error("Invalid password");
      }
  }
}

