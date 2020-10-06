import { MongoClient } from "mongodb";

const config = {
  url: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE_URL}/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  dbName: "crud-serverless-mongodb"
};

export default async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true, useUnifiedTopology: true 
  });
  const db = connection.db(config.dbName);
  return {
    connection,
    db
  };
}