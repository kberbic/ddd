/* eslint-env mocha */
import '../api/configuration';
import * as expect from 'expect';
import ServiceContext from '../.services/serviceContext';
import FlightService from '../.services/flightService';
import AddFlightDTO from '../.dto/addFlightDTO';
import AddFlightsDTO from '../.dto/addFlightsDTO';
import AuthDTO from '../.dto/authDTO';

const context = new ServiceContext({ system: false, name: 'Tests', user: new AuthDTO({ id: 'test', name: 'test' }) });

describe('FlightService', () => {
  describe('addFlight', () => {
    it('should create one flight', async () => {
      const output = await FlightService.addFlight(context, new AddFlightDTO({
        from: 'KSFO',
        to: 'KSAN',
        duration: 80,
      }));
      expect(output).toBeTruthy();
      expect(output._id).toBeTruthy();
    });
  });

  describe('addFlights', () => {
    it('should create list of flights', async () => {
      const output = await FlightService.addFlights(context, new AddFlightsDTO({
        flights: [
          new AddFlightDTO({
            from: 'KSFO',
            to: 'KSAN',
            duration: 80,
          }),
          new AddFlightDTO({
            from: 'KSFO',
            to: 'KBOI',
            duration: 40,
          }),
        ],
      }));
      expect(output).toBeTruthy();
      // expect(output._id).toBeTruthy();
    });
  });
});
