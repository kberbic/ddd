import ModelError from '../errors/modelError';
import IdentityError from '../errors/identityError';
import ErrorModel from '../utils/errorModel';

export default class UserHelper {
  static throwIfUserExist(user: any): any {
    if (user) throw new ModelError([new ErrorModel('email', user.email, 'User already exist')]);

    return user;
  }

  static throwIfUserNotExist(user: any): any {
    if (!user) throw new IdentityError('Incorrect email or password');

    return user;
  }
}
