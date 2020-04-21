import * as Models from './models';
import AircraftRepository from './aircraftRepository';
import FlightRepository from './flightRepository';
import UserRepository from './userRepository';

const aircraftRepository = new AircraftRepository(Models, 'Aircraft');
const flightRepository = new FlightRepository(Models, 'Flight');
const userRepository = new UserRepository(Models, 'User');

export {
    aircraftRepository,
    flightRepository,
    userRepository
};
