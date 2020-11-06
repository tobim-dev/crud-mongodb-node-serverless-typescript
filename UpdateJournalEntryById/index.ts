import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ObjectID } from "mongodb";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id, userId } = req.params;
  const journalEntry: JournalEntry = req.body || {};

  if (!id || !userId || !journalEntry) {
    context.res = {
      status: 400,
      body: "Fields are required",
    };

    return;
  }

  const { db } = await createConnection();
  const journalEntryModel = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );

  try {
    const result = journalEntryModel.updateOne(
      { _id: new ObjectID(id), userId: userId },
      journalEntry
    );

    if (!result) {
      context.res = {
        status: 404,
        body: "Journal Entry not found",
      };
      return;
    }

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
