import Aircraft from './aircraft';

export default class Flight {
    from: string;

    to: string;

    price: number;

    duration: number;

    aircraft: Aircraft;

    constructor({
      from, to, duration, price, aircraft,
    }) {
      this.from = from;
      this.to = to;
      this.duration = duration;
      this.price = price;
      this.aircraft = aircraft;
    }
}
