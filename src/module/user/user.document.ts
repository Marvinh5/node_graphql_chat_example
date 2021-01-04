import { Document } from "mongoose";
import { UserType } from "./user.types";

export class UserDocument extends Document<UserType> implements UserType {
    email: string;
    name?: string;
}