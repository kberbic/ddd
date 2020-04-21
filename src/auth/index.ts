/* eslint default-case: 0 */
import * as express from 'express';

import { IdentityError } from '../errors';
import AuthDTO from '../.dto/authDTO';
import UserService from '../.services/userService';
import ServiceContext from '../.services/serviceContext';

export async function expressAuthentication(request: express.Request,
  securityName: string,
  scopes?: string[]): Promise<AuthDTO> {
  switch (securityName) {
    case 'jwt': {
      return UserService.checkToken(new ServiceContext({ token: request.headers['authorization'] }))
        .then((user) => new AuthDTO({ id: user._id, name: user.name }));
    }
  }
  throw new IdentityError('INVALID_TOKEN', { internal: `${securityName} not exist for scopes ${scopes}` });
}
