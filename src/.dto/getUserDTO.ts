import 'reflect-metadata';
import BaseDTO from './baseDTO';

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

    toDomain():any {
        return {
            _id: this._id,
            email: this.email,
            password: this.password
        }
    }
}

GetUserDTO.cast = BaseDTO.cast.bind(GetUserDTO);
