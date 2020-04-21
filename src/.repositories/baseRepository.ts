import {IBaseDTO} from '../.dto/baseDTO';
import AppVersion from './version';

export interface IWrite<Q, T> {
    save(item: IBaseDTO): Promise<T>;

    update(query: Q, dto: IBaseDTO): Promise<T>;
    upsert<T>(query: Q, dto: IBaseDTO): Promise<T>;
    upsertMany(dtoArray: Array<IBaseDTO>): Promise<T>;
    updateMany<T>(query: Q, dto: IBaseDTO): Promise<T>;
    findAndUpdate<T>(query: Q, dto: IBaseDTO): Promise<T>;
    insertMany(dtoArray: Array<IBaseDTO>): Promise<T>;

    deleteById(query: Q): Promise<T>;
    delete(query: Q): Promise<T>;
    deleteMany(query: Q): Promise<T>;
}

export interface IRead<Q, T> {
    findAll(query: Q, fields?: string[]): Promise<T[]>;
    find(query: Q, fields?: string[]): Promise<T>;
    getCount(): Promise<number>;
    count(query: Q): Promise<number>;
    distinctByField(field: string, query?: object): Promise<T[]>
}

export interface PopulateOptions {
    populate: string;

    sort: any;

    limit: number;

    offset: number;
}

export default abstract class BaseRepository<Q, T> implements IWrite<Q, T>, IRead<Q, T> {
    protected context: object;

    protected collection: string;

    protected traceCollection: string;

    protected appVersion: string;

    protected model: T;

    protected constructor(context: object, collection: string, traceCollection = 'Trace', appVersion = AppVersion) {
      this.context = context;
      this.collection = collection;
      this.traceCollection = traceCollection;
      this.appVersion = appVersion;
      this.model = this.context[this.collection];
    }

    async distinctByField(field: string, query?: object): Promise<T[]> {
      const distinctValues = await this.context[this.collection].distinct(field, query);
      return new Promise((resolve) => resolve(distinctValues));
    }

    async getCount(): Promise<number> {
      const count = await this.context[this.collection].countDocuments();
      return new Promise((resolve) => resolve(count));
    }

    async count(query: Q = null): Promise<number> {
      const count = await this.context[this.collection].countDocuments(query);
      return new Promise((resolve) => resolve(count));
    }

    async findAll(query: Q = null, fields: string[] = null, options = {}): Promise<T[]> {
      let output;
      let skip;
      const {
        populate, sort, limit, offset,
      } = options as PopulateOptions;

      if (offset && limit) skip = offset * limit;

      if (populate) {
        output = await this.context[this.collection].find(query, fields)
          .populate(populate).skip(skip).sort(sort)
          .limit(limit)
          .lean();
      } else {
        output = await this.context[this.collection].find(query, fields).skip(skip)
          .sort(sort).limit(limit)
          .lean();
      }

      return new Promise((resolve) => resolve(output));
    }

    async find(query: Q = null, fields: string[] = null, populate = null): Promise<T> {
      let output;
      if (!populate) output = await this.context[this.collection].findOne(query, fields).lean();
      else {
        output = await this.context[this.collection].findOne(query, fields)
          .populate(populate).lean();
      }

      return new Promise((resolve) => resolve(output));
    }

    async save(dto: IBaseDTO): Promise<T> {
      const item = new this.context[this.collection](dto.toModel());
      if (!item) return null;
      item['appVersion'] = this.appVersion;
      const output = await item.save();
      return new Promise((resolve) => resolve(output['_doc']));
    }

    async findAndUpdate<T>(query: Q, dto: IBaseDTO): Promise<T> {
      const model = dto.toModel();
      model['appVersion'] = this.appVersion;

      const output = await this.context[this.collection].findOneAndUpdate(query, model);
      return new Promise((resolve) => resolve(output));
    }

    async update<T>(query: Q, dto: IBaseDTO): Promise<T> {
      const model = dto.toModel();
      model['appVersion'] = this.appVersion;

      const output = await this.context[this.collection].updateOne(query, model);
      return new Promise((resolve) => resolve(output));
    }

    async updateMany<T>(query: Q, dto: IBaseDTO): Promise<T> {
      const model = dto.toModel();
      model['appVersion'] = this.appVersion;

      const output = await this.context[this.collection].updateMany(query, model, { multi: true });
      return new Promise((resolve) => resolve(output));
    }

    async upsert<T>(query: Q, dto: IBaseDTO): Promise<T> {
      const model = dto.toModel();
      model['appVersion'] = this.appVersion;

      const output = await this.context[this.collection].updateOne(
        query,
        model,
        { upsert: true },
      ).exec();
      return new Promise((resolve) => resolve(output));
    }

    async deleteMany(query: Q): Promise<T> {
      const mongooseModel = this.context[this.collection];
      return mongooseModel.deleteMany(query);
    }

    async delete(query: Q): Promise<T> {
      const mongooseModel = this.context[this.collection];
      const output = await mongooseModel.deleteOne(query);
      return output;
    }

    async deleteById(query: Q): Promise<T> {
      const mongooseModel = this.context[this.collection];
      const output = await mongooseModel.deleteOne(query);
      output['_id'] = query['_id'];
      return output;
    }

    async upsertMany(dtoArray: Array<IBaseDTO>, upsert = false): Promise<T> {
      const mongooseModel = this.context[this.collection];

      const opList = dtoArray.map((input) => {
        const item = input.toModel();
        item['appVersion'] = this.appVersion;
        return {
          updateOne: {
            filter: { _id: item._id },
            update: item,
            upsert,
          },
        };
      });
      const res = mongooseModel.bulkWrite(opList);
      return res;
    }

    async insertMany(dtoArray: Array<IBaseDTO>): Promise<T> {
      const mongooseModel = this.context[this.collection];

      const opList = dtoArray.map((item) => {
        item['appVersion'] = this.appVersion;
        return { insertOne: { document: item.toModel() } };
      });

      const res = mongooseModel.bulkWrite(opList);
      return res;
    }
}
