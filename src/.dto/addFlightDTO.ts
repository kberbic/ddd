import 'reflect-metadata';
import ErrorModel from '../utils/errorModel';
import BaseDTO from './baseDTO';

export default class AddFlightDTO extends BaseDTO {
    from: string;
    to: string;
    duration: number;
    createdBy: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    validate(): Array<ErrorModel> {
        const errors: ErrorModel[] = [];
        if (!this.from)
            errors.push(new ErrorModel("from", this.from, "From is required"));

        if (!this.to)
            errors.push(new ErrorModel("to", this.to, "To is required"));

        if (!this.duration)
            errors.push(new ErrorModel("duration", String(this.duration), "Duration is required"));

        return errors;
    }

    toDomain(): any{
        return {
            from: this.from,
            to: this.to,
            duration: this.duration,
            createdBy: this.createdBy
        };
    }

    toModel(): any{
        return {
            from: this.from,
            to: this.to,
            duration: this.duration,
            createdBy: this.createdBy
        };
    }
}

AddFlightDTO.cast = BaseDTO.cast.bind(AddFlightDTO);
