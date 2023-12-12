import express from 'express'
import { UserServices } from './userServices';
import { UserControllers } from './userControllers';


const router = express.Router();

router.get('/', UserControllers.getAllUsers)

export const UserRoutes = router; 