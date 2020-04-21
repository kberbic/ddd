import ServiceContext from '../.services/serviceContext';
import { ModelError } from '../errors';
import ErrorModel from './errorModel';

export enum AuthRoles {
    Admin = 0,
    User = 1,
    APIKey = 2
}
export class ModelValidationOptions {
    validationModel?: any;

    validation?: Function;

    constructor({ validationModel, validation }) {
      this.validationModel = validationModel;
      this.validation = validation;
    }
}

const ModelValidationX = (validation: any): any => async (args, next): Promise<any> => {
  let model = args[1];
  const context = args[0];

  if (!(context instanceof ServiceContext)) throw new ReferenceError('MISSING_CONTEXT');

  if (!model) throw new ModelError(['MODEL_INPUT_ERROR']);

  if (!validation) throw new ModelError(['MODEL_INPUT_ERROR']);

  if (validation.prototype && validation.prototype.validate) {
    model = Array.isArray(model) ? model.map((x) => new validation(x))
      : new validation(model);
  }


  let errors = [];
  if (!validation.prototype || !validation.prototype.validate) errors = validation(model);
  else if (Array.isArray(model)) model.forEach((x) => { errors = errors.concat(x.validate()); });
  else errors = model.validate();

  if (errors.length) throw new ModelError('MODEL_ERROR', validation, errors);

  args[1] = model;
  return next(args);
};

/* eslint new-cap: 0 */ // This is decorator not a model
export const modelValidation = (validation: any):
    MethodDecorator => function mValidation(target: Record<string, any>,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  const originalMethod = descriptor.value; // save a reference to the original method
  descriptor.value = (...args: any[]):
      any => ModelValidationX(validation)(args, (prop) => originalMethod.apply(this, prop));

  return descriptor;
};

const _checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
export const isMongoKey = (id): Array<any> => {
  if (id === null) return [new ErrorModel('id', id, 'wrong format')];

  if (typeof id === 'number') return [];
  if (typeof id === 'string') {
    const isTrue = id.length === 12 || (id.length === 24 && _checkForHexRegExp.test(id));
    return isTrue ? [] : [new ErrorModel('id', id, 'wrong format')];
  }
  return [new ErrorModel('id', id, 'wrong format')];
};
