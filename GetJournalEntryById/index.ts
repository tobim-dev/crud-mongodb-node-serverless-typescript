import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ObjectID } from "mongodb";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { id, userId } = req.params;

  if (id && userId) {
    const { db } = await createConnection();
    const journalEntryModel = db.model<JournalEntry>(
      "JournalEntry",
      JournalEntrySchema
    );
    try {
      const body = journalEntryModel.findOne({
        _id: new ObjectID(id),
        userId: userId,
      });

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
      body: "Please enter the correct JournalEntry Id number and user ID!",
    };

    return;
  }
};

export default httpTrigger;
