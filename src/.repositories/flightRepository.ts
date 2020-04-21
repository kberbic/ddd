import BaseRepository from './baseRepository';

export default class FlightRepository<Q, T> extends BaseRepository<object, T> {
  constructor(context: object, modelName: string) {
    super(context, modelName);
  }
}
