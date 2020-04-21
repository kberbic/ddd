export default class ActionNotAllowed extends Error {
    public extend: any = null;

    constructor(message, extend = null, ...args) {
      super(...args);
      this.message = message;
      this.extend = extend;
    }
}
