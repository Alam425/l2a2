import { Schema, model } from "mongoose";
import { TAddress, TFullName, TUser } from "./userInterface";


const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})


const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: [ true, 'Username must be provided' ], unique: true },
  password: { type: String, required: [ true, 'Password must be provided' ] },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  address: addressSchema
})


export const User = model<TUser>('User', userSchema);