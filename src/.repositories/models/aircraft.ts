import { prop, getModelForClass } from '@typegoose/typegoose';

export class Aircraft {
    @prop()
    _id: string;

    @prop()
    model: string;

    @prop()
    price: string;

    @prop()
    createdBy: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export default getModelForClass(Aircraft, { schemaOptions: { timestamps: true } });
