import { ArgsType, Field, InputType } from "type-graphql";
import { Field as GraphField } from 'type-graphql';
import { ObjectType } from '../global/helpers';


export interface UserType {
  email: string;
  name?: string;
}

@InputType()
export class AddUserInputType implements UserType {
  @Field(type => String)
  email: string;
  @Field(type => String, { nullable: true })
  name?: string;
}

@ObjectType
export class User implements UserType {

  @GraphField(type=>String)
  id?: string;

  @GraphField(type => String)
  email: string;

  @GraphField(type => String, { nullable: true })
  name?: string;
}


@ArgsType()
export class OnNewUserArgs implements UserType{
  @Field(type => String, {nullable: true})
  email: string;

  @Field(type => String, {nullable: true})
  name?: string;
}