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
            .then(CreateDTO.cast)
    }

    public static getUserByEmailAndPassword(context: ServiceContext, forUser: GetUserDTO): Promise<UserDTO> {
        return userRepository
            .find({email: forUser.email})
            .then(UserHelper.throwIfUserNotExist)
            .then(UserWithClearPasswordDTO.cast)
            .then(user => UserCreateDomain.isPasswordValid(user, forUser.password))
            .then(UserDTO.cast)
    }
}
