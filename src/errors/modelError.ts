export default class ModelError extends Error {
    public errors?: any;

    public message: string = null;

    constructor(...args) {
      super(...args);
      const [model, errors] = args.slice(1, args.length);
      this.errors = errors;
      this.message += model ? ` [${model.name}]` : '';
      this.message += errors && errors.length ? ` [${errors.map((x) => x.message).join(' & ')}]` : '';
    }
}
