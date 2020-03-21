const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const mongoDbURL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPW}@mongojp-collo.mongodb.net/shop?retryWrites=true&w=majority`;

let _db;

const initDb = callback => {
  if (_db) {
    console.log("Database is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbURL, { useUnifiedTopology: true })
    .then(client => {
      _db = client.db();
      callback(null, _db);
    })
    .catch(err => {
      console.log("err", err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
