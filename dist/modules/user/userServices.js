"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const userModel_1 = require("./userModel");
const createUser = async (users) => {
    try {
        if (await userModel_1.Userr.isUserExists(users.userId)) {
            return undefined;
        }
        const result = await userModel_1.Userr.create(users);
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error('User creation failed');
    }
};
const getAllUsersData = async () => {
    return await userModel_1.Userr.find({ isActive: true }, { userId: 0, password: 0, isActive: 0, hobbies: 0, orders: 0, _id: 0 });
};
const getSingleUserData = async (userId) => {
    if (await userModel_1.Userr.isUserExists(userId)) {
        const singleUserData = await userModel_1.Userr.findOne({
            userId: userId,
            isActive: true,
        }, {
            password: 0,
        });
        return singleUserData;
    }
    else {
        return null;
    }
};
const deleteUser = async (userId) => {
    if (await userModel_1.Userr.isUserExists(userId)) {
        const deleteSingleUserData = await userModel_1.Userr.updateOne({ userId: userId }, { isActive: false });
        return deleteSingleUserData;
    }
    else {
        return null;
    }
};
exports.UserServices = {
    getAllUsersData,
    getSingleUserData,
    deleteUser,
    createUser,
};
