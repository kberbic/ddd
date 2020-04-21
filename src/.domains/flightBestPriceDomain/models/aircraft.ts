export default class Aircraft {
    id: string;

    model: string;

    price: number;

    constructor({ id, model, price }) {
      this.id = id;
      this.model = model;
      this.price = price;
    }
}
