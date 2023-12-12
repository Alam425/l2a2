import { Request, Response } from "express";
import { UserServices } from "./userServices";

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
      data: null
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: error.message || "User not found!"
      },
    });
  }
};

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
