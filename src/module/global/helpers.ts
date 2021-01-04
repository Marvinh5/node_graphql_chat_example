import { ObjectType as TypeGraphObjectType } from "type-graphql";
import 'reflect-metadata'
import { Schema, Document, SchemaTypeOptions } from "mongoose";

export const ObjectType = TypeGraphObjectType()


export class BaseSchema<T extends Document<any>> {
    schema: Schema<T>;

    createSchema() {
        if(this.schema==null) this.schema = new Schema<T>();
    }
}

export function DBField(props:SchemaTypeOptions<any> = {type: String}): PropertyDecorator {
    return (target: BaseSchema<any>, propertyKey: string | symbol)  => {
        target.createSchema();
        target.schema.add({
        [propertyKey]: props
      });
    }
}