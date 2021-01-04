import mongoose from 'mongoose';
import { UserSchema } from './user.schema';
import { UserDocument } from './user.document';


export const UserModel = mongoose.model<UserDocument>('user', new UserSchema().schema)
