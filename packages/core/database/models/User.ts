import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
