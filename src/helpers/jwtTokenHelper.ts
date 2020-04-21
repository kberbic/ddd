import { sign, verify } from 'jsonwebtoken';
import UserDTO from '../.dto/userDTO';
import IdentityError from '../errors/identityError';


export default class JwtTokenHelper {
  static async setToken(user: UserDTO): Promise<UserDTO> {
    user.token = sign(
      { data: user },
      process.env.JWT_SECRET,
      { expiresIn: (Number(process.env.JWT_EXPIRE_IN) || 60) * 60 },
    );
    return user;
  }

  static checkToken(token: string): Promise<UserDTO> {
    return new Promise((resolve, reject) => verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) reject(new IdentityError('Token invalid'));

        resolve(UserDTO.cast(decoded.data));
      },
    ));
  }
}
