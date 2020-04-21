import Service from './baseService';
import ServiceContext from './serviceContext';

import {
    modelValidation,
} from '../utils';

import {
    aircraftRepository
} from "../.repositories";
import AddAircraftDTO from "../.dto/addAircraftDTO";
import CreateDTO from "../.dto/createDTO";
import AircraftDTO from "../.dto/aircraftDTO";

export default class AircraftService extends Service {
    constructor() {
        super();
    }

    @modelValidation(AddAircraftDTO)
    public static addAircraft(context: ServiceContext, aircraft: AddAircraftDTO): Promise<CreateDTO> {
        aircraft.createdBy = context.user.id;
        return aircraftRepository
            .save(aircraft)
            .then(CreateDTO.cast)
    }

    public static getAll(context: ServiceContext): Promise<AircraftDTO> {
        return aircraftRepository
            .findAll({})
            .then(AircraftDTO.cast)
    }
}
