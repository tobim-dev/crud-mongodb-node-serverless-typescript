import { connect } from "mongoose";

const config = {
  url: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE_URL}/${process.env.ENVIRONMENT === "production" ? "prilla" : "prilla-dev"}?retryWrites=true&w=majority`
};

export default async function createConnection() {
  const mongoose = await connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  return {
    db
  };
}