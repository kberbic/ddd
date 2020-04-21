import 'reflect-metadata';
import BaseDTO from './baseDTO';

export default class UserDTO extends BaseDTO {
    name: string;
    email: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    static modelCast(input): UserDTO {
        return new UserDTO({
            _id: input.id,
            name: input.name,
            email: input.email,
        });
    }
}

UserDTO.cast = BaseDTO.cast.bind(UserDTO);
