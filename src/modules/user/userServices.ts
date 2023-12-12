import { User } from "./userModel"


const getAllUsersData = async () => {
    return await User.find()
}


const getSingleUserData = async(userId: any) => {
    const singleUserData = await User.findOne({ userId: userId })
    return singleUserData
}

    
export const UserServices = {
    getAllUsersData, getSingleUserData
}