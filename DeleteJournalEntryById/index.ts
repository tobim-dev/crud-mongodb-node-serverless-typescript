import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ObjectID } from "mongodb";
import createMongoClient from "../shared/mongo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: 'The fields are required!'
    }

    return
  }

  const { db, connection } = await createMongoClient()

  const JournalEntries = db.collection('journalEntries')

  try {
    await JournalEntries.findOneAndDelete({ _id: new ObjectID(id) })
    connection.close()
    context.res = {
      status: 204,
      body: 'Journal entry deleted successfully!'
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Error Deleting journal entry' + id
    }
  }
};

export default httpTrigger;