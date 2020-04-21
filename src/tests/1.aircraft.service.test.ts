/* eslint-env mocha */
import '../api/configuration';
import * as expect from 'expect';
import ServiceContext from '../.services/serviceContext';
import AircraftService from '../.services/aircraftService';
import AddAircraftDTO from '../.dto/addAircraftDTO';
import AuthDTO from '../.dto/authDTO';

const context = new ServiceContext({ system: false, name: 'Tests', user: new AuthDTO({ id: 'test', name: 'test' }) });

describe('AircraftService', () => {
  describe('addAircraft', () => {
    it('should create one aircraft', async () => {
      const output = await AircraftService.addAircraft(context, new AddAircraftDTO({
        id: 'N1234',
        model: 'Piston',
        price: 1300,
      }));
      expect(output).toBeTruthy();
      expect(output._id).toBeTruthy();
    });
  });
});
