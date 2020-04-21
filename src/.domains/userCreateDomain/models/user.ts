import {hashSync, compareSync} from "bcrypt";
const _saltRounds = 10;
export default class User {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor({id, name, email, password}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    passwordHash(): void {
        this.password = hashSync(this.password, _saltRounds);
    }

    passwordCheck(password: string): boolean {
         return compareSync(password, this.password);
    }
}