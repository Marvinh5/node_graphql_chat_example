import mongoose from 'mongoose';
import { MessageDocument } from './message.document';
import { MessageSchema } from './message.schema';

export const MessageModel = mongoose.model<MessageDocument>('message', new MessageSchema().schema)
