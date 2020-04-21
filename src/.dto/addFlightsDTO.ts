import 'reflect-metadata';
import ErrorModel from '../utils/errorModel';
import BaseDTO from './baseDTO';
import AddFlightDTO from "./addFlightDTO";

export default class AddFlightsDTO extends BaseDTO {
    flights: AddFlightDTO[];

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    validate(): Array<ErrorModel> {
        let errors: ErrorModel[] = [];
        if (!this.flights || !this.flights.length)
            errors.push(new ErrorModel("flights", this.flights, "Flights is required"));

        this.flights.forEach(f => errors = errors.concat(f.validate()));

        return errors;
    }
}

AddFlightsDTO.cast = BaseDTO.cast.bind(AddFlightsDTO);
