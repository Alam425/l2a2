import { TUser } from "./userInterface";
import { Userr } from "./userModel";


const createUser = async (users: TUser) => {
  try {
    if (await Userr.isUserExists(users.userId)) {
      return undefined;
    }

    const result = await Userr.create(users);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('User creation failed');
  }
};


const getAllUsersData = async () => {
  return await Userr.find(
    { isActive: true },
    { userId: 0, password: 0, isActive: 0, hobbies: 0, orders: 0, _id: 0, id: 0 }
  );
};


const getSingleUserData = async (userId: any) => {
  if (await Userr.isUserExists(userId)) {
    const singleUserData = await Userr.findOne(
      {
        userId: userId,
        isActive: true,
      },
      {
        password: 0,
      }
    );
    return singleUserData;
  } else {
    return null;
  }
};


const deleteUser = async (userId: any) => {
  if (await Userr.isUserExists(userId)) {
    const deleteSingleUserData = await Userr.updateOne(
      { userId: userId },
      { isActive: false }
    );
    return deleteSingleUserData;
  } else {
    return null;
  }
};


export const UserServices = {
  getAllUsersData,
  getSingleUserData,
  deleteUser,
  createUser,
};
