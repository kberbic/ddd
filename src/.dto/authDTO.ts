import 'reflect-metadata';
import BaseDTO from './baseDTO';

export default class AuthDTO extends BaseDTO {
    id: string;
    name: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    static modelCast(input): AuthDTO {
        return new AuthDTO({
            _id: input.id,
            name: input.name
        });
    }
}

AuthDTO.cast = BaseDTO.cast.bind(AuthDTO);
