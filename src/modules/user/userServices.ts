import { User } from "./userModel"


const getAllUsersData = async () => {
    return await User.find()
}

    
export const UserServices = {
    getAllUsersData
}