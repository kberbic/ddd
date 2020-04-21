/* eslint-env mocha */
import '../api/configuration';
import * as expect from 'expect';
import ServiceContext from '../.services/serviceContext';
import UserService from '../.services/userService';
import AddUserDTO from '../.dto/AddUserDTO';
import GetUserDTO from '../.dto/GetUserDTO';
import AuthDTO from '../.dto/authDTO';

const context = new ServiceContext({ system: false, name: 'Tests', user: new AuthDTO({ id: 'test', name: 'test' }) });

describe('UserService', () => {
  describe('create', () => {
    it('should create one user', async () => {
      const output = await UserService.create(context, new AddUserDTO({
        name: 'test',
        email: 'test@test.ba',
        password: 'svirkaIpol19',
      }));
      expect(output).toBeTruthy();
      expect(output._id).toBeTruthy();
    });
  });

  describe('getUserByEmailAndPassword', () => {
    it('should return one user', async () => {
      const output = await UserService.getUserByEmailAndPassword(context, new GetUserDTO({
        email: 'test@test.ba',
        password: 'svirkaIpol19',
      }));
      expect(output).toBeTruthy();
      expect(output._id).toBeTruthy();
    });
  });
});
