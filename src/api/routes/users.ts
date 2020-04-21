import {
  Controller, Request, Response, OperationId, Tags, Body, Post, Route,
} from 'tsoa';

import UserService from '../../.services/userService';
import ServiceContext from '../../.services/serviceContext';

import Context from '../context';
import CreateDTO from '../../.dto/createDTO';
import AddUserDTO from '../../.dto/addUserDTO';
import GetUserDTO from '../../.dto/getUserDTO';

@Tags('Users')
@Route('users')
@Response('404', 'Not Found')
export class Users extends Controller {
    @OperationId('Users')
    @Post()
    @Context(['user'])
  public createUser(@Request() context: ServiceContext,
                      @Body() user: AddUserDTO):
    Promise<CreateDTO> {
    return UserService.create(context, user);
  }

    @OperationId('Users')
    @Post('/token')
    @Context(['user'])
    public token(@Request() context: ServiceContext,
                      @Body() login: GetUserDTO):
    Promise<CreateDTO> {
      return UserService.getToken(context, login);
    }
}
