import { Types } from "mongoose";
import { UserRole } from "./user.constant";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string | undefined;
  role: UserRole;
  isBlocked?: boolean;
  isVerified?: boolean;
}
