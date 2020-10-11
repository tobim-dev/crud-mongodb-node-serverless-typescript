import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createConnection from "../shared/mongoose";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { db } = await createConnection();
  const { user } = req.params;
  console.log(user);

  const JournalEntry = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );
  const body = await JournalEntry.find({ userId: user }).exec();

  context.res = {
    status: 200,
    body,
  };
};

export default httpTrigger;
