import 'reflect-metadata';
import BaseDTO from './baseDTO';
import AircraftDTO from "./aircraftDTO";

export default class CreatedFlightDTO extends BaseDTO {
    from: string;
    to: string;
    duration: number;
    price: number;
    aircraft: AircraftDTO;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    toModel(): any{
        return {
            from: this.from,
            to: this.to,
            duration: this.duration,
            price: this.price,
            aircraft: this.aircraft.toModel(),
        };
    }

    static modelCast(input): CreatedFlightDTO {
        return new CreatedFlightDTO({
            _id: input._id,
            from: input.from,
            to: input.to,
            price: input.price,
            duration: input.duration,
            aircraft: AircraftDTO.cast(input.aircraft)
        });
    }
}

CreatedFlightDTO.cast = BaseDTO.cast.bind(CreatedFlightDTO);
