import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectID } from "mongodb";
import createMongoClient from "../shared/mongo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: 'Please enter the correct JournalEntry Id number!'
    }

    return
  }

  const { db, connection } = await createMongoClient()

  const JournalEntries = db.collection('journalEntries')

  try {
    const body = await JournalEntries.findOne({ _id: new ObjectID(id) })

    connection.close()
    context.res = {
      status: 200,
      body
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error listing JournalEntry by Id.'
    }
  }
};

export default httpTrigger;