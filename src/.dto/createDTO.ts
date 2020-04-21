import 'reflect-metadata';
import BaseDTO from './baseDTO';

export default class CreateDTO extends BaseDTO {
    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    static modelCast(input): CreateDTO {
        return new CreateDTO({
            _id: input._id
        });
    }
}

CreateDTO.cast = BaseDTO.cast.bind(CreateDTO);
