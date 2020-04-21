import 'reflect-metadata';
import ErrorModel from '../utils/errorModel';
import BaseDTO from './baseDTO';

export default class AddUserDTO extends BaseDTO{
    name: string;
    email: string;
    password: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    validate(): Array<ErrorModel> {
        const errors: ErrorModel[] = [];
        if (!this.name)
            errors.push(new ErrorModel("from", this.name, "Name is required"));

        if (!this.email)
            errors.push(new ErrorModel("email", this.email, "Nmail is required"));

        if (!this.password)
            errors.push(new ErrorModel("password", this.password, "Password is required"));

        return errors;
    }

    static modelCast(input): AddUserDTO {
        return new AddUserDTO({
            name: input.name,
            email: input.email,
            password: input.password
        });
    }

    toDomain(): any{
        return {
            name: this.name,
            email: this.email,
            password: this.password
        };
    }

    toModel(): any{
        return {
            name: this.name,
            email: this.email,
            password: this.password
        };
    }
}

AddUserDTO.cast = BaseDTO.cast.bind(AddUserDTO);
