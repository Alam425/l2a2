import { TUser } from "./userInterface";
import { User } from "./userModel";

const getAllUsersData = async () => {
  return await User.find({ isActive: true });
};

const getSingleUserData = async (userId: any) => {
  const singleUserData = await User.findOne({ userId: userId, isActive: true });
  //  const result = await Student.findOne({ id: id }, { isDeleted : { $ne: "true" }})
  return singleUserData;
};

const createUser = async (userData: TUser) => {
  console.log(userData);
};

const deleteUser = async (userId: any) => {
  const deleteSingleUserData = await User.updateOne({ userId: userId }, { isActive: false });
  return deleteSingleUserData;
};

export const UserServices = {
  getAllUsersData,
  getSingleUserData,
  deleteUser,
  createUser,
};
