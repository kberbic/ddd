import * as express from 'express';

import { IdentityError } from '../errors';
import AuthDTO from '../.dto/authDTO';

export function expressAuthentication(request: express.Request,
  securityName: string,
  scopes?: string[]): Promise<AuthDTO> {
  let output: AuthDTO = null;
  switch (securityName) {
    case 'jwt': {
      output = new AuthDTO({ id: 'test', name: 'test' });
    }
      break;
      break;
    default:
      throw new IdentityError('INVALID_TOKEN', { internal: `${securityName} not exist for scopes ${scopes}` });
  }
  return Promise.resolve(output);
}
