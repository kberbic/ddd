import ServiceContext from '../.services/serviceContext';

const Context = (binds: string[]): any => async (args, next): Promise<any> => {
  const request = args[0];
  binds.forEach((b) => {
    switch (b) {
      case 'user':
        args[0] = new ServiceContext({
          user: request.user,
          correlationId: request.correlationId(),
        });
        break;
      default: throw Error('BIND_IN_CONTEXT_NOT_IMPLEMENTED'); break;
    }
  });

  return next(args);
};
const ContextDecorator = (binds: string[]): MethodDecorator => function load(
  target: Record<string, any>, propertyKey: string, descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> {
  const originalMethod = descriptor.value; // save a reference to the original method
  descriptor.value = (...args: any[]): Function => Context(binds)(args,
    (props) => originalMethod.apply(originalMethod, props));

  return descriptor;
};

export default ContextDecorator;
