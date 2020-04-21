import Service from './baseService';
import ServiceContext from './serviceContext';

import {
    modelValidation,
} from '../utils';

import {
    userRepository
} from "../.repositories";
import CreateDTO from "../.dto/createDTO";
import AddUserDTO from "../.dto/addUserDTO";
import {UserCreateDomain} from "../.domains";
import UserHelper from "../helpers/userHelper";
import GetUserDTO from "../.dto/getUserDTO";
import UserDTO from "../.dto/userDTO";
import UserWithClearPasswordDTO from "../.dto/userWithClearPasswordDTO";
import JwtTokenHelper from "../helpers/jwtTokenHelper";

export default class UserService extends Service {
    constructor() {
        super();
    }

    @modelValidation(AddUserDTO)
    public static create(context: ServiceContext, user: AddUserDTO): Promise<CreateDTO> {
        return userRepository
            .count({email: user.email})
            .then(UserHelper.throwIfUserExist)
            .then(() => UserCreateDomain.create(user))
            .then(AddUserDTO.cast)
            .then(user => userRepository.save(user))
            .then(CreateDTO.cast);
    }

    public static getUserByEmailAndPassword(context: ServiceContext, inUser: GetUserDTO): Promise<UserDTO> {
        return userRepository
            .find({email: inUser.email})
            .then(UserHelper.throwIfUserNotExist)
            .then(UserWithClearPasswordDTO.cast)
            .then(user => UserCreateDomain.isPasswordValid(user, inUser.password))
            .then(UserDTO.cast);
    }

    public static getToken(context: ServiceContext, login: GetUserDTO): Promise<UserDTO> {
        return UserService.getUserByEmailAndPassword(context, login)
            .then(UserHelper.throwIfUserNotExist)
            .then(JwtTokenHelper.setToken)
    }

    public static checkToken(context: ServiceContext): Promise<UserDTO> {
        return JwtTokenHelper.checkToken(context.token);
    }
}
