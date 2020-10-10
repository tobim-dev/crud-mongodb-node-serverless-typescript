import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ObjectID } from "mongodb";
import createConnection from "../shared/mongoose";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id } = req.params;
  const journalEntry = req.body || {};

  if (!id || !journalEntry) {
    context.res = {
      status: 400,
      body: "Fields are required",
    };

    return;
  }

  const { db } = await createConnection();
  const JournalEntry = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );

  try {
    await JournalEntry.updateOne({ _id: new ObjectID(id) }, journalEntry);
    await db.close();

    context.res = {
      status: 200,
      body: journalEntry,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error updating a journal entry",
    };
  }
};

export default httpTrigger;
