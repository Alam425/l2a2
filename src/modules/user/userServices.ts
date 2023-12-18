import { TUser } from "./userInterface";
import { User } from "./userModel";

const getAllUsersData = async () => {
  return await User.find({ isActive: true });
};

const getSingleUserData = async (userId: any) => {
  if (await User.isUserExists(userId)) {
    const singleUserData = await User.findOne({
      userId: userId,
      isActive: true,
    });
    return singleUserData;
  } else {
    return null;
  }
};

const createUser = async (users: TUser) => {
  console.log(users);
};

const deleteUser = async (userId: any) => {
  if (await User.isUserExists(userId)) {
    const deleteSingleUserData = await User.updateOne(
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
