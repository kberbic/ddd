import {IBaseDTO} from '../../.dto/baseDTO';
import Flight from './models/flight';
import Aircraft from './models/aircraft';

export default class FlightBestPrice {
    constructor(){

    }

    static async calculate(iFlight: IBaseDTO, iAircrafts: IBaseDTO[]): Promise<Flight> {
        const flight = new Flight(iFlight.toDomain());
        const aircrafts = iAircrafts.map(f => new Aircraft(f.toDomain()));

        flight.aircraft = aircrafts[0];
        flight.price = Math.round(flight.aircraft.price * (flight.duration / 60));

        return flight;
    }
}