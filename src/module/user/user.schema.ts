import { BaseSchema, DBField } from "../global/helpers";
import { UserDocument } from "./user.document";
import { UserType } from "./user.types";


export class UserSchema extends BaseSchema<UserDocument> implements UserType  {

  @DBField()
  email: string;

  @DBField()
  name?: string;

}