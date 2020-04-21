import 'reflect-metadata';
import BaseDTO from './baseDTO';

export default class AircraftDTO extends BaseDTO {
    id: string;
    model: string;
    price: number;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    toDomain(): any{
        return {
            _id: this.id,
            model: this.model,
            price: this.price
        };
    }

    toModel(): any{
        return {
            _id: this.id,
            model: this.model,
            price: this.price
        };
    }

    static modelCast(input): AircraftDTO {
        return new AircraftDTO({
            _id: input.id || input._id,
            model: input.model,
            price: input.price
        });
    }
}

AircraftDTO.cast = BaseDTO.cast.bind(AircraftDTO);
