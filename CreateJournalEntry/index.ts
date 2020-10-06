import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createMongoClient from "../shared/mongo";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const journalEntry = req.body || {};

  if (Object.keys(journalEntry).length === 0 && journalEntry.constructor === Object) {
    context.res = {
      status: 400,
      body: "Journal Entry data is required! ",
    };
    return;
  }

  const { db, connection } = await createMongoClient();

  const JournalEntries = db.collection("journalEntries");

  try {
    const journalEntries = await JournalEntries.insertOne(journalEntry);
    connection.close();

    context.res = {
      status: 201,
      body: journalEntries.ops[0],
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating a new Journal Entry",
    };
  }
};

export default httpTrigger;
