import { Request, Response } from "express";
import { UserServices } from "./userServices";


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersData();

      res.json({
        success: true,
        message: "Users fetched successfully!",
        data: result
      });
  } catch (err: any) {
    res.json({
      success: false,
      message: "Users fetching failed....!!",
      data: err.message || "Error Occured"
    });
  }
};


const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserData(userId);


    res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User fetching failed....!!",
      data: err.message || "Error Occured"
    });
  }
};


export const UserControllers = {
    getAllUsers, getSingleUser
}