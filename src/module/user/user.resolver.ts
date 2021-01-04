import { Arg, Args, Ctx, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { SubscriptionTopics } from "../global/types";
import { UserModel } from "./user.model";
import {AddUserInputType, OnNewUserArgs, User} from './user.types';



@Resolver(User)
export class UserResolver {

  @Query((returns) => [User], { nullable: true })
  async allUsers() {
    return UserModel.find({});
  }

  @Mutation(type=>User)
  async addUser(@Arg("data", type=>AddUserInputType) addUserData:AddUserInputType, @Ctx() ctx:any, @PubSub() pubSub: PubSubEngine): Promise<User> {
    const user = await UserModel.create(addUserData);
    await  pubSub.publish(SubscriptionTopics.new_user, user);
    return user;
  }

  @Subscription(type=>User,{
    topics: SubscriptionTopics.new_user,
    filter: (val:{payload: User, args:OnNewUserArgs}) => {
      return val.args == null || val.args.name === val.payload.name;
    }
  })
  onNewUser(@Root() notificationPayload: User, @Args(type=>OnNewUserArgs) args: OnNewUserArgs):User {
      return notificationPayload;
  }

}