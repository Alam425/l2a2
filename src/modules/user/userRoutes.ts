import express from 'express'
import { UserServices } from './userServices';
import { UserControllers } from './userControllers';


const router = express.Router();

router.get('/', UserControllers.getAllUsers)

router.get('/:userId', UserControllers.getSingleUser)

router.delete('/:userId', UserControllers.deleteSingleUser)

export const UserRoutes = router; 