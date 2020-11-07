import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

export const httpTrigger: AzureFunction = async function (
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

  const journalEntryModel = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );

  try {
    const result = await journalEntryModel.create(journalEntry);
    context.res = {
      status: 201,
      body: result,
    };
    await db.close();
  } catch (error) {
    context.log(error.message);
    context.res = {
      status: 500,
      body: "Error creating Journal Entry",
    };
    await db.close();
  }
};

export default httpTrigger;
