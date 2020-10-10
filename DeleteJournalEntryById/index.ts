import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ObjectID } from "mongodb";
import createConnection from "../shared/mongoose";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id } = req.params;

  if (id) {
    const { db } = await createConnection();
    const JournalEntry = db.model<JournalEntry>(
      "JournalEntry",
      JournalEntrySchema
    );
    try {
      await JournalEntry.deleteOne({ _id: new ObjectID(id) });
      await db.close();
      context.res = {
        status: 204,
        body: "Journal entry deleted successfully!",
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: "Error Deleting journal entry " + id,
      };
    }
  } else {
    context.res = {
      status: 400,
      body: "The fields are required!",
    };
  }
};

export default httpTrigger;
