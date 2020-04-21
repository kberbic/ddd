import { prop, getModelForClass } from '@typegoose/typegoose';
import { Aircraft } from './aircraft';

export class Flight {
    @prop()
    from: string;

    @prop()
    to: string;

    @prop()
    duration: string;

    @prop()
    price: number;

    @prop()
    aircraft: Aircraft;

    @prop()
    createdBy: string;

    @prop()
    createdAt: Date;

    @prop()
    updatedAt: Date;
}

export default getModelForClass(Flight, { schemaOptions: { timestamps: true } });
