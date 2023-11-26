import config from 'config';
import { MongoClient } from 'mongodb';

const url = `mongodb://${config.mongAddress}`;
var db;

async function connectToDb() {
  var client = await MongoClient.connect(url);
  db = client.db(config.mongName);
}

function getCollection(collectionName) {
  return db.collection(collectionName);
}

export { connectToDb, getCollection };
