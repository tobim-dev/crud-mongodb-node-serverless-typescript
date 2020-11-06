import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { db } = await createConnection();
  const { userId } = req.params;

  const journalEntryModel = db.model<JournalEntry>(
    "JournalEntry",
    JournalEntrySchema
  );
  const body = await journalEntryModel.find({ userId: userId }).exec();

  context.res = {
    status: 200,
    body,
  };
};

export default httpTrigger;
