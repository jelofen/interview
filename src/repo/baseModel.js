import { getCollection } from 'startup/mongoUtil';

export default class BaseMode {
  coll;
  modelId;

  constructor(modelName, modelId) {
    this.coll = getCollection(modelName);
    this.modelId = modelId;
  }

  async findOne(_id) {
    return await this.coll.findOne({ _id }, projection);
  }

  async find(filter) {
    const result = await this.coll.find(filter, projection).toArray();
    return result;
  }

  async update(_id, update) {
    update.updatedAt = new Date();
    return await this.coll.updateOne({ _id }, { $set: update });
  }

  async insert(item) {
    const now = new Date();
    item.createdAt = now;
    item.updatedAt = now;
    return await this.coll.insertOne(item);
  }

  async insertMany(items) {
    let now = new Date();
    for (let item of items) {
      item.createdAt = now;
      item.updatedAt = now;
    }
    return await this.coll.insertMany(items);
  }

  async upsertMany(items) {
    let bulk = this.coll.initializeOrderedBulkOp();
    items.forEach((item) => {
      bulk
        .find({ [this.modelId]: item[this.modelId] })
        .upsert()
        .updateOne({ $set: item });
    });

    let result = await bulk.execute();
    return result;
  }

  async delete(_id) {
    return await this.coll.deleteMany({ _id });
  }

  async deleteMany(filter) {
    return await this.coll.deleteMany(filter);
  }
}
