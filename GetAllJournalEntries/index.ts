import { AzureFunction, Context } from "@azure/functions"
import createConnection from "../shared/mongoose";
import {JournalEntry, JournalEntrySchema} from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  const { db } = await createConnection()

  const JournalEntry = db.model<JournalEntry>("JournalEntry", JournalEntrySchema);
  const body = await JournalEntry.find()
  await db.close()

  context.res = {
    status: 200,
    body
  }

};

export default httpTrigger;