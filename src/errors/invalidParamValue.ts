export default class InvalidParamValue extends Error {
    public extend: any = null;

    public message: string = null;

    constructor(message, extend = null, ...args) {
      super(...args);
      this.message = message;
      this.extend = extend;
    }
}
