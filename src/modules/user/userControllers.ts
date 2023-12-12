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


export const UserControllers = {
    getAllUsers
}