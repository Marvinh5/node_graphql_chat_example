import { Arg, Args, Ctx, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { SubscriptionTopics } from "../global/types";
import { MessageDocument } from "./message.document";
import { MessageModel } from "./message.model";
import { AddMessageInputType, Message } from "./message.types";



@Resolver(Message)
export class MessageResolver {

  @Query((returns) => [Message], { nullable: true })
  async getUserMessages(@Arg('user', type=>String) user:string) {
    return MessageModel.find({
        users: user
    });
  }

  @Mutation(type=>Message)
  async addMessage(@Arg("data", type=>AddMessageInputType) addMessageData:AddMessageInputType, @Ctx() ctx:any, @PubSub() pubSub: PubSubEngine): Promise<MessageDocument> {
    const message = await MessageModel.create({
        message: addMessageData.message,
        users: [addMessageData.recipient],
    });
    await  pubSub.publish(SubscriptionTopics.new_message, message);
    return message;
  }

  @Subscription(type=>Message,{
    topics: SubscriptionTopics.new_message,
    filter: (val:{payload: Message, args: {user:string}}) => {
      return val.args == null || Object.keys(val.args).length === 0 || val.payload.users.includes(val.args.user);
    }
  })
  onNewMessage(@Root() notificationPayload: MessageDocument, @Arg("user", type=>String, {nullable:true}) user: string):MessageDocument {
      return notificationPayload;
  }

}