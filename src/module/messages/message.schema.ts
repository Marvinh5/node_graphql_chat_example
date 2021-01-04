import { BaseSchema, DBField } from "../global/helpers";
import { MessageType } from "./message.types";
import {MessageDocument} from './message.document';
import { UserModel } from "../user/user.model";
import {Schema} from 'mongoose'

export class MessageSchema extends BaseSchema<MessageDocument> implements MessageType {
    @DBField()
    message: string;

    @DBField({type: Date, default: Date.now})
    createdAt: Date;

    @DBField([{ref: UserModel, type: Schema.Types.ObjectId}])
    users: string[];
}