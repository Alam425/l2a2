import { Request, Response } from "express";
import { UserServices } from "./userServices";
import { TUser } from "./userInterface";
import { User } from "./userModel";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersData();

    res.json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "Error Occured",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserData(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "Error Occured",
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message || "User not found!",
      },
    });
  }
};

const updateUserDataInDb = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const user = await User.findOne({ userId: userId });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found...!",
        data: null,
      });
    }

    user.userId = user.userId;
    user.isActive = user.isActive;
    user.orders = user.orders;
    user.username = body.username || user.username;
    user.password = body.password || user.password;
    user.fullName.firstName =
      body.fullName.firstName || user.fullName.firstName;
    user.fullName.lastName = body.fullName.lastName || user.fullName.lastName;
    user.password = body.password || user.password;
    user.age = body.age || user.age;
    user.email = body.email || user.email;
    user.hobbies = body.hobbies || user.hobbies;
    user.address.street = body.address.street || user.address.street;
    user.address.city = body.address.city || user.address.city;
    user.address.country = body.address.country || user.address.country;

    const updateResult = await User.findOneAndUpdate(
      { userId: userId },
      { $set: user },
      { new: true }
    );
    console.log(updateResult);
    if (updateResult) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User updating failed",
      data: error.message,
    });
  }
};

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUserDataInDb,
};
