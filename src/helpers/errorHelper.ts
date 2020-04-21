import ModelError from '../errors/modelError';

export default class ErrorHelper {
  static isNull(input, message = 'Object is null'): any {
    if (!input) throw new ModelError(message);

    return input;
  }
}
