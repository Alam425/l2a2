import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TAddress, TFullName, TUser, UserModel } from "./userInterface";

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    required: [true, "Username must be provided"],
    unique: true,
  },
  fullName: fullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  address: addressSchema,
  id: { type: Number, required: true },
  userId: { type: Number, required: true, unique: true },
  password: { type: String, required: [ true, 'Password is missing' ] },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String] },
  orders: { type: [Object] },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
});



userSchema.post("findOneAndUpdate", function (doc, next) {
  if (doc) {
    doc.password = " ";
  }
  next();
});



userSchema.post("save", function (doc, next) {
  if (doc) {
    doc.password = " ";
  }
  console.log("object");
  next();
});


userSchema.statics.isUserExists = async (userId: any) => {
  return await Userr.findOne({ userId: userId });
};


export const Userr: UserModel = mongoose.model<TUser, UserModel>(
  "User",
  userSchema
);