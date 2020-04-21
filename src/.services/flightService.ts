import Service from './baseService';
import ServiceContext from './serviceContext';
import {FlightBestPriceDomain} from '../.domains';

import {
    modelValidation,
} from '../utils';

import {
    flightRepository,
    aircraftRepository
} from "../.repositories";
import AddFlightDTO from "../.dto/addFlightDTO";
import AircraftDTO from "../.dto/aircraftDTO";
import CreatedFlightDTO from "../.dto/createdFlightDTO";
import AddFlightsDTO from "../.dto/addFlightsDTO";

export default class FlightService extends Service {
    constructor() {
        super();
    }

    @modelValidation(AddFlightDTO)
    public static addFlight(context: ServiceContext, flight: AddFlightDTO): Promise<CreatedFlightDTO> {
        return aircraftRepository.findAll({})
            .then(AircraftDTO.cast)
            .then(aircrafts => FlightBestPriceDomain.calculate(flight, aircrafts))
            .then(CreatedFlightDTO.cast)
            .then(fl => flightRepository.save(flight))
            .then(CreatedFlightDTO.cast);
    }

    @modelValidation(AddFlightsDTO)
    public static addFlights(context: ServiceContext, flightList: AddFlightsDTO): Promise<CreatedFlightDTO[]> {
        return Promise.all(flightList.flights
            .map(flight => FlightService
                .addFlight(context, flight)));
    }
}
