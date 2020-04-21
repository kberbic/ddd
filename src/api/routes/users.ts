import {
  Controller, Request, Response, OperationId, Tags, Body, Post, Route,
} from 'tsoa';

import UserService from '../../.services/userService';
import ServiceContext from '../../.services/serviceContext';

import Context from '../context';
import CreateDTO from '../../.dto/createDTO';
import AddUserDTO from '../../.dto/addUserDTO';

@Tags('Users')
@Route('users')
@Response('404', 'Not Found')
export class Users extends Controller {
    @OperationId('Users')
    @Post()
    @Context(['user'])
  public addAircraft(@Request() context: ServiceContext,
                       @Body() user: AddUserDTO):
    Promise<CreateDTO> {
    return UserService.create(context, user);
  }
}
