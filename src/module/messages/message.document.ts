import { Document } from "mongoose";
import { MessageType } from "./message.types";

export class MessageDocument extends Document<MessageType> implements MessageType {
    message: string;
    createdAt?: Date;
    users: string[];
}