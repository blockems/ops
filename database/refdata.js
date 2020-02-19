const {getDatabase} = require('./mongo');

const collectionName = 'refdata';

async function insertRef(refdata) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(refdata);
  return insertedId;
}

async function getRef() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  insertRef,
  getRef,
};