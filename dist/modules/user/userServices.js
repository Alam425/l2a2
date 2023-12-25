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
exports.UserServices = void 0;
const userModel_1 = require("./userModel");
const createUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userModel_1.Userr.isUserExists(users.userId)) {
            return undefined;
        }
        const result = yield userModel_1.Userr.create(users);
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error('User creation failed');
    }
});
const getAllUsersData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.Userr.find({ isActive: true }, { userId: 0, password: 0, isActive: 0, hobbies: 0, orders: 0, _id: 0, id: 0 });
});
const getSingleUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield userModel_1.Userr.isUserExists(userId)) {
        const singleUserData = yield userModel_1.Userr.findOne({
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
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield userModel_1.Userr.isUserExists(userId)) {
        const deleteSingleUserData = yield userModel_1.Userr.updateOne({ userId: userId }, { isActive: false });
        return deleteSingleUserData;
    }
    else {
        return null;
    }
});
exports.UserServices = {
    getAllUsersData,
    getSingleUserData,
    deleteUser,
    createUser,
};
