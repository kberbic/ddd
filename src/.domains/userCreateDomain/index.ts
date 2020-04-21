import { IBaseDTO } from '../../.dto/baseDTO';
import User from './models/user';

export default class UserCreateDomain {
  static async create(iUser: IBaseDTO): Promise<User> {
    const user = new User(iUser.toDomain());
    user.passwordHash();
    return user;
  }

  static async isPasswordValid(iUser: IBaseDTO, password: string): Promise<User> {
    const user = new User(iUser.toDomain());
    return user.passwordCheck(password) ? user : null;
  }
}
