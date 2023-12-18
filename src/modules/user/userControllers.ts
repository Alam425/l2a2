import { Request, Response } from "express";
import { UserServices } from "./userServices";
import { User } from "./userModel";

const updateUserDataInDb = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { body } = req;

    if (!(await User.isUserExists(userId))) {
      return res.status(500).json({
        success: false,
        message: "User updating failed",
        data: "User not found",
      });;
    }

    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found...!",
        data: null,
      });
    }

    if (body.fullName) {
      user.fullName.firstName =
        body.fullName.firstName || user.fullName.firstName;
      user.fullName.lastName = body.fullName.lastName || user.fullName.lastName;
    }
    if (body.address) {
      user.address.street = body.address.street || user.address.street;
      user.address.city = body.address.city || user.address.city;
      user.address.country = body.address.country || user.address.country;
    }
    user.username = body.username || user.username;
    user.password = body.password || user.password;
    user.password = body.password || user.password;
    user.age = body.age || user.age;
    user.email = body.email || user.email;
    user.hobbies = body.hobbies || user.hobbies;

    const updateResult = await User.findOneAndUpdate(
      { userId: userId },
      { $set: user },
      { new: true }
    );
    
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

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  UserServices.createUser(body);
};

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
  const { userId } = req.params;
  const result = await UserServices.getSingleUserData(userId);
  if (result === null) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "Error Occured",
      },
    });
  }
  res.status(200).json({
    success: true,
    message: "User fetched successfully!",
    data: result,
  });
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUser(userId);
    if (result === null) {
      res.status(404).json({
        success: false,
        message: "User not Found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
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

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUserDataInDb,
  createUser,
};
