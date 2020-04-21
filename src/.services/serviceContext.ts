import AuthDTO from "../.dto/authDTO";
export default class ServiceContext {
    system: boolean;

    name: string;

    token: string;

    correlationId: string;

    user: AuthDTO;

    constructor({
                    user = null, system = false, token = null,
                    name = null, correlationId = null,
                } = {}) {
        this.user = user;
        this.correlationId = correlationId;
        this.system = system;
        this.token = token || (user ? user.token : null);
        this.name = name;
    }
}