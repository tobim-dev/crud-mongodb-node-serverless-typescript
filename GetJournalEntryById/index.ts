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
      const body = await JournalEntry.findOne({ _id: new ObjectID(id) });

      context.res = {
        status: 200,
        body,
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: "Error listing JournalEntry by Id.",
      };
    }
  } else {
    context.res = {
      status: 400,
      body: "Please enter the correct JournalEntry Id number!",
    };

    return;
  }
};

export default httpTrigger;
