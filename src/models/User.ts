import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role:string;
}


const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{
      type:String,
      enum:['admin' , 'client'],
      default:'client'
    }
  },
  { timestamps: true }
);


const User = mongoose.model<IUser>("User", UserSchema);
export default User;