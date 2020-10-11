import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createConnection from "../shared/mongoose";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const journalEntry = (req.body || {}) as JournalEntry;

  if (
    Object.keys(journalEntry).length === 0 &&
    journalEntry.constructor === Object
  ) {
    context.res = {
      status: 400,
      body: "Journal Entry data is required! ",
    };
    return;
  }

  const { db } = await createConnection();

  const JournalEntry = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );

  try {
    const result = await JournalEntry.create(journalEntry);
    context.res = {
      status: 201,
      body: result,
    };
  } catch (error) {
    console.error(error.message);
    context.res = {
      status: 500,
      body: "Error creating Journal Entry",
    };
  }
};

export default httpTrigger;
