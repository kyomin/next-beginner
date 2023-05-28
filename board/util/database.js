import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URL;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

let cachedClient;
let cachedDb;

export const connectToDatabase = async () => {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(url, options);
  await client.connect();
  let db = client.db('board');

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
};

const ncDatabase = async (req, res, next) => {
  if (!(cachedClient && cachedDb)) {
    const connectObj = await connectToDatabase();
    req.dbClient = connectObj.client;
    req.db = connectObj.db;
  } else {
    req.dbClient = cachedClient;
    req.db = cachedDb;
  }
  return next();
};

export default ncDatabase;
