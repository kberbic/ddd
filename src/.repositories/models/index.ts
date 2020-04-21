import * as mongoose from 'mongoose';
import Aircraft from './aircraft';
import Flight from './flight';
import User from "./user";


const uri = global["DATABASE_URI"] || process.env.DATABASE_URI;
if(!uri)
    throw new Error("Please provide DATABASE_URI");

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
});

export {
    Flight,
    User,
    Aircraft
};
