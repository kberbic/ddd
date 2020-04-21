export default class ErrorModel {
    name: string;

    value: string;

    message: string;

    code: number;

    constructor(name: string, value: any, message: string, code = 1000) {
      this.name = name;
      this.value = value;
      this.message = message;
      this.code = code;
    }
}
