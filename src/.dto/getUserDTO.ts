import 'reflect-metadata';
import BaseDTO from './baseDTO';
import ErrorModel from "../utils/errorModel";

export interface IGetUserDTO{
    email: string;
    password: string;
}

export default class GetUserDTO extends BaseDTO implements IGetUserDTO{
    email: string;
    password: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    validate(): Array<ErrorModel> {
        const errors: ErrorModel[] = [];

        if (!this.email)
            errors.push(new ErrorModel("email", this.email, "Nmail is required"));

        if (!this.password)
            errors.push(new ErrorModel("password", this.password, "Password is required"));

        return errors;
    }

    toDomain():any {
        return {
            _id: this._id,
            email: this.email,
            password: this.password
        }
    }
}

GetUserDTO.cast = BaseDTO.cast.bind(GetUserDTO);
