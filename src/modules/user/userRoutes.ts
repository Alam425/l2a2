import express from "express";
import { UserControllers } from "./userControllers";

const router = express.Router();

router.post("/", UserControllers.createUser)

router.get("/", UserControllers.getAllUsers);

router.get("/:userId", UserControllers.getSingleUser);

router.put("/:userId", UserControllers.updateUserDataInDb);

router.delete("/:userId", UserControllers.deleteSingleUser);

export const UserRoutes = router;

// git rev-list --count HEAD