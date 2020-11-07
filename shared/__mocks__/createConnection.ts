import { connect } from "mongoose";

export default jest.fn(async () => {
  const mongooseConnection = await connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongooseConnection.connection;
  return {
    db,
  };
});
