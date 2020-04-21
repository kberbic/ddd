import ErrorModel from "../utils/errorModel";

export interface IBaseDTO{
    _id?: any
    toModel(): any
    toDomain(): any
    validate(): Array<ErrorModel>
}

export default class BaseDTO implements IBaseDTO {
    _id?: any = null;

    toModel(): any {
      throw new Error('NOT_IMPLEMENTED: [toModel]');
    }

    toDomain(): any {
        throw new Error('NOT_IMPLEMENTED: [toDomain]');
    }

    validate(): Array<ErrorModel> {
      throw new Error('NOT_IMPLEMENTED: [validate]');
    }

    static modelCast(input: any): any {
        throw new Error(`NOT_IMPLEMENTED: [modelCast] ${!input ? '[INPUT NULL]' : ''}`);
    }

    static cast(input): any {
      if (!input) return null;

      if (typeof input === 'string') return input;

      if (input.length !== undefined) return input.map((x) => Object.seal(this.modelCast(x)));

      return Object.seal(this.modelCast(input));
    }
}
