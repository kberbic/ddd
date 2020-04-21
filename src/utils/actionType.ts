export enum ActionTypes {
    REST_GET = 'get',
    REST_POST = 'post',
    REST_PUT = 'put',
    REST_DELETE = 'delete',
    GraphQL = 'graphql',
    GRPC = 'grpc'
}

export const Actions = (
  type: ActionTypes,
  middlewares: Array<any> = null,
  mapper: Function = null,
  alias: string = null,
): MethodDecorator => function action(
  target: Record<string, any>,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> {
  switch (type) {
    case ActionTypes.REST_GET:
    case ActionTypes.REST_POST:
    case ActionTypes.REST_PUT:
    case ActionTypes.REST_DELETE:
      target['routes'].push({
        type, service: target['name'], name: propertyKey, alias, mapper, middlewares,
      });
      break;
    default: throw new Error('NOT_IMPLEMENTED_ACTION_TYPE'); break;
  }

  return descriptor;
};

export const get = (
  middlewares: Array<any> = null,
  mapper: Function = null,
  alias: string = null,
): any => Actions(ActionTypes.REST_GET, middlewares, mapper, alias);

export const post = (
  middlewares: Array<any> = null,
  mapper: Function = null,
  alias: string = null,
): any => Actions(ActionTypes.REST_POST, middlewares, mapper, alias);

export const put = (
  middlewares: Array<any> = null,
  mapper: Function = null,
  alias: string = null,
): any => Actions(ActionTypes.REST_PUT, middlewares, mapper, alias);

export const delete_ = (
  middlewares: Array<any> = null,
  mapper: Function = null,
  alias: string = null,
): any => Actions(ActionTypes.REST_DELETE, middlewares, mapper, alias);
