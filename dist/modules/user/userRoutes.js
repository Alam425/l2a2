"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("./userControllers");
const router = express_1.default.Router();
router.post("/createUser", userControllers_1.UserControllers.createUser);
router.get("/", userControllers_1.UserControllers.getAllUsers);
router.get("/:userId", userControllers_1.UserControllers.getSingleUser);
router.put("/:userId", userControllers_1.UserControllers.updateUserDataInDb);
router.delete("/:userId", userControllers_1.UserControllers.deleteSingleUser);
exports.UserRoutes = router;
// git rev-list --count HEAD
