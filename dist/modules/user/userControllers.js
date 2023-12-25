"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const userServices_1 = require("./userServices");
const userModel_1 = require("./userModel");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield userServices_1.UserServices.createUser(body);
        if (result === undefined) {
            return res.status(403).json({
                success: false,
                message: 'User already exists'
            });
        }
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'User Created Successfully',
                data: result
            });
        }
        return res.status(500).json({
            success: false,
            message: 'User creation failed',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Occured!",
            data: error.message
        });
    }
});
const updateUserDataInDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { body } = req;
        if ((yield userModel_1.Userr.isUserExists(userId)) === null) {
            return res.status(500).json({
                success: false,
                message: "User missing",
            });
        }
        else {
            const user = yield userModel_1.Userr.findOne({ userId: userId });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found...!"
                });
            }
            if (body.fullName) {
                user.fullName.firstName =
                    body.fullName.firstName || user.fullName.firstName;
                user.fullName.lastName =
                    body.fullName.lastName || user.fullName.lastName;
            }
            if (body.address) {
                user.address.street = body.address.street || user.address.street;
                user.address.city = body.address.city || user.address.city;
                user.address.country = body.address.country || user.address.country;
            }
            if (body.password) {
                user.password = body.password;
            }
            if (body.username) {
                user.username = body.username;
            }
            user.age = body.age || user.age;
            user.email = body.email || user.email;
            user.hobbies = body.hobbies || user.hobbies;
            const updateResult = yield userModel_1.Userr.findOneAndUpdate({ userId: userId }, { $set: user }, { new: true });
            if (updateResult) {
                res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    data: updateResult,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "User updating failed",
            data: error.message,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices_1.UserServices.getAllUsersData();
        res.json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: err.message || "Error Occured",
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield userServices_1.UserServices.getSingleUserData(userId);
        if (result === null) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "Error Occurred",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: error.message || "Error Occurred",
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield userServices_1.UserServices.deleteUser(userId);
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
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: error.message || "User not found!",
            },
        });
    }
});
exports.UserControllers = {
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateUserDataInDb,
    createUser,
};
