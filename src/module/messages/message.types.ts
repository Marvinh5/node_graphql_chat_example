import { Field, InputType } from "type-graphql";
import { Field as GraphField } from 'type-graphql';
import { ObjectType } from '../global/helpers';


export interface MessageType {
  message: string;
  createdAt?: Date;
  users: string[];
}

@InputType()
export class AddMessageInputType  {
    @GraphField(type=>String)
    message: string;

    @GraphField(type=>Date, {nullable:true})
    createdAt: Date;

    @GraphField(type=>String)
    recipient: string;
}

@ObjectType
export class Message implements MessageType {
    @GraphField(type=>String)
    message: string;

    @GraphField(type=>Date)
    createdAt: Date;

    @GraphField(type=>[String])
    users: string[];
}


@InputType()
export class OnNewUserArgs implements MessageType{
    @GraphField(type=>String)
    message: string;

    @GraphField(type=>Date)
    createdAt: Date;

    @GraphField(type=>String)
    users: string[];
}