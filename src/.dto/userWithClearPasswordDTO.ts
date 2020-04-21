import 'reflect-metadata';
import BaseDTO from './baseDTO';
import UserDTO from './userDTO';

export default class UserWithClearPasswordDTO extends UserDTO {
    password: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    toDomain():any {
        return {
            id: this._id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }

    static modelCast(input): UserWithClearPasswordDTO {
        return new UserWithClearPasswordDTO({
            _id: input._id,
            name: input.name,
            email: input.email,
            password: input.password
        });
    }
}

UserWithClearPasswordDTO.cast = BaseDTO.cast.bind(UserWithClearPasswordDTO);
