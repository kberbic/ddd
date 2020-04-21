import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop()
    name: string;

    @prop()
    email: string;

    @prop()
    password: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export default getModelForClass(User, { schemaOptions: { timestamps: true } });
