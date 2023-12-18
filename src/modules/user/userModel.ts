import mongoose, { Model, Schema, model } from "mongoose";
import { TAddress, TFullName, TUser, UserModel } from "./userInterface";


const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})


const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: [ true, 'Username must be provided' ], unique: true },
  password: { type: String, required: [ true, 'Password must be provided' ] },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: { type: [Object] }
})


userSchema.post('save', function(){
  this.password = ' ';
  console.log('password hidden');
})


userSchema.statics.isUserExists = async (userId: any) => {
  return await User.findOne({ userId: userId });
}


export const User: Model<TUser> = mongoose.model<TUser>('User', userSchema);