import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectID } from "mongodb";
import createMongoClient from "../shared/mongo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params
  const journalEntry = req.body || {}

  if (!id || !journalEntry) {
    context.res = {
      status: 400,
      body: 'Fields are required'
    }

    return
  }

  const { db, connection } = await createMongoClient()
  const JournalEntries = db.collection('journalEntries')

  try {
    const journalEntries = await JournalEntries.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: journalEntry }
    )

    connection.close()

    context.res = {
      status: 200,
      body: journalEntries
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error updating a journal entry'
    }
  }
};

export default httpTrigger;