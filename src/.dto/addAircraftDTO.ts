import 'reflect-metadata';
import ErrorModel from '../utils/errorModel';
import BaseDTO from './baseDTO';

export default class AddAircraftDTO extends BaseDTO {
    id: string;
    model: string;
    price: number;
    createdBy: string;

    constructor(input = {}) {
        super();
        Object.assign(this, input);
    }

    validate(): Array<ErrorModel> {
        const errors: ErrorModel[] = [];
        if (!this.id)
            errors.push(new ErrorModel("id", this.id, "Id is required"));

        if (!this.model)
            errors.push(new ErrorModel("model", this.model, "Model is required"));

        if (!this.price)
            errors.push(new ErrorModel("price", String(this.price), "Price is required"));

        return errors;
    }

    toModel(): any{
        return {
            _id: this.id,
            model: this.model,
            price: this.price,
            createdBy: this.createdBy
        };
    }
}

AddAircraftDTO.cast = BaseDTO.cast.bind(AddAircraftDTO);
